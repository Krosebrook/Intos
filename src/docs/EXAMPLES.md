# INT OS v2.5 - Code Examples

Real-world examples for common integration patterns.

---

## Table of Contents

1. [Basic Data Storage](#basic-data-storage)
2. [User Preferences](#user-preferences)
3. [Authentication Flow](#authentication-flow)
4. [Todo List App](#todo-list-app)
5. [File Upload](#file-upload)
6. [Real-time Updates](#real-time-updates)
7. [Pagination](#pagination)
8. [Search & Filter](#search--filter)

---

## Basic Data Storage

### Save and Load Settings

```tsx
import { useKVStore } from './lib/hooks/useKVStore';
import { Card } from './components/ui/card';
import { Button } from './components/ui/button';
import { toast } from 'sonner';

interface AppSettings {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
}

export function SettingsPage() {
  const { data: settings, loading, save } = useKVStore<AppSettings>('app:settings');

  const handleSave = async () => {
    try {
      await save({
        theme: 'dark',
        language: 'en',
        notifications: true
      });
      toast.success('Settings saved!');
    } catch (error) {
      toast.error('Failed to save settings');
    }
  };

  if (loading) {
    return <div>Loading settings...</div>;
  }

  return (
    <Card className="p-6">
      <h2>Current Settings</h2>
      <pre>{JSON.stringify(settings, null, 2)}</pre>
      <Button onClick={handleSave}>Save Settings</Button>
    </Card>
  );
}
```

---

## User Preferences

### Per-User Settings with Auth

```tsx
import { useEffect, useState } from 'react';
import { getCurrentUser } from './utils/supabase/client';
import { useKVStore } from './lib/hooks/useKVStore';

interface UserPreferences {
  darkMode: boolean;
  emailNotifications: boolean;
  language: string;
}

export function useUserPreferences() {
  const [userId, setUserId] = useState<string | null>(null);
  const key = userId ? `user:${userId}:preferences` : null;

  // Get current user
  useEffect(() => {
    const loadUser = async () => {
      const { user } = await getCurrentUser();
      setUserId(user?.id || null);
    };
    loadUser();
  }, []);

  // Load preferences (only when userId is available)
  const { data, loading, save } = useKVStore<UserPreferences>(
    key || 'temp',
    { autoLoad: !!key }
  );

  return {
    preferences: data,
    loading: loading || !userId,
    updatePreferences: save,
    isAuthenticated: !!userId
  };
}

// Usage in component
function ProfilePage() {
  const { preferences, loading, updatePreferences } = useUserPreferences();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Your Preferences</h2>
      <label>
        <input
          type="checkbox"
          checked={preferences?.darkMode || false}
          onChange={(e) => updatePreferences({
            ...preferences!,
            darkMode: e.target.checked
          })}
        />
        Dark Mode
      </label>
    </div>
  );
}
```

---

## Authentication Flow

### Complete Sign In/Sign Up Flow

```tsx
import { useState } from 'react';
import { createClient } from './utils/supabase/client';
import { apiClient } from './lib/api-client';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { toast } from 'sonner';

export function AuthPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      // Call backend to create user
      const response = await apiClient.post('/auth/signup', {
        email,
        password,
        name
      });

      toast.success('Account created! Please sign in.');
      setMode('signin');
    } catch (error: any) {
      toast.error(error.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success('Signed in successfully!');
      
      // Store access token if needed
      localStorage.setItem('access_token', data.session.access_token);
      
      // Redirect to dashboard
      window.location.href = '/';
    } catch (error: any) {
      toast.error(error.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    localStorage.removeItem('access_token');
    toast.success('Signed out');
    window.location.href = '/login';
  };

  if (mode === 'signup') {
    return (
      <div className="max-w-md mx-auto p-6">
        <h2>Sign Up</h2>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4"
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4"
        />
        <Button onClick={handleSignUp} disabled={loading} className="w-full mb-2">
          {loading ? 'Creating account...' : 'Sign Up'}
        </Button>
        <Button variant="ghost" onClick={() => setMode('signin')} className="w-full">
          Already have an account? Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2>Sign In</h2>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4"
      />
      <Button onClick={handleSignIn} disabled={loading} className="w-full mb-2">
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>
      <Button variant="ghost" onClick={() => setMode('signup')} className="w-full">
        Don't have an account? Sign Up
      </Button>
    </div>
  );
}
```

### Backend Sign Up Endpoint

Add to `/supabase/functions/server/index.tsx`:

```tsx
app.post("/make-server-07d6ee5a/auth/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    // Validate input
    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: true, // Auto-confirm (no email server configured)
    });

    if (error) {
      console.error('Error creating user:', error);
      return c.json({ error: error.message }, 400);
    }

    // Store user profile in KV
    await kv.set(`user:${data.user.id}:profile`, {
      id: data.user.id,
      email,
      name,
      createdAt: new Date().toISOString()
    });

    return c.json({ 
      success: true, 
      user: {
        id: data.user.id,
        email: data.user.email
      }
    });
  } catch (error) {
    console.error('Sign up error:', error);
    return c.json({ error: 'Failed to create account' }, 500);
  }
});
```

---

## Todo List App

### Full CRUD Todo Application

```tsx
import { useState, useEffect } from 'react';
import { apiClient } from './lib/api-client';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Checkbox } from './components/ui/checkbox';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);

  // Load todos
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const response = await apiClient.get('/kv/prefix/todo:');
      setTodos(response.values.map((item: any) => item.value));
    } catch (error) {
      toast.error('Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  // Create todo
  const createTodo = async () => {
    if (!newTodo.trim()) return;

    const todo: Todo = {
      id: crypto.randomUUID(),
      title: newTodo,
      completed: false,
      createdAt: new Date().toISOString()
    };

    try {
      await apiClient.post(`/kv/todo:${todo.id}`, { value: todo });
      setTodos([...todos, todo]);
      setNewTodo('');
      toast.success('Todo created!');
    } catch (error) {
      toast.error('Failed to create todo');
    }
  };

  // Toggle todo
  const toggleTodo = async (todo: Todo) => {
    const updated = { ...todo, completed: !todo.completed };

    try {
      await apiClient.post(`/kv/todo:${todo.id}`, { value: updated });
      setTodos(todos.map(t => t.id === todo.id ? updated : t));
    } catch (error) {
      toast.error('Failed to update todo');
    }
  };

  // Delete todo
  const deleteTodo = async (id: string) => {
    try {
      await apiClient.delete(`/kv/todo:${id}`);
      setTodos(todos.filter(t => t.id !== id));
      toast.success('Todo deleted');
    } catch (error) {
      toast.error('Failed to delete todo');
    }
  };

  if (loading) return <div>Loading todos...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl mb-6">My Todos</h1>

      {/* Add new todo */}
      <div className="flex gap-2 mb-6">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What needs to be done?"
          onKeyPress={(e) => e.key === 'Enter' && createTodo()}
        />
        <Button onClick={createTodo}>Add</Button>
      </div>

      {/* Todo list */}
      <div className="space-y-2">
        {todos.map(todo => (
          <div key={todo.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => toggleTodo(todo)}
            />
            <span className={todo.completed ? 'line-through opacity-50' : ''}>
              {todo.title}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteTodo(todo.id)}
              className="ml-auto"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}

        {todos.length === 0 && (
          <p className="text-center text-gray-400 py-8">
            No todos yet. Add one above!
          </p>
        )}
      </div>

      {/* Stats */}
      <div className="mt-6 text-sm text-gray-400">
        {todos.filter(t => !t.completed).length} remaining • 
        {todos.filter(t => t.completed).length} completed
      </div>
    </div>
  );
}
```

---

## File Upload

### Upload Files to Supabase Storage

Backend endpoint:

```tsx
// Add to /supabase/functions/server/index.tsx

// Initialize bucket on startup
const BUCKET_NAME = 'make-07d6ee5a-uploads';

const initBucket = async () => {
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some(b => b.name === BUCKET_NAME);
  
  if (!exists) {
    await supabase.storage.createBucket(BUCKET_NAME, { public: false });
    console.log('Created storage bucket:', BUCKET_NAME);
  }
};

initBucket();

// Upload endpoint
app.post("/make-server-07d6ee5a/upload", async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return c.json({ error: 'No file provided' }, 400);
    }

    // Generate unique filename
    const filename = `${Date.now()}-${file.name}`;
    const path = `uploads/${filename}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(path, file);

    if (error) {
      console.error('Upload error:', error);
      return c.json({ error: error.message }, 400);
    }

    // Get signed URL (bucket is private)
    const { data: urlData } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(data.path, 3600); // 1 hour expiry

    return c.json({ 
      success: true,
      url: urlData?.signedUrl,
      path: data.path
    });
  } catch (error) {
    console.error('Upload error:', error);
    return c.json({ error: 'Failed to upload file' }, 500);
  }
});
```

Frontend component:

```tsx
import { useState } from 'react';
import { Button } from './components/ui/button';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from './utils/supabase/info';

export function FileUploader() {
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-07d6ee5a/upload`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setFileUrl(data.url);
      toast.success('File uploaded!');
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleUpload}
        disabled={uploading}
      />

      {uploading && <p>Uploading...</p>}

      {fileUrl && (
        <div className="mt-4">
          <p>File uploaded successfully!</p>
          <img src={fileUrl} alt="Uploaded" className="max-w-md" />
        </div>
      )}
    </div>
  );
}
```

---

## Real-time Updates

### Poll for Updates

```tsx
import { useState, useEffect } from 'react';
import { apiClient } from './lib/api-client';

export function useRealtimeData<T>(key: string, interval: number = 5000) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/kv/${key}`);
        setData(response.value);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, interval);

    return () => clearInterval(intervalId);
  }, [key, interval]);

  return data;
}

// Usage
function DashboardStats() {
  const stats = useRealtimeData<{ users: number; tickets: number }>('stats', 3000);

  return (
    <div>
      <p>Active Users: {stats?.users}</p>
      <p>Open Tickets: {stats?.tickets}</p>
    </div>
  );
}
```

---

## Pagination

```tsx
import { useState, useEffect } from 'react';
import { useKVPrefix } from './lib/hooks/useKVStore';
import { Button } from './components/ui/button';

interface Item {
  id: string;
  name: string;
}

export function PaginatedList() {
  const { data: allItems } = useKVPrefix<Item>('item:');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(allItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = allItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div className="space-y-2">
        {currentItems.map(({ value }) => (
          <div key={value.id} className="p-4 bg-white/5 rounded">
            {value.name}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <Button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="py-2">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
```

---

## Search & Filter

```tsx
import { useState } from 'react';
import { useKVPrefix } from './lib/hooks/useKVStore';
import { Input } from './components/ui/input';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function UserSearch() {
  const { data: users } = useKVPrefix<User>('user:');
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const filteredUsers = users
    .map(({ value }) => value)
    .filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());
      
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 bg-white/10 rounded"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="guest">Guest</option>
        </select>
      </div>

      <div className="space-y-2">
        {filteredUsers.map(user => (
          <div key={user.id} className="p-4 bg-white/5 rounded">
            <h3>{user.name}</h3>
            <p className="text-sm text-gray-400">{user.email}</p>
            <span className="text-xs px-2 py-1 bg-blue-500/20 rounded">
              {user.role}
            </span>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <p className="text-center text-gray-400 py-8">
            No users found
          </p>
        )}
      </div>
    </div>
  );
}
```

---

## More Examples

For additional examples, see:
- [BACKEND.md](BACKEND.md) - Backend integration patterns
- [API.md](API.md) - API endpoint examples
- [QUICKSTART.md](QUICKSTART.md) - Getting started examples

---

**Happy coding!** 🚀
