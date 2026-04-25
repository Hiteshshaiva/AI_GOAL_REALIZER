import { Hono } from 'npm:hono';
import { createClient } from 'jsr:@supabase/supabase-js';
import * as kv from './kv_store.tsx';

const dreams = new Hono();

// Helper to get user from token
async function getUserFromToken(authHeader: string | null) {
  if (!authHeader) return null;
  
  const token = authHeader.split(' ')[1];
  if (!token) return null;

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user) {
    console.log('Auth error:', error);
    return null;
  }
  
  return user;
}

// Save dream data
dreams.post('/save', async (c) => {
  try {
    const user = await getUserFromToken(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const data = await c.req.json();
    const { dream, milestones, tasks, resources } = data;

    // Save to KV store with user-specific keys
    await kv.set(`user:${user.id}:dream`, dream);
    await kv.set(`user:${user.id}:milestones`, milestones);
    await kv.set(`user:${user.id}:tasks`, tasks);
    await kv.set(`user:${user.id}:resources`, resources);

    return c.json({ success: true });
  } catch (error) {
    console.error('Error saving dream data:', error);
    return c.json({ error: 'Failed to save dream data' }, 500);
  }
});

// Load dream data
dreams.get('/load', async (c) => {
  try {
    const user = await getUserFromToken(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Load from KV store
    const dream = await kv.get(`user:${user.id}:dream`);
    const milestones = await kv.get(`user:${user.id}:milestones`);
    const tasks = await kv.get(`user:${user.id}:tasks`);
    const resources = await kv.get(`user:${user.id}:resources`);

    return c.json({
      dream: dream || null,
      milestones: milestones || [],
      tasks: tasks || [],
      resources: resources || [],
    });
  } catch (error) {
    console.error('Error loading dream data:', error);
    return c.json({ error: 'Failed to load dream data' }, 500);
  }
});

export default dreams;