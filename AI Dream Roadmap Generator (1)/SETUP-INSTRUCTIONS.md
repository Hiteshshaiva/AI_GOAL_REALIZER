# DreamPath AI - Supabase Setup Instructions

## Step 1: Configure Database

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard
   - Select your project: `mrjnkgigcdqnmzwamgfe`

2. **Run Database Setup SQL**
   - Click on **SQL Editor** in the left sidebar
   - Click **New Query**
   - Copy the contents of `supabase-setup.sql` and paste it
   - Click **Run** (or press Ctrl+Enter)
   - You should see: "Database setup complete! Table kv_store_683179bd created successfully."

## Step 2: Disable Email Confirmation (for easier testing)

1. In your Supabase Dashboard, go to **Authentication** → **Providers**
2. Click on **Email** provider
3. **Disable** "Confirm email" option
4. Click **Save**

This allows users to sign up and log in immediately without email verification.

## Step 3: Deploy Edge Functions

Your edge functions are located in `src/app/supabase/functions/server/`

### Option A: Auto-deployment (Figma Make handles this)
If you're using Figma Make, the edge functions should be auto-deployed. The app will automatically use the endpoint:
```
https://mrjnkgigcdqnmzwamgfe.supabase.co/functions/v1/make-server-683179bd
```

### Option B: Manual deployment using Supabase CLI

If you need to deploy manually:

```bash
# Install Supabase CLI (if not installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref mrjnkgigcdqnmzwamgfe

# Deploy the function
supabase functions deploy make-server-683179bd --no-verify-jwt
```

## Step 4: Verify Setup

1. **Test Authentication**
   - Try signing up with a new account
   - You should be logged in immediately (no email confirmation needed)

2. **Test Data Persistence**
   - Create a dream roadmap
   - Check your Supabase Dashboard → **Database** → **kv_store_683179bd** table
   - You should see entries like `user:{user-id}:dream`, `user:{user-id}:milestones`, etc.

## Troubleshooting

### "Failed to fetch" errors
- Check that your Supabase project URL is correct: `https://mrjnkgigcdqnmzwamgfe.supabase.co`
- Verify the anon key is correct in `src/app/utils/supabase/info.tsx`

### Edge Function errors
- Make sure the edge function is deployed
- Check Edge Function logs in Supabase Dashboard → **Edge Functions** → **Logs**
- Verify environment variables are set (SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are auto-configured)

### Data not saving
- Check that the `kv_store_683179bd` table exists
- Verify RLS policies are created correctly
- Check browser console for errors

## Current Configuration

✅ **Supabase URL**: https://mrjnkgigcdqnmzwamgfe.supabase.co  
✅ **Project ID**: mrjnkgigcdqnmzwamgfe  
✅ **Anon Key**: Configured in `src/app/utils/supabase/info.tsx`

## Next Steps

After completing setup:
1. Clear your browser cache/localStorage
2. Refresh the application
3. Try signing up with a new account
4. Test creating a dream roadmap
5. Verify data persists after logout/login

---

**Need help?** Check the Supabase Dashboard logs:
- **Auth logs**: Authentication → Logs
- **Database logs**: Database → Logs  
- **Edge Function logs**: Edge Functions → Logs
