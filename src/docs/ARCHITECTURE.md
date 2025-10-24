# INT OS v2.5 - Architecture Documentation

## System Overview

INT OS is a comprehensive design system and prototype platform built on a modern three-tier architecture optimized for rapid prototyping and scalability.

```
┌─────────────────────────────────────────────────────────────┐
│                       Frontend Layer                         │
│  React 18 + TypeScript + Tailwind CSS + Shadcn/ui          │
│  • 18 App Components                                         │
│  • Command Palette (⌘K)                                      │
│  • AI Assistant Drawer                                       │
│  • Particle Animation System                                 │
│  • PWA Service Worker                                        │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTPS / REST API
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    Edge Function Layer                       │
│  Hono Server (Deno Runtime) on Supabase Edge Functions     │
│  • RESTful API Endpoints                                     │
│  • Authentication Middleware                                 │
│  • KV Store Operations                                       │
│  • File Upload Handler                                       │
│  • CORS & Security                                           │
└────────────────────┬────────────────────────────────────────┘
                     │ PostgreSQL Protocol
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                     Database Layer                           │
│  Supabase Postgres + Auth + Storage                        │
│  • KV Store Table                                            │
│  • Row Level Security (RLS)                                  │
│  • JWT-based Auth                                            │
│  • S3-compatible Storage                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3+ | UI framework |
| **TypeScript** | 5.0+ | Type safety |
| **Vite** | 5.0+ | Build tool & dev server |
| **Tailwind CSS** | 4.0 | Utility-first styling |
| **Shadcn/ui** | Latest | Component library |
| **Radix UI** | Latest | Accessible primitives |
| **Lucide React** | Latest | Icon system |
| **Recharts** | Latest | Data visualization |
| **Motion** | Latest | Animation library |
| **Sonner** | Latest | Toast notifications |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Supabase** | Latest | Backend platform |
| **Postgres** | 15+ | Database |
| **Deno** | Latest | Server runtime |
| **Hono** | 4.0+ | Web framework |
| **Supabase Auth** | Latest | Authentication |
| **Supabase Storage** | Latest | File storage |

### Infrastructure

| Service | Purpose |
|---------|---------|
| **Supabase Edge Functions** | Serverless API hosting |
| **Supabase Database** | PostgreSQL hosting |
| **Supabase Auth** | User authentication |
| **Supabase Storage** | Object storage |
| **GitHub Actions** | CI/CD pipeline |
| **CDN** | Global content delivery |

---

## Data Architecture

### Key-Value Store Schema

The KV store is the primary data storage mechanism:

```sql
CREATE TABLE kv_store_07d6ee5a (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_kv_key_prefix ON kv_store_07d6ee5a(key text_pattern_ops);
CREATE INDEX idx_kv_value ON kv_store_07d6ee5a USING GIN(value);
```

### Key Naming Conventions

```
Entity-based keys:
  user:{userId}:profile
  user:{userId}:preferences
  user:{userId}:settings

Collection-based keys:
  todo:{todoId}
  ticket:{ticketId}
  automation:{automationId}

System-wide keys:
  app:settings
  app:config
  app:stats
```

### Data Models

#### User Profile
```typescript
interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'guest';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// Stored at: user:{userId}:profile
```

#### App Settings
```typescript
interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    slack: boolean;
  };
}

// Stored at: app:settings
```

---

## API Architecture

### RESTful Endpoints

All endpoints follow REST conventions:

```
GET    /resource        - List all
GET    /resource/:id    - Get one
POST   /resource        - Create
PUT    /resource/:id    - Update
DELETE /resource/:id    - Delete
```

### Request/Response Flow

```
1. Frontend Request
   ├─ Client calls apiClient.get('/kv/key')
   ├─ Includes Authorization header
   └─ Sets Content-Type: application/json

2. Edge Function Processing
   ├─ CORS preflight (if needed)
   ├─ Authentication validation
   ├─ Route matching
   ├─ Business logic
   └─ Database operation

3. Database Query
   ├─ Row Level Security check
   ├─ Execute query
   └─ Return result

4. Response to Frontend
   ├─ JSON serialization
   ├─ Status code
   └─ Error handling
```

### Authentication Flow

```
┌─────────┐                ┌──────────┐              ┌─────────┐
│ Browser │                │  Server  │              │  Auth   │
└────┬────┘                └─────┬────┘              └────┬────┘
     │                           │                        │
     │  Sign In (email/pass)     │                        │
     ├──────────────────────────>│  Verify credentials    │
     │                           ├───────────────────────>│
     │                           │                        │
     │                           │   JWT Access Token     │
     │  Access Token + User      │<───────────────────────┤
     │<──────────────────────────┤                        │
     │                           │                        │
     │  API Call + Token         │                        │
     ├──────────────────────────>│  Validate Token        │
     │                           ├───────────────────────>│
     │                           │                        │
     │                           │   User Info            │
     │   Protected Data          │<───────────────────────┤
     │<──────────────────────────┤                        │
     │                           │                        │
```

---

## Frontend Architecture

### Component Structure

```
/components/
├── apps/                    # 18 application pages
│   ├── InsightHub.tsx      # Analytics dashboard
│   ├── ResolveDesk.tsx     # Ticket management
│   └── ...
├── int-os/                  # Core system components
│   ├── ParticleField.tsx   # Canvas animation
│   ├── Sidebar.tsx         # Navigation
│   ├── TopNav.tsx          # Header
│   ├── CommandPalette.tsx  # ⌘K search
│   └── RightAssistant.tsx  # AI drawer
└── ui/                      # Reusable UI components
    ├── button.tsx
    ├── card.tsx
    └── ...
```

### State Management

**Local State**: React `useState` for component-specific data
```tsx
const [isOpen, setIsOpen] = useState(false);
```

**Server State**: Custom hooks for backend data
```tsx
const { data, loading, save } = useKVStore('key');
```

**Auth State**: Supabase client singleton
```tsx
const { user } = await getCurrentUser();
```

**Global State**: Context API (if needed)
```tsx
const { theme, setTheme } = useTheme();
```

### Routing Strategy

Currently using path-based component rendering:

```tsx
// App.tsx
const renderApp = () => {
  switch (currentPath) {
    case '/insights': return <InsightHub />;
    case '/resolve': return <ResolveDesk />;
    // ...
  }
};
```

**Future**: Can migrate to React Router:
```tsx
<Routes>
  <Route path="/insights" element={<InsightHub />} />
  <Route path="/resolve" element={<ResolveDesk />} />
</Routes>
```

---

## Backend Architecture

### Edge Function Structure

```typescript
// /supabase/functions/server/index.tsx

import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Middleware
app.use('*', cors({ origin: '*' }));
app.use('*', logger());

// Routes
app.get("/make-server-07d6ee5a/health", healthCheck);
app.get("/make-server-07d6ee5a/kv/:key", getKV);
app.post("/make-server-07d6ee5a/kv/:key", setKV);

// Error handling
app.onError(errorHandler);
app.notFound(notFoundHandler);

Deno.serve(app.fetch);
```

### KV Store Operations

The KV store provides these operations:

```typescript
// Single operations
await kv.get(key: string): Promise<any>
await kv.set(key: string, value: any): Promise<void>
await kv.del(key: string): Promise<void>

// Batch operations
await kv.mget(keys: string[]): Promise<any[]>
await kv.mset(entries: Array<{key, value}>): Promise<void>
await kv.mdel(keys: string[]): Promise<void>

// Query operations
await kv.getByPrefix(prefix: string): Promise<Array<{key, value}>>
```

Implementation uses prepared statements for SQL injection protection:

```typescript
export async function get(key: string) {
  const { data } = await supabase
    .from('kv_store_07d6ee5a')
    .select('value')
    .eq('key', key)
    .single();
  
  return data?.value || null;
}
```

---

## Security Architecture

### Authentication

**JWT Tokens**: All authenticated requests use JWT
```
Authorization: Bearer {access_token}
```

**Token Storage**: Stored in localStorage (can be upgraded to httpOnly cookies)
```typescript
localStorage.setItem('access_token', token);
```

**Token Validation**: Server validates on protected routes
```typescript
const { user, error } = await supabase.auth.getUser(token);
if (!user) return c.json({ error: 'Unauthorized' }, 401);
```

### Authorization

**Row Level Security**: Can be enabled on KV store
```sql
ALTER TABLE kv_store_07d6ee5a ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access own data"
ON kv_store_07d6ee5a
FOR ALL
USING (key LIKE 'user:' || auth.uid() || '%');
```

**API Key**: Frontend uses anon key (limited permissions)
```typescript
const publicAnonKey = "eyJhbGc..."; // Read/write to allowed tables
```

**Service Role**: Server uses service role (full permissions)
```typescript
const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
// NEVER expose to frontend!
```

### CORS

Currently open for development:
```typescript
cors({ origin: "*" })
```

Production should restrict:
```typescript
cors({ 
  origin: ["https://yourdomain.com", "https://app.yourdomain.com"]
})
```

---

## Performance Optimization

### Frontend

**Code Splitting**: React lazy loading
```tsx
const InsightHub = lazy(() => import('./components/apps/InsightHub'));
```

**Image Optimization**: Using ImageWithFallback component
```tsx
<ImageWithFallback src={url} alt="..." />
```

**Debouncing**: For search and input
```tsx
const debouncedSearch = useMemo(
  () => debounce((value) => search(value), 300),
  []
);
```

**Virtual Scrolling**: For long lists (if needed)
```tsx
import { useVirtualizer } from '@tanstack/react-virtual';
```

### Backend

**Connection Pooling**: Managed by Supabase

**Query Optimization**: Indexes on common patterns
```sql
CREATE INDEX idx_kv_key_prefix ON kv_store_07d6ee5a(key text_pattern_ops);
```

**Response Caching**: Can add cache headers
```typescript
c.header('Cache-Control', 'public, max-age=60');
```

---

## Monitoring & Observability

### Logging

**Frontend**: Console logging with context
```typescript
console.error('Failed to load data:', { endpoint, error });
```

**Backend**: Structured logging with Hono logger
```typescript
app.use('*', logger(console.log));
```

**Supabase Dashboard**: View logs in real-time
- Edge Functions → Logs
- Database → Query Performance
- Auth → Events

### Error Tracking

**Recommended**: Integrate Sentry
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-dsn",
  environment: "production"
});
```

### Metrics

**Database Metrics**: Available in Supabase Dashboard
- Queries per second
- Active connections
- Storage usage

**Edge Function Metrics**:
- Invocations
- Execution time
- Error rate

---

## Scalability Considerations

### Vertical Scaling

Supabase automatically scales:
- **Database**: CPU and memory increase with plan
- **Edge Functions**: Auto-scale with load
- **Storage**: Pay-as-you-grow

### Horizontal Scaling

**Database Read Replicas**: Available on Pro plan
```typescript
const read = supabase.from('table').select();  // Read replica
const write = supabase.from('table').insert(); // Primary
```

**Edge Function Regions**: Deploy to multiple regions
```bash
supabase functions deploy --region us-west-1,eu-west-1
```

**CDN**: Static assets served globally

### Caching Strategy

**Browser Cache**: Service Worker caching
```javascript
// service-worker.js
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

**API Cache**: Server-side caching with Redis (future)
```typescript
// Check cache first
const cached = await redis.get(key);
if (cached) return cached;

// Query DB and cache
const data = await db.query();
await redis.set(key, data, { ex: 60 });
```

---

## Deployment Architecture

### CI/CD Pipeline

```
GitHub Push
    │
    ├─> Build Frontend (Vite)
    │   └─> Deploy to CDN
    │
    └─> Deploy Edge Function
        └─> Supabase Platform
```

### Environment Variables

**Development**:
```bash
VITE_SUPABASE_URL=https://fnmcgmotzlorfpgcpglc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

**Production**: Same as dev (single Supabase project)

**Future Staging**: Create separate Supabase project

---

## Future Improvements

### Planned Features

1. **Real-time Subscriptions**: Use Supabase Realtime
   ```typescript
   supabase
     .from('kv_store_07d6ee5a')
     .on('*', payload => console.log(payload))
     .subscribe();
   ```

2. **Full-text Search**: Postgres FTS
   ```sql
   CREATE INDEX idx_kv_value_search 
   ON kv_store_07d6ee5a 
   USING GIN(to_tsvector('english', value));
   ```

3. **Rate Limiting**: Implement rate limiting middleware
   ```typescript
   import { rateLimiter } from 'hono-rate-limiter';
   app.use(rateLimiter({ window: 60000, max: 100 }));
   ```

4. **GraphQL API**: Alternative to REST
   ```typescript
   import { graphqlServer } from '@hono/graphql-server';
   app.use('/graphql', graphqlServer({ schema }));
   ```

---

## Maintenance

### Database Backups

Automatic backups:
- Free: Daily, 7-day retention
- Pro: Daily, 30-day retention

Manual backup:
```bash
supabase db dump -f backup.sql
```

### Monitoring Checklist

- [ ] Check error rates daily
- [ ] Review slow queries weekly
- [ ] Monitor storage usage
- [ ] Review auth logs
- [ ] Check API latency
- [ ] Verify backup schedule

---

## Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **Hono Docs**: https://hono.dev
- **React Docs**: https://react.dev
- **Tailwind Docs**: https://tailwindcss.com

---

**Version**: 2.5.0
**Last Updated**: October 24, 2025
