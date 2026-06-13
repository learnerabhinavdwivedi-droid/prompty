import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET() {
  const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING;
  if (!dbUrl) {
    return NextResponse.json({ error: 'No database URL found in environment.' }, { status: 500 });
  }
  
  const sql = neon(dbUrl);
  let log = [];
  
  try {
    log.push('Starting migration...');
    
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        name TEXT,
        image TEXT,
        provider TEXT NOT NULL DEFAULT 'credentials',
        stripe_customer_id TEXT,
        plan TEXT NOT NULL DEFAULT 'free',
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;
    log.push('users table OK');

    await sql`
      CREATE TABLE IF NOT EXISTS api_keys (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id),
        key_hash TEXT NOT NULL,
        key_prefix VARCHAR(12) NOT NULL,
        label TEXT NOT NULL DEFAULT 'Default',
        last_used_at TIMESTAMP,
        revoked_at TIMESTAMP,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;
    log.push('api_keys table OK');

    await sql`
      CREATE TABLE IF NOT EXISTS compressions (
        id TEXT PRIMARY KEY,
        user_id TEXT REFERENCES users(id),
        original_prompt TEXT,
        compressed_prompt TEXT,
        original_words INTEGER NOT NULL,
        compressed_words INTEGER NOT NULL,
        rosetta_words INTEGER NOT NULL DEFAULT 0,
        ratio REAL NOT NULL,
        strategy TEXT NOT NULL,
        tokens_saved INTEGER NOT NULL DEFAULT 0,
        original_tokens INTEGER NOT NULL DEFAULT 0,
        compressed_tokens INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;
    log.push('compressions table OK');

    try {
      await sql`ALTER TABLE compressions ADD COLUMN original_prompt TEXT`;
      log.push('Added original_prompt');
    } catch(e) { log.push('original_prompt exists or error: ' + e.message); }
    
    try {
      await sql`ALTER TABLE compressions ADD COLUMN compressed_prompt TEXT`;
      log.push('Added compressed_prompt');
    } catch(e) { log.push('compressed_prompt exists or error: ' + e.message); }

    await sql`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id) UNIQUE,
        stripe_subscription_id TEXT NOT NULL UNIQUE,
        status TEXT NOT NULL,
        current_period_start TIMESTAMP,
        current_period_end TIMESTAMP,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;
    log.push('subscriptions table OK');

    await sql`
      CREATE TABLE IF NOT EXISTS usage_meters (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id),
        period VARCHAR(7) NOT NULL,
        words_processed INTEGER NOT NULL DEFAULT 0,
        compression_count INTEGER NOT NULL DEFAULT 0,
        tokens_saved INTEGER NOT NULL DEFAULT 0,
        dollars_saved REAL NOT NULL DEFAULT 0
      )
    `;
    log.push('usage_meters table OK');

    await sql`CREATE INDEX IF NOT EXISTS api_keys_key_hash_idx ON api_keys (key_hash)`;
    await sql`CREATE INDEX IF NOT EXISTS compressions_user_created_idx ON compressions (user_id, created_at)`;
    await sql`CREATE UNIQUE INDEX IF NOT EXISTS usage_user_period_idx ON usage_meters (user_id, period)`;
    log.push('indexes OK');
    
    return NextResponse.json({ success: true, log });
  } catch (e) {
    return NextResponse.json({ error: e.message, log }, { status: 500 });
  }
}
