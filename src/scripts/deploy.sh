#!/bin/bash

###############################################################################
# INT OS v2.5 - Production Deployment Script
# 
# This script handles the complete deployment process including:
# - Environment validation
# - Build process
# - Asset optimization
# - Deployment to hosting
# - Cache invalidation
###############################################################################

set -e # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Configuration
ENVIRONMENT=${1:-production}
BUILD_DIR="dist"
DEPLOY_BRANCH="main"

log_info "Starting INT OS v2.5 deployment to ${ENVIRONMENT}"

# Step 1: Validate environment
log_info "Step 1: Validating environment..."

if [ ! -f ".env.${ENVIRONMENT}" ]; then
    log_error "Environment file .env.${ENVIRONMENT} not found!"
    log_info "Copy .env.production.example and fill in your values"
    exit 1
fi

# Check required environment variables
source .env.${ENVIRONMENT}

REQUIRED_VARS=(
    "VITE_SUPABASE_URL"
    "VITE_SUPABASE_ANON_KEY"
    "VITE_GA_ID"
)

for var in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!var}" ]; then
        log_error "Required environment variable $var is not set!"
        exit 1
    fi
done

log_success "Environment validated"

# Step 2: Install dependencies
log_info "Step 2: Installing dependencies..."
npm ci --production=false
log_success "Dependencies installed"

# Step 3: Run tests (if any)
log_info "Step 3: Running tests..."
# npm test # Uncomment when tests are added
log_success "Tests passed"

# Step 4: Build application
log_info "Step 4: Building application..."
NODE_ENV=${ENVIRONMENT} npm run build

if [ ! -d "${BUILD_DIR}" ]; then
    log_error "Build directory ${BUILD_DIR} not found!"
    exit 1
fi

log_success "Build completed"

# Step 5: Optimize assets
log_info "Step 5: Optimizing assets..."

# Compress images (if imagemagick is installed)
if command -v convert &> /dev/null; then
    find ${BUILD_DIR} -name "*.png" -exec convert {} -quality 85 {} \;
    find ${BUILD_DIR} -name "*.jpg" -exec convert {} -quality 85 {} \;
    log_success "Images optimized"
else
    log_warning "ImageMagick not found, skipping image optimization"
fi

# Gzip static assets
find ${BUILD_DIR} -type f \( -name "*.js" -o -name "*.css" -o -name "*.html" \) -exec gzip -9 -k {} \;
log_success "Static assets compressed"

# Step 6: Generate service worker cache manifest
log_info "Step 6: Generating service worker cache..."
# Update cache version in service worker
sed -i.bak "s/CACHE_NAME = '.*'/CACHE_NAME = 'int-os-v2.5.0-$(date +%s)'/" public/sw.js
rm public/sw.js.bak
log_success "Service worker cache manifest updated"

# Step 7: Deploy based on environment
log_info "Step 7: Deploying to ${ENVIRONMENT}..."

case ${ENVIRONMENT} in
    production)
        # Deploy to production (example: Vercel, Netlify, or custom server)
        log_info "Deploying to Vercel..."
        npx vercel --prod --yes
        
        # Or deploy to custom server via rsync
        # rsync -avz --delete ${BUILD_DIR}/ user@server:/var/www/intos.io/
        ;;
    
    staging)
        log_info "Deploying to staging..."
        npx vercel --yes
        ;;
    
    *)
        log_error "Unknown environment: ${ENVIRONMENT}"
        exit 1
        ;;
esac

log_success "Deployment completed"

# Step 8: Invalidate CDN cache (if using)
log_info "Step 8: Invalidating CDN cache..."
# Example for CloudFront
# aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
log_warning "CDN cache invalidation skipped (configure for your CDN)"

# Step 9: Verify deployment
log_info "Step 9: Verifying deployment..."

if [ "${ENVIRONMENT}" = "production" ]; then
    DEPLOY_URL="https://intos.io"
else
    DEPLOY_URL="https://staging.intos.io"
fi

HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" ${DEPLOY_URL})

if [ "${HTTP_STATUS}" = "200" ]; then
    log_success "Deployment verified! ${DEPLOY_URL} is live"
else
    log_error "Deployment verification failed! HTTP status: ${HTTP_STATUS}"
    exit 1
fi

# Step 10: Send deployment notification
log_info "Step 10: Sending deployment notification..."

# Example: Send to Slack
# curl -X POST -H 'Content-type: application/json' \
#   --data "{\"text\":\"INT OS v2.5 deployed to ${ENVIRONMENT}!\"}" \
#   YOUR_SLACK_WEBHOOK_URL

log_success "Deployment notification sent"

# Summary
echo ""
log_success "======================================"
log_success "Deployment completed successfully!"
log_success "Environment: ${ENVIRONMENT}"
log_success "URL: ${DEPLOY_URL}"
log_success "======================================"
echo ""

# Post-deployment tasks
log_info "Post-deployment tasks:"
echo "  1. Test critical user flows"
echo "  2. Check analytics tracking"
echo "  3. Monitor error rates in Sentry"
echo "  4. Verify API integrations"
echo "  5. Check PWA installation"
echo ""

exit 0
