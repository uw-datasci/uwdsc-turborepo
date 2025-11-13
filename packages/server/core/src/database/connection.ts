import { Pool } from "pg";

/**
 * Create a PostgreSQL connection pool optimized for Supabase
 * @param databaseUrl - Database connection string
 * @returns Configured connection pool
 */
export const createConnectionPool = (databaseUrl: string): Pool => {
  return new Pool({
    connectionString: databaseUrl,
    // Optimized for Vercel + Transaction Pooler
    max: 1, // One connection per serverless function
    min: 0, // No persistent connections
    idleTimeoutMillis: 1000, // Close connections quickly
    connectionTimeoutMillis: 5000, // Fast connection establishment
    allowExitOnIdle: true,
    // Good timeouts for complex queries through pooler
    statement_timeout: 30000, // 30s for complex analytics
    query_timeout: 30000,
  });
};

/**
 * Test database connection health
 * @param pool - PostgreSQL connection pool
 * @returns Promise<boolean> - true if connection is healthy
 */
export const testConnection = async (pool: Pool): Promise<boolean> => {
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
 * @param pool - PostgreSQL connection pool
 */
export const closeConnections = async (pool: Pool): Promise<void> => {
  await pool.end();
};
