# INT OS v2.5 Backend Documentation

## Architecture Overview

INT OS uses a three-tier architecture:

```
Frontend (React) → Edge Function Server (Hono) → Database (Supabase Postgres)
```

### Components

1. **Frontend**: React application with Tailwind CSS
2. **Edge Function**: Deno-based Hono server running on Supabase Edge Functions
3. **Database**: Postgres database with pre-configured KV store table
4. **Auth**: Supabase Auth for user authentication
5. **Storage**: Supabase Storage for file uploads (optional)

---

## File Structure

```
/utils/supabase/
  ├── info.tsx              # Auto-generated project credentials (DO NOT EDIT)
  └── client.tsx            # Frontend Supabase client singleton

/lib/
  └── api-client.ts         # HTTP client for Edge Function API calls

/supabase/functions/server/
  ├── index.tsx             # Main Hono server with routes
  └── kv_store.tsx          # KV store utilities (PROTECTED - DO NOT EDIT)
```

---

## Frontend Integration

### 1. Supabase Client (Auth & Storage)

```tsx
import { createClient, getCurrentUser, signOut } from './utils/supabase/client';

// Get Supabase client
const supabase = createClient();

// Check current user
const { user, error } = await getCurrentUser();

// Sign out
await signOut();
```

### 2. API Client (Backend Calls)

```tsx
import { apiClient } from './lib/api-client';

// GET request
const data = await apiClient.get('/kv/mykey');

// POST request
const result = await apiClient.post('/kv/mykey', { value: 'myvalue' });

// With auth token
const { session } = await getCurrentSession();
const profile = await apiClient.get('/auth/profile', session?.access_token);
```

---

## Backend Server (Edge Function)

### Base URL

```
https://fnmcgmotzlorfpgcpglc.supabase.co/functions/v1/make-server-07d6ee5a
```

### Available Endpoints

#### Health & Info

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/info` | Server information |

#### Key-Value Store

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/kv/:key` | Get value by key |
| POST | `/kv/:key` | Set key-value pair |
| DELETE | `/kv/:key` | Delete key |
| GET | `/kv/prefix/:prefix` | Get all keys with prefix |

#### Authentication (Optional)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/auth/profile` | ✅ | Get current user profile |

---

## Key-Value Store

The KV store is a flexible Postgres table that can store any JSON data.

### Usage in Frontend

```tsx
import { apiClient } from './lib/api-client';

// Set a value
await apiClient.post('/kv/user:123', { 
  value: { name: 'John', role: 'admin' } 
});

// Get a value
const response = await apiClient.get('/kv/user:123');
console.log(response.value); // { name: 'John', role: 'admin' }

// Get all users
const users = await apiClient.get('/kv/prefix/user:');
console.log(users.values); // Array of all user objects

// Delete a value
await apiClient.delete('/kv/user:123');
```

### Usage in Server

```tsx
import * as kv from './kv_store.tsx';

// Single operations
await kv.set('key', { data: 'value' });
const value = await kv.get('key');
await kv.del('key');

// Multiple operations
await kv.mset([
  { key: 'key1', value: 'val1' },
  { key: 'key2', value: 'val2' }
]);
const values = await kv.mget(['key1', 'key2']);

// Get by prefix
const allUsers = await kv.getByPrefix('user:');
```

---

## Authentication

### Frontend Sign In

```tsx
import { createClient } from './utils/supabase/client';

const supabase = createClient();

// Email/Password Sign In
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
});

if (data.session) {
  const accessToken = data.session.access_token;
  // Use accessToken for authenticated API calls
}

// Get current session
const { data: { session } } = await supabase.auth.getSession();
```

### Frontend Sign Up (Server Route)

You need to create a `/signup` endpoint in the server:

```tsx
// In /supabase/functions/server/index.tsx
app.post("/make-server-07d6ee5a/auth/signup", async (c) => {
  const { email, password, name } = await c.req.json();
  
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    user_metadata: { name },
    email_confirm: true, // Auto-confirm (no email server configured)
  });
  
  if (error) {
    return c.json({ error: error.message }, 400);
  }
  
  return c.json({ user: data.user });
});
```

### Protected Server Routes

```tsx
// Add to any route that requires authentication
app.get("/make-server-07d6ee5a/protected-route", async (c) => {
  const authHeader = c.req.header('Authorization');
  const { user, error } = await validateAuth(authHeader);
  
  if (error || !user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  // User is authenticated
  const userId = user.id;
  
  // Your logic here...
  return c.json({ data: 'protected data' });
});
```

### Making Authenticated Requests

```tsx
import { apiClient } from './lib/api-client';
import { getCurrentSession } from './utils/supabase/client';

const { session } = await getCurrentSession();

if (session) {
  const data = await apiClient.get(
    '/protected-route', 
    session.access_token
  );
}
```

---

## Adding New Routes

### 1. Add Route to Server

```tsx
// /supabase/functions/server/index.tsx

app.post("/make-server-07d6ee5a/my-endpoint", async (c) => {
  try {
    const body = await c.req.json();
    
    // Your logic here
    const result = { success: true, data: body };
    
    return c.json(result);
  } catch (error) {
    console.error('Error in my-endpoint:', error);
    return c.json({ error: 'Failed to process request' }, 500);
  }
});
```

### 2. Call from Frontend

```tsx
import { apiClient } from './lib/api-client';

const response = await apiClient.post('/my-endpoint', {
  field1: 'value1',
  field2: 'value2',
});

console.log(response);
```

---

## Environment Variables

The server has access to these environment variables:

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (full database access)
- `SUPABASE_ANON_KEY` - Anon key (public access)

⚠️ **Security Warning**: Never expose `SUPABASE_SERVICE_ROLE_KEY` to the frontend!

---

## Storage (Optional)

If your app needs file uploads, use Supabase Storage:

### Server Setup

```tsx
// Initialize bucket on server startup
const bucketName = 'make-07d6ee5a-files';

const { data: buckets } = await supabase.storage.listBuckets();
const bucketExists = buckets?.some(bucket => bucket.name === bucketName);

if (!bucketExists) {
  await supabase.storage.createBucket(bucketName, { 
    public: false // Private bucket
  });
}
```

### Upload File

```tsx
// Upload endpoint
app.post("/make-server-07d6ee5a/upload", async (c) => {
  const formData = await c.req.formData();
  const file = formData.get('file');
  
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(`uploads/${Date.now()}-${file.name}`, file);
  
  if (error) {
    return c.json({ error: error.message }, 400);
  }
  
  // Get signed URL (bucket is private)
  const { data: urlData } = await supabase.storage
    .from(bucketName)
    .createSignedUrl(data.path, 3600); // 1 hour expiry
  
  return c.json({ url: urlData.signedUrl });
});
```

---

## Database Schema

### KV Store Table

```sql
CREATE TABLE kv_store_07d6ee5a (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

⚠️ **Important**: You cannot create new tables or modify the schema in this environment. Use the flexible KV store for all data storage needs.

---

## Error Handling

### Server Errors

```tsx
try {
  // Your logic
} catch (error) {
  console.error('Detailed error context:', error);
  return c.json({ 
    error: 'User-friendly message',
    details: error.message 
  }, 500);
}
```

### Frontend Error Handling

```tsx
try {
  const data = await apiClient.get('/endpoint');
} catch (error) {
  console.error('API call failed:', error);
  // Show user-friendly error
  toast.error('Failed to load data');
}
```

---

## Best Practices

### 1. Always Log Errors
```tsx
console.error('Context about what failed:', error);
```

### 2. Use Descriptive Keys
```tsx
// Good
await kv.set('user:123:profile', userData);
await kv.set('ticket:456:comments', comments);

// Bad
await kv.set('user', userData);
await kv.set('data', comments);
```

### 3. Validate Input
```tsx
if (!email || !password) {
  return c.json({ error: 'Email and password required' }, 400);
}
```

### 4. Handle Auth Properly
```tsx
// Always check for user before accessing protected resources
const { user, error } = await validateAuth(authHeader);
if (!user) {
  return c.json({ error: 'Unauthorized' }, 401);
}
```

### 5. Use Transactions for Related Data
```tsx
await kv.mset([
  { key: 'order:123', value: orderData },
  { key: 'order:123:items', value: items },
  { key: 'order:123:payment', value: payment }
]);
```

---

## Testing

### Test Health Endpoint

```bash
curl https://fnmcgmotzlorfpgcpglc.supabase.co/functions/v1/make-server-07d6ee5a/health
```

### Test KV Store

```tsx
// In your app
const testKV = async () => {
  // Set
  await apiClient.post('/kv/test', { value: 'Hello World' });
  
  // Get
  const result = await apiClient.get('/kv/test');
  console.log(result.value); // 'Hello World'
  
  // Delete
  await apiClient.delete('/kv/test');
};
```

---

## Debugging

### Server Logs

View logs in Supabase Dashboard:
1. Go to https://supabase.com/dashboard
2. Select your project
3. Navigate to Edge Functions → Logs
4. Filter by `make-server-07d6ee5a`

### Frontend Network Tab

1. Open browser DevTools
2. Go to Network tab
3. Filter by `make-server`
4. Check request/response details

---

## Limitations

1. **No Database Migrations**: Cannot create tables or modify schema
2. **KV Store Only**: Use the pre-configured KV table for all data
3. **File Writes**: Only `/tmp` directory is writable on server
4. **No WebSockets**: Use polling or Supabase Realtime instead

---

## Need Help?

- **Supabase Docs**: https://supabase.com/docs
- **Hono Docs**: https://hono.dev/
- **INT OS GitHub**: [Your GitHub repo]

---

## Version History

- **v2.5.0** - Initial backend setup with KV store and auth
