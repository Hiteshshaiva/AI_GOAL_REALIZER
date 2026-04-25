-- DreamPath AI Database Setup Script
-- Run this in your Supabase SQL Editor

-- Create the key-value store table for storing user dreams and data
CREATE TABLE IF NOT EXISTS kv_store_683179bd (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);

-- Enable Row Level Security
ALTER TABLE kv_store_683179bd ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to access only their own data
-- Note: The edge functions use the service role key, so they bypass RLS
-- This policy is for future direct client access if needed
CREATE POLICY "Users can access their own data" ON kv_store_683179bd
  FOR ALL
  USING (key LIKE 'user:' || auth.uid()::text || ':%');

-- Create policy for service role (used by edge functions)
CREATE POLICY "Service role has full access" ON kv_store_683179bd
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Grant permissions
GRANT ALL ON kv_store_683179bd TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON kv_store_683179bd TO authenticated;

-- Display success message
SELECT 'Database setup complete! Table kv_store_683179bd created successfully.' AS status;
