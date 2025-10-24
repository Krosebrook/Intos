# INT OS v2.5 Deployment Guide

## Overview

This guide covers deploying INT OS with Supabase backend and GitHub integration.

---

## Prerequisites

- [x] Supabase project connected
- [x] GitHub repository connected
- [ ] Supabase CLI installed (optional for local development)

---

## Project Setup

### 1. Supabase Configuration

Your Supabase project is already configured with:

- **Project ID**: `fnmcgmotzlorfpgcpglc`
- **Region**: Auto-selected
- **Database**: Postgres with KV store table
- **Edge Functions**: Deployed and running

### 2. Environment Variables

The following environment variables are automatically available:

**Server-side (Edge Function)**
```bash
SUPABASE_URL=https://fnmcgmotzlorfpgcpglc.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<auto-injected>
SUPABASE_ANON_KEY=<auto-injected>
```

**Frontend (Auto-generated)**
```tsx
// /utils/supabase/info.tsx
export const projectId = "fnmcgmotzlorfpgcpglc"
export const publicAnonKey = "eyJhbGc..."
```

---

## GitHub Integration

### Automatic Deployment

Every push to your GitHub repository automatically:

1. ✅ Builds the frontend
2. ✅ Deploys Edge Functions
3. ✅ Updates static assets
4. ✅ Invalidates CDN cache

### Branch Strategy

```
main/master  → Production deployment
develop      → Staging deployment (if configured)
feature/*    → No automatic deployment
```

---

## Edge Function Deployment

### Current Status

Your Edge Function is deployed at:
```
https://fnmcgmotzlorfpgcpglc.supabase.co/functions/v1/make-server-07d6ee5a
```

### Manual Deployment (if needed)

If you need to manually deploy the Edge Function:

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref fnmcgmotzlorfpgcpglc

# Deploy Edge Function
supabase functions deploy make-server-07d6ee5a
```

---

## Database Setup

### KV Store Table

The database includes a pre-configured KV store table:

```sql
-- Already created for you
CREATE TABLE kv_store_07d6ee5a (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

⚠️ **Important**: Do not attempt to create new tables or run migrations. Use the KV store for all data needs.

### Viewing Database

1. Go to https://supabase.com/dashboard
2. Select your project
3. Navigate to **Database** → **Table Editor**
4. View `kv_store_07d6ee5a` table

---

## Authentication Setup

### Enable Email/Password Auth

1. Go to Supabase Dashboard → **Authentication** → **Providers**
2. Enable **Email** provider
3. Configure email templates (optional)

### Enable Social Login (Optional)

For Google, GitHub, etc.:

1. Go to **Authentication** → **Providers**
2. Enable provider (e.g., Google)
3. Follow provider-specific setup instructions
4. Add OAuth credentials

**Important**: Follow the official Supabase docs for social login setup:
- Google: https://supabase.com/docs/guides/auth/social-login/auth-google
- GitHub: https://supabase.com/docs/guides/auth/social-login/auth-github

---

## Storage Setup (Optional)

If your app needs file uploads:

### Create Storage Bucket

1. Go to Supabase Dashboard → **Storage**
2. Click **New bucket**
3. Name: `make-07d6ee5a-files`
4. Set as **Private**
5. Configure RLS policies (optional)

Or let the server create it automatically on first run (already implemented in server code).

---

## Frontend Deployment

### Build Settings

Your frontend is automatically built and deployed with these settings:

**Build Command**
```bash
npm run build
```

**Output Directory**
```
dist/
```

**Environment Variables** (if using Vercel/Netlify)
```
VITE_SUPABASE_URL=https://fnmcgmotzlorfpgcpglc.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

### PWA Configuration

The app includes PWA support via `/public/manifest.json`:

```json
{
  "name": "INT OS v2.5 Scrollscape",
  "short_name": "INT OS",
  "theme_color": "#00E5FF",
  "background_color": "#0F1E33",
  "display": "standalone",
  "scope": "/",
  "start_url": "/"
}
```

---

## Custom Domain (Optional)

### Supabase Custom Domain

1. Go to **Project Settings** → **Custom Domains**
2. Add your domain
3. Configure DNS records:
   ```
   Type: CNAME
   Name: app
   Value: fnmcgmotzlorfpgcpglc.supabase.co
   ```

### Frontend Custom Domain

If deploying frontend separately (Vercel/Netlify):

1. Add domain in hosting provider settings
2. Update CORS in Edge Function if needed
3. Update OAuth redirect URLs in Supabase

---

## Environment-Specific Configuration

### Development

```tsx
// Local development uses same Supabase project
// No special configuration needed
const supabaseUrl = 'https://fnmcgmotzlorfpgcpglc.supabase.co';
```

### Staging

Create a separate Supabase project for staging:

1. Create new Supabase project
2. Deploy Edge Function to staging project
3. Update frontend environment variables
4. Use GitHub branch deployments

### Production

Your current setup is production-ready:

- ✅ HTTPS enabled
- ✅ CORS configured
- ✅ Authentication enabled
- ✅ Database secured with RLS (if configured)

---

## Security Checklist

### Before Going Live

- [ ] Enable Row Level Security (RLS) on KV store table
- [ ] Restrict CORS to specific domains (not `*`)
- [ ] Review and minimize service role key usage
- [ ] Enable rate limiting in Supabase dashboard
- [ ] Set up monitoring and alerts
- [ ] Configure backup policies
- [ ] Review authentication settings
- [ ] Test all auth flows
- [ ] Enable 2FA for Supabase account
- [ ] Review API key permissions

### Row Level Security Example

```sql
-- Enable RLS
ALTER TABLE kv_store_07d6ee5a ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access their own data
CREATE POLICY "Users can access own data"
ON kv_store_07d6ee5a
FOR ALL
USING (key LIKE 'user:' || auth.uid() || '%');

-- Policy: Admins can access everything
CREATE POLICY "Admins can access all data"
ON kv_store_07d6ee5a
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM kv_store_07d6ee5a
    WHERE key = 'user:' || auth.uid() || ':role'
    AND value->>'role' = 'admin'
  )
);
```

---

## Monitoring

### Edge Function Logs

View real-time logs:

1. Go to Supabase Dashboard
2. Navigate to **Edge Functions** → **make-server-07d6ee5a**
3. Click **Logs** tab
4. Filter by severity level

### Database Metrics

Monitor database performance:

1. Go to **Database** → **Metrics**
2. View queries/second, connections, storage
3. Set up alerts for high usage

### Frontend Monitoring

Consider integrating:

- **Sentry** for error tracking
- **Google Analytics** for usage metrics
- **LogRocket** for session replay

---

## Backup & Recovery

### Automated Backups

Supabase automatically backs up your database:

- **Free tier**: Daily backups (7-day retention)
- **Pro tier**: Daily backups (30-day retention)

### Manual Backup

```bash
# Backup database
supabase db dump -f backup.sql

# Restore database
supabase db push backup.sql
```

---

## Scaling

### Automatic Scaling

Supabase automatically scales:

- **Database**: Auto-scales with your plan
- **Edge Functions**: Auto-scales with invocations
- **Storage**: Pay-as-you-grow

### Performance Optimization

1. **Database Indexes**
   ```sql
   -- Add index for prefix queries
   CREATE INDEX idx_kv_key_prefix ON kv_store_07d6ee5a(key text_pattern_ops);
   ```

2. **Edge Function Caching**
   ```tsx
   // Cache responses where appropriate
   app.get("/endpoint", async (c) => {
     c.header('Cache-Control', 'public, max-age=60');
     return c.json(data);
   });
   ```

3. **Frontend Code Splitting**
   - Already configured with React lazy loading
   - Optimize bundle size with tree shaking

---

## Troubleshooting

### Edge Function Not Responding

```bash
# Check function status
curl https://fnmcgmotzlorfpgcpglc.supabase.co/functions/v1/make-server-07d6ee5a/health

# View logs in Supabase Dashboard
# Edge Functions → Logs
```

### Database Connection Issues

- Check if service is up: https://status.supabase.com
- Verify connection strings in environment variables
- Check if IP is whitelisted (if applicable)

### CORS Errors

Update CORS in `/supabase/functions/server/index.tsx`:

```tsx
cors({
  origin: ["https://yourdomain.com"],
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "POST", "PUT", "DELETE"],
})
```

---

## CI/CD Pipeline

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Supabase

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Deploy Edge Function
        run: |
          npm install -g supabase
          supabase functions deploy make-server-07d6ee5a \
            --project-ref fnmcgmotzlorfpgcpglc
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
```

---

## Rollback Procedure

If deployment fails:

1. **Frontend**: Revert commit in GitHub
2. **Edge Function**: Deploy previous version
   ```bash
   git checkout <previous-commit>
   supabase functions deploy make-server-07d6ee5a
   ```
3. **Database**: Restore from backup (if needed)

---

## Support & Resources

- **Supabase Docs**: https://supabase.com/docs
- **Supabase Status**: https://status.supabase.com
- **Community Discord**: https://discord.supabase.com
- **GitHub Issues**: [Your repository]

---

## Deployment Checklist

### Pre-Launch

- [ ] Test all API endpoints
- [ ] Test authentication flows
- [ ] Test file uploads (if applicable)
- [ ] Test on multiple devices/browsers
- [ ] Run security audit
- [ ] Configure monitoring
- [ ] Set up error tracking
- [ ] Configure backups
- [ ] Test PWA installation
- [ ] Optimize performance
- [ ] Review CORS settings
- [ ] Enable RLS policies
- [ ] Document API endpoints

### Post-Launch

- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Verify backup schedule
- [ ] Test rollback procedure
- [ ] Update documentation
- [ ] Announce to users

---

## Version

Deployment Guide Version: **2.5.0**

Last Updated: October 24, 2025
