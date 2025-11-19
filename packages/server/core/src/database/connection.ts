import { Pool } from "pg";

/**
 * Single PostgreSQL connection pool optimized for Supabase
 * Shared across all repositories to prevent connection exhaustion
 */
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  // CRITICAL: Required for Supabase Transaction Pooler (port 6543)
  // Without this, you'll get "Connection terminated" errors
  options: "-c search_path=public,auth",

  // Optimized for serverless + Supabase Transaction Pooler
  max: 1, // One connection per serverless function
  min: 0, // No persistent connections
  idleTimeoutMillis: 0, // Don't close idle connections (pooler handles it)
  connectionTimeoutMillis: 10000, // 10s for connection establishment
  allowExitOnIdle: true, // Allow process to exit if no active queries

  // Query timeouts
  statement_timeout: 60000, // 60s for complex queries
  query_timeout: 60000, // 60s total query timeout
});

// Handle pool errors to prevent crashes
pool.on("error", (err) => {
  console.error("Unexpected database pool error:", err);
  // Don't reset pool on errors - let it recover
});

/**
 * Test database connection health
 * @returns Promise<boolean> - true if connection is healthy
 */
export const testConnection = async (): Promise<boolean> => {
  try {
    const client = await pool.connect();
    await client.query("SELECT 1");
    client.release();
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
};

/**
 * Gracefully close all database connections
 */
export const closeConnections = async (): Promise<void> => await pool.end();
