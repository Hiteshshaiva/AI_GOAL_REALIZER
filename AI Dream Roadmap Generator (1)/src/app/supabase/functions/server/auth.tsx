import { Hono } from 'npm:hono';
import { createClient } from 'jsr:@supabase/supabase-js';

const auth = new Hono();

// Sign up route
auth.post('/signup', async (c) => {
  try {
    const { name, email, password } = await c.req.json();

    if (!name || !email || !password) {
      return c.json({ error: 'Name, email, and password are required' }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true,
    });

    if (error) {
      console.log('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ 
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata.name,
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    return c.json({ error: 'Failed to create account' }, 500);
  }
});

export default auth;