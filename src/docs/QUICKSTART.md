# INT OS v2.5 - Quick Start Guide

Get started with INT OS backend in 5 minutes! 🚀

---

## 1. Test the Connection

First, verify your backend is running:

```tsx
// Add to any component
import { apiClient } from './lib/api-client';

const testConnection = async () => {
  try {
    const health = await apiClient.get('/health');
    console.log('✅ Backend is running:', health);
  } catch (error) {
    console.error('❌ Backend error:', error);
  }
};

// Call it on component mount
useEffect(() => {
  testConnection();
}, []);
```

---

## 2. Store Your First Data

```tsx
import { apiClient } from './lib/api-client';

// Save user preferences
const savePreferences = async () => {
  await apiClient.post('/kv/preferences', {
    value: {
      theme: 'dark',
      language: 'en',
      notifications: true
    }
  });
};

// Load user preferences
const loadPreferences = async () => {
  const response = await apiClient.get('/kv/preferences');
  console.log(response.value);
  // { theme: 'dark', language: 'en', notifications: true }
};
```

---

## 3. Add Authentication (Optional)

### Enable Auth in Supabase

1. Go to https://supabase.com/dashboard
2. Select your project
3. Navigate to **Authentication** → **Providers**
4. Enable **Email** provider

### Sign In User

```tsx
import { createClient } from './utils/supabase/client';

const signIn = async (email: string, password: string) => {
  const supabase = createClient();
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    console.error('Sign in failed:', error);
    return;
  }
  
  console.log('✅ Signed in:', data.user);
  return data.session?.access_token;
};
```

### Make Authenticated Request

```tsx
import { apiClient } from './lib/api-client';
import { getCurrentSession } from './utils/supabase/client';

const getProfile = async () => {
  const { session } = await getCurrentSession();
  
  if (session) {
    const profile = await apiClient.get(
      '/auth/profile',
      session.access_token
    );
    console.log('User profile:', profile);
  }
};
```

---

## 4. Create a Custom Endpoint

### Add to Server

Edit `/supabase/functions/server/index.tsx`:

```tsx
// Add this endpoint
app.post("/make-server-07d6ee5a/todos", async (c) => {
  try {
    const { title, completed } = await c.req.json();
    
    // Generate unique ID
    const id = crypto.randomUUID();
    
    // Store in KV
    await kv.set(`todo:${id}`, {
      id,
      title,
      completed,
      createdAt: new Date().toISOString()
    });
    
    return c.json({ success: true, id });
  } catch (error) {
    console.error('Error creating todo:', error);
    return c.json({ error: 'Failed to create todo' }, 500);
  }
});

// Get all todos
app.get("/make-server-07d6ee5a/todos", async (c) => {
  try {
    const todos = await kv.getByPrefix('todo:');
    return c.json({ todos: todos.map(t => t.value) });
  } catch (error) {
    console.error('Error getting todos:', error);
    return c.json({ error: 'Failed to get todos' }, 500);
  }
});
```

### Call from Frontend

```tsx
import { apiClient } from './lib/api-client';

// Create todo
const createTodo = async (title: string) => {
  const result = await apiClient.post('/todos', {
    title,
    completed: false
  });
  console.log('Created todo:', result.id);
};

// Get all todos
const getTodos = async () => {
  const result = await apiClient.get('/todos');
  console.log('All todos:', result.todos);
};
```

---

## 5. Create a React Hook

Make a reusable hook for data fetching:

```tsx
// /lib/hooks/useKVStore.ts
import { useState, useEffect } from 'react';
import { apiClient } from '../api-client';

export function useKVStore<T>(key: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/kv/${key}`);
        setData(response.value);
      } catch (err: any) {
        if (err.message.includes('404')) {
          setData(null); // Key doesn't exist yet
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [key]);

  // Save data
  const save = async (value: T) => {
    try {
      await apiClient.post(`/kv/${key}`, { value });
      setData(value);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  // Delete data
  const remove = async () => {
    try {
      await apiClient.delete(`/kv/${key}`);
      setData(null);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return { data, loading, error, save, remove };
}
```

### Use the Hook

```tsx
import { useKVStore } from './lib/hooks/useKVStore';

function SettingsPage() {
  const { 
    data: settings, 
    loading, 
    save 
  } = useKVStore<{ theme: string; language: string }>('settings');

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <p>Theme: {settings?.theme}</p>
      <button onClick={() => save({ theme: 'dark', language: 'en' })}>
        Save Settings
      </button>
    </div>
  );
}
```

---

## 6. Common Patterns

### User-Specific Data

```tsx
import { getCurrentUser } from './utils/supabase/client';

const saveUserData = async (data: any) => {
  const { user } = await getCurrentUser();
  
  if (user) {
    await apiClient.post(`/kv/user:${user.id}:data`, {
      value: data
    });
  }
};
```

### List All Users

```tsx
const getAllUsers = async () => {
  const response = await apiClient.get('/kv/prefix/user:');
  return response.values;
};
```

### Pagination

```tsx
const getPaginatedData = async (page: number, limit: number) => {
  const allData = await apiClient.get('/kv/prefix/item:');
  const start = (page - 1) * limit;
  const end = start + limit;
  return allData.values.slice(start, end);
};
```

### Search

```tsx
const searchUsers = async (query: string) => {
  const allUsers = await apiClient.get('/kv/prefix/user:');
  return allUsers.values.filter((user: any) => 
    user.value.name.toLowerCase().includes(query.toLowerCase())
  );
};
```

---

## 7. Error Handling

### Global Error Handler

```tsx
// /lib/api-client.ts - already includes error handling

// Usage with try-catch
try {
  const data = await apiClient.get('/kv/mykey');
} catch (error) {
  console.error('Failed to load data:', error);
  // Show toast notification
  toast.error('Failed to load data');
}
```

### React Error Boundary

```tsx
import { useEffect } from 'react';
import { toast } from 'sonner';

function App() {
  useEffect(() => {
    // Global error handler
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled error:', event.reason);
      toast.error('Something went wrong');
    });
  }, []);

  return <YourApp />;
}
```

---

## 8. Testing

### Test in Browser Console

```javascript
// Test health
fetch('https://fnmcgmotzlorfpgcpglc.supabase.co/functions/v1/make-server-07d6ee5a/health')
  .then(r => r.json())
  .then(console.log);

// Test KV store
fetch('https://fnmcgmotzlorfpgcpglc.supabase.co/functions/v1/make-server-07d6ee5a/kv/test', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGc...' // your anon key
  },
  body: JSON.stringify({ value: 'Hello World' })
})
.then(r => r.json())
.then(console.log);
```

---

## 9. Next Steps

Now that you're set up:

1. ✅ Read [BACKEND.md](/docs/BACKEND.md) for complete documentation
2. ✅ Check [API.md](/docs/API.md) for all available endpoints
3. ✅ Review [DEPLOYMENT.md](/docs/DEPLOYMENT.md) before going live
4. ✅ Build your app features!

---

## Common Issues

### "Failed to fetch"

- Check if backend URL is correct
- Verify CORS is enabled
- Check browser console for details

### "Unauthorized"

- Verify you're passing the correct auth token
- Check if token has expired
- Ensure user is signed in

### "Key not found"

- The key doesn't exist in KV store yet
- Use POST to create it first

---

## Need Help?

- 📚 [Full Backend Docs](/docs/BACKEND.md)
- 🔧 [API Reference](/docs/API.md)
- 🚀 [Deployment Guide](/docs/DEPLOYMENT.md)
- 💬 Ask in Discord/Slack

---

**Congratulations!** 🎉 You're ready to build with INT OS!
