# INT OS v2.5 - Production Deployment Guide

Complete guide for deploying INT OS v2.5 to production.

---

## 🚀 Pre-Deployment Checklist

### Code Quality

- [ ] All features tested locally
- [ ] No console.log statements in production code
- [ ] All TypeScript errors resolved
- [ ] ESLint warnings addressed
- [ ] Build completes without errors
- [ ] Service worker cache updated

### Environment Setup

- [ ] `.env.production` configured
- [ ] All API keys added to environment
- [ ] Supabase project created and configured
- [ ] Database migrations run
- [ ] Environment variables validated

### Performance

- [ ] Lighthouse score > 90
- [ ] Images optimized
- [ ] Code splitting configured
- [ ] Lazy loading implemented
- [ ] Bundle size < 500KB (gzipped)

### Security

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] API keys stored securely
- [ ] CORS configured correctly
- [ ] Rate limiting enabled
- [ ] SQL injection prevention verified
- [ ] XSS protection enabled

### SEO

- [ ] Sitemap.xml generated
- [ ] Robots.txt configured
- [ ] Meta tags on all pages
- [ ] Open Graph tags added
- [ ] Structured data implemented
- [ ] Canonical URLs set

### Analytics

- [ ] Google Analytics 4 configured
- [ ] Event tracking tested
- [ ] Conversion goals set up
- [ ] Error tracking (Sentry) enabled

### PWA

- [ ] Manifest.json configured
- [ ] Service worker registered
- [ ] Offline page created
- [ ] Icons generated (all sizes)
- [ ] PWA install tested

---

## 📋 Deployment Steps

### Step 1: Configure Environment

```bash
# Copy example environment file
cp .env.production.example .env.production

# Edit with your values
nano .env.production
```

**Required Variables**:
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_GA_ID=G-XXXXXXXXXX
```

### Step 2: Install Dependencies

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Step 3: Run Tests

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Type check
npm run type-check
```

### Step 4: Build for Production

```bash
# Production build
NODE_ENV=production npm run build

# Verify build output
ls -lh dist/

# Test production build locally
npm run preview
```

### Step 5: Deploy to Hosting

#### Option A: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod

# Or use GitHub integration (automatic)
# Connect repo → Vercel auto-deploys on push to main
```

**Vercel Configuration** (`vercel.json`):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

#### Option B: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod

# Or use netlify.toml for config
```

**Netlify Configuration** (`netlify.toml`):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

#### Option C: Custom Server (VPS/Dedicated)

```bash
# Build locally
npm run build

# Transfer to server
rsync -avz --delete dist/ user@server:/var/www/intos.io/

# Or use deployment script
chmod +x scripts/deploy.sh
./scripts/deploy.sh production
```

**Nginx Configuration**:
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name intos.io www.intos.io;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name intos.io www.intos.io;

    ssl_certificate /etc/letsencrypt/live/intos.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/intos.io/privkey.pem;

    root /var/www/intos.io;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Step 6: Configure DNS

**A Record**:
```
Type: A
Name: @
Value: [Your server IP]
TTL: 3600
```

**CNAME Record** (www):
```
Type: CNAME
Name: www
Value: intos.io
TTL: 3600
```

**SSL Certificate** (Let's Encrypt):
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d intos.io -d www.intos.io

# Auto-renewal
sudo certbot renew --dry-run
```

### Step 7: Deploy Supabase Edge Functions

```bash
# Login to Supabase
supabase login

# Link project
supabase link --project-ref your-project-ref

# Deploy functions
supabase functions deploy server

# Set environment variables
supabase secrets set HUBSPOT_API_KEY=your-key
supabase secrets set FRESHDESK_API_KEY=your-key
```

### Step 8: Configure Analytics

**Google Analytics 4**:
1. Create GA4 property
2. Add measurement ID to `.env.production`
3. Verify tracking with GA Debugger

**Google Search Console**:
1. Add property (intos.io)
2. Verify ownership (DNS or HTML file)
3. Submit sitemap.xml

**Sentry** (Error Tracking):
```bash
# Install Sentry
npm install @sentry/react

# Configure in main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay()
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

### Step 9: Post-Deployment Verification

```bash
# Check site is live
curl -I https://intos.io

# Verify SSL
curl -vI https://intos.io 2>&1 | grep -i ssl

# Test PWA
lighthouse https://intos.io --view

# Check robots.txt
curl https://intos.io/robots.txt

# Verify sitemap
curl https://intos.io/sitemap.xml

# Test service worker
# Open DevTools → Application → Service Workers
```

### Step 10: Monitor & Optimize

**Setup Monitoring**:
- [ ] Uptime monitoring (UptimeRobot, Pingdom)
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring (New Relic, DataDog)
- [ ] Analytics (Google Analytics 4)

---

## 🔧 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
      env:
        VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
        VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
        VITE_GA_ID: ${{ secrets.VITE_GA_ID }}
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

---

## 📊 Performance Optimization

### Code Splitting

```typescript
// Lazy load routes
const InsightHub = lazy(() => import('./components/apps/InsightHub'));
const WorkflowEngine = lazy(() => import('./components/apps/WorkflowEngine'));

// Use Suspense
<Suspense fallback={<Loading />}>
  <Routes>
    <Route path="/insights" element={<InsightHub />} />
    <Route path="/workflows" element={<WorkflowEngine />} />
  </Routes>
</Suspense>
```

### Image Optimization

```typescript
// Use ImageWithFallback component
<ImageWithFallback
  src="/images/hero.jpg"
  alt="INT OS Dashboard"
  loading="lazy"
  width={1200}
  height={630}
/>

// Optimize images
// - Convert to WebP
// - Compress with TinyPNG
// - Use responsive images
```

### Bundle Analysis

```bash
# Analyze bundle size
npm run build -- --analyze

# Visualize bundle
npx vite-bundle-visualizer
```

---

## 🔐 Security Hardening

### Content Security Policy

Add to HTML head:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' https://www.googletagmanager.com; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data: https:; 
               connect-src 'self' https://*.supabase.co;">
```

### Rate Limiting

In Supabase Edge Function:
```typescript
const rateLimit = new Map();

export async function checkRateLimit(ip: string) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 100;

  const requests = rateLimit.get(ip) || [];
  const recentRequests = requests.filter(
    (timestamp: number) => now - timestamp < windowMs
  );

  if (recentRequests.length >= maxRequests) {
    throw new Error('Rate limit exceeded');
  }

  recentRequests.push(now);
  rateLimit.set(ip, recentRequests);
}
```

---

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf node_modules .next dist
npm install
npm run build
```

### 404 on Refresh (SPA)

Configure server to serve `index.html` for all routes.

### Service Worker Not Updating

```bash
# Clear browser cache
# Or increment cache version in sw.js
CACHE_NAME = 'int-os-v2.5.1'
```

### Slow Load Times

```bash
# Check bundle size
npm run build -- --stats

# Optimize images
npm install imagemin imagemin-webp
```

---

## 📈 Monitoring & Alerts

### Uptime Monitoring

**UptimeRobot** (Free):
```
Monitor Type: HTTPS
URL: https://intos.io
Interval: 5 minutes
Alert: Email, Slack, SMS
```

### Error Tracking

**Sentry Alerts**:
- New issue created
- Issue frequency spike
- Performance degradation
- Release errors

### Performance Monitoring

**Google PageSpeed Insights**:
- Core Web Vitals
- Performance score
- Accessibility score

---

## 🔄 Rollback Procedure

### Vercel

```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback [deployment-url]
```

### Custom Server

```bash
# Keep previous build
mv dist dist.backup

# Restore if needed
rm -rf dist
mv dist.backup dist
sudo systemctl restart nginx
```

---

## 📅 Maintenance Schedule

### Daily
- Check error logs (Sentry)
- Monitor uptime (UptimeRobot)
- Review analytics (GA4)

### Weekly
- Security updates (`npm audit`)
- Performance check (Lighthouse)
- Backup database

### Monthly
- SSL certificate renewal check
- Dependency updates (`npm outdated`)
- Performance optimization review

---

## 🆘 Support Contacts

- **DevOps**: devops@intinc.com
- **Security**: security@intinc.com
- **Emergency**: +1 (555) 123-4567

---

**Last Updated**: October 25, 2025  
**Version**: 2.5.0  
**Maintained by**: INT Inc. DevOps Team
