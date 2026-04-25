import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import auth from './auth.tsx';
import dreams from './dreams.tsx';

const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', logger(console.log));

// Routes
app.route('/make-server-683179bd/auth', auth);
app.route('/make-server-683179bd/dreams', dreams);

// Health check
app.get('/make-server-683179bd/health', (c) => {
  return c.json({ status: 'ok' });
});

Deno.serve(app.fetch);