# INT OS v2.5 API Reference

## Base URL

```
https://fnmcgmotzlorfpgcpglc.supabase.co/functions/v1/make-server-07d6ee5a
```

## Authentication

All requests require the `Authorization` header:

```
Authorization: Bearer {publicAnonKey}
```

For protected endpoints, use the user's access token instead:

```
Authorization: Bearer {userAccessToken}
```

---

## Endpoints

### Health & Info

#### GET /health

Check server health status.

**Request**
```bash
curl -X GET https://fnmcgmotzlorfpgcpglc.supabase.co/functions/v1/make-server-07d6ee5a/health
```

**Response**
```json
{
  "status": "ok",
  "timestamp": "2025-10-24T12:00:00.000Z",
  "version": "2.5.0"
}
```

---

#### GET /info

Get server information and available endpoints.

**Request**
```bash
curl -X GET https://fnmcgmotzlorfpgcpglc.supabase.co/functions/v1/make-server-07d6ee5a/info
```

**Response**
```json
{
  "name": "INT OS Server",
  "version": "2.5.0",
  "endpoints": {
    "health": "/make-server-07d6ee5a/health",
    "kv": "/make-server-07d6ee5a/kv/*",
    "auth": "/make-server-07d6ee5a/auth/*"
  }
}
```

---

### Key-Value Store

#### GET /kv/:key

Get a value by key.

**Parameters**
- `key` (path) - The key to retrieve

**Request**
```tsx
const response = await apiClient.get('/kv/user:123');
```

**Response** (200 OK)
```json
{
  "key": "user:123",
  "value": {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin"
  }
}
```

**Response** (404 Not Found)
```json
{
  "error": "Key not found"
}
```

---

#### POST /kv/:key

Set a key-value pair.

**Parameters**
- `key` (path) - The key to set
- `value` (body) - The value to store (any JSON)

**Request**
```tsx
await apiClient.post('/kv/user:123', {
  value: {
    name: "John Doe",
    email: "john@example.com",
    role: "admin"
  }
});
```

**Response** (200 OK)
```json
{
  "success": true,
  "key": "user:123",
  "value": {
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin"
  }
}
```

---

#### DELETE /kv/:key

Delete a key-value pair.

**Parameters**
- `key` (path) - The key to delete

**Request**
```tsx
await apiClient.delete('/kv/user:123');
```

**Response** (200 OK)
```json
{
  "success": true,
  "key": "user:123"
}
```

---

#### GET /kv/prefix/:prefix

Get all key-value pairs matching a prefix.

**Parameters**
- `prefix` (path) - The prefix to search for

**Request**
```tsx
const response = await apiClient.get('/kv/prefix/user:');
```

**Response** (200 OK)
```json
{
  "prefix": "user:",
  "values": [
    {
      "key": "user:123",
      "value": { "name": "John Doe" }
    },
    {
      "key": "user:456",
      "value": { "name": "Jane Smith" }
    }
  ]
}
```

---

### Authentication

#### GET /auth/profile

Get current user profile (requires authentication).

**Headers**
```
Authorization: Bearer {userAccessToken}
```

**Request**
```tsx
const { session } = await getCurrentSession();
const profile = await apiClient.get('/auth/profile', session.access_token);
```

**Response** (200 OK)
```json
{
  "user": {
    "id": "uuid-here",
    "email": "user@example.com",
    "metadata": {
      "name": "John Doe"
    }
  }
}
```

**Response** (401 Unauthorized)
```json
{
  "error": "Unauthorized"
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message",
  "message": "Detailed error information (optional)"
}
```

### Common Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing or invalid auth token |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |

---

## Usage Examples

### Frontend Integration

```tsx
import { apiClient } from './lib/api-client';
import { getCurrentSession } from './utils/supabase/client';

// Simple GET request
const data = await apiClient.get('/kv/settings');

// POST with data
await apiClient.post('/kv/settings', {
  value: { theme: 'dark', language: 'en' }
});

// Authenticated request
const { session } = await getCurrentSession();
if (session) {
  const profile = await apiClient.get(
    '/auth/profile',
    session.access_token
  );
}

// Get multiple records by prefix
const users = await apiClient.get('/kv/prefix/user:');
console.log(users.values);

// Delete a record
await apiClient.delete('/kv/user:123');
```

### React Hook Example

```tsx
import { useState, useEffect } from 'react';
import { apiClient } from './lib/api-client';

function useKVStore<T>(key: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/kv/${key}`);
        setData(response.value);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [key]);

  const updateData = async (value: T) => {
    try {
      await apiClient.post(`/kv/${key}`, { value });
      setData(value);
    } catch (err) {
      setError(err.message);
    }
  };

  return { data, loading, error, updateData };
}

// Usage
function MyComponent() {
  const { data, loading, updateData } = useKVStore<{ name: string }>('user:123');

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <p>{data?.name}</p>
      <button onClick={() => updateData({ name: 'New Name' })}>
        Update
      </button>
    </div>
  );
}
```

---

## Rate Limits

Supabase Edge Functions have the following limits:

- **Free tier**: 500,000 invocations/month
- **Pro tier**: 2,000,000 invocations/month

---

## CORS Configuration

The server accepts requests from any origin (`*`). This is suitable for development but should be restricted in production.

---

## Testing with curl

```bash
# Health check
curl https://fnmcgmotzlorfpgcpglc.supabase.co/functions/v1/make-server-07d6ee5a/health

# Get value
curl -X GET \
  -H "Authorization: Bearer {publicAnonKey}" \
  https://fnmcgmotzlorfpgcpglc.supabase.co/functions/v1/make-server-07d6ee5a/kv/mykey

# Set value
curl -X POST \
  -H "Authorization: Bearer {publicAnonKey}" \
  -H "Content-Type: application/json" \
  -d '{"value": {"test": "data"}}' \
  https://fnmcgmotzlorfpgcpglc.supabase.co/functions/v1/make-server-07d6ee5a/kv/mykey

# Delete value
curl -X DELETE \
  -H "Authorization: Bearer {publicAnonKey}" \
  https://fnmcgmotzlorfpgcpglc.supabase.co/functions/v1/make-server-07d6ee5a/kv/mykey
```

---

## Version

Current API version: **2.5.0**

Last updated: October 24, 2025
