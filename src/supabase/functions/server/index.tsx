import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from "./kv_store.tsx";
import integrations from "./integrations.tsx";

const app = new Hono();

// Initialize Supabase client with service role for server operations
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Mount integration routes
app.route('/make-server-07d6ee5a/hubspot', integrations);
app.route('/make-server-07d6ee5a/freshdesk', integrations);
app.route('/make-server-07d6ee5a/teams', integrations);

// Middleware to validate auth token (for protected routes)
async function validateAuth(authHeader: string | null) {
  if (!authHeader) {
    return { user: null, error: 'No authorization header' };
  }

  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  return { user, error };
}

// ============================================
// HEALTH & INFO ENDPOINTS
// ============================================

app.get("/make-server-07d6ee5a/health", (c) => {
  return c.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    version: "2.5.0"
  });
});

app.get("/make-server-07d6ee5a/info", (c) => {
  return c.json({
    name: "INT OS Server",
    version: "2.5.0",
    endpoints: {
      health: "/make-server-07d6ee5a/health",
      kv: "/make-server-07d6ee5a/kv/*",
      auth: "/make-server-07d6ee5a/auth/*",
    }
  });
});

// ============================================
// KEY-VALUE STORE ENDPOINTS
// ============================================

// Get a single value by key
app.get("/make-server-07d6ee5a/kv/:key", async (c) => {
  try {
    const key = c.req.param('key');
    const value = await kv.get(key);
    
    if (value === null) {
      return c.json({ error: 'Key not found' }, 404);
    }
    
    return c.json({ key, value });
  } catch (error) {
    console.error('Error getting KV value:', error);
    return c.json({ error: 'Failed to get value' }, 500);
  }
});

// Set a value
app.post("/make-server-07d6ee5a/kv/:key", async (c) => {
  try {
    const key = c.req.param('key');
    const { value } = await c.req.json();
    
    await kv.set(key, value);
    
    return c.json({ success: true, key, value });
  } catch (error) {
    console.error('Error setting KV value:', error);
    return c.json({ error: 'Failed to set value' }, 500);
  }
});

// Delete a value
app.delete("/make-server-07d6ee5a/kv/:key", async (c) => {
  try {
    const key = c.req.param('key');
    await kv.del(key);
    
    return c.json({ success: true, key });
  } catch (error) {
    console.error('Error deleting KV value:', error);
    return c.json({ error: 'Failed to delete value' }, 500);
  }
});

// Get values by prefix
app.get("/make-server-07d6ee5a/kv/prefix/:prefix", async (c) => {
  try {
    const prefix = c.req.param('prefix');
    const values = await kv.getByPrefix(prefix);
    
    return c.json({ prefix, values });
  } catch (error) {
    console.error('Error getting values by prefix:', error);
    return c.json({ error: 'Failed to get values' }, 500);
  }
});

// ============================================
// AUTH ENDPOINTS (Example - Optional)
// ============================================

// Protected endpoint example
app.get("/make-server-07d6ee5a/auth/profile", async (c) => {
  const authHeader = c.req.header('Authorization');
  const { user, error } = await validateAuth(authHeader);
  
  if (error || !user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  return c.json({ 
    user: {
      id: user.id,
      email: user.email,
      metadata: user.user_metadata
    }
  });
});

// ============================================
// ERROR HANDLING
// ============================================

app.onError((err, c) => {
  console.error('Server error:', err);
  return c.json({ 
    error: 'Internal server error',
    message: err.message 
  }, 500);
});

// 404 handler
app.notFound((c) => {
  return c.json({ 
    error: 'Not found',
    path: c.req.path 
  }, 404);
});

Deno.serve(app.fetch);