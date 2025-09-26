import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

/**
 * Create a PostgreSQL connection pool optimized for Supabase
 * @param databaseUrl - Database connection string
 * @returns Configured connection pool
 */
export const createConnectionPool = (databaseUrl: string): Pool => {
  return new Pool({
    connectionString: databaseUrl,
    // Optimized for Supabase free tier limitations
    max: 20, // Maximum pool size (Supabase free tier allows ~60 connections)
    min: 2, // Minimum pool size
    idleTimeoutMillis: 30000, // 30 seconds
    connectionTimeoutMillis: 10000, // 10 seconds
    allowExitOnIdle: true,
    // For read-heavy workloads
    statement_timeout: 30000,
    query_timeout: 30000,
  });
};

/**
 * Create a Kysely instance for type-safe SQL queries
 * @param pool - PostgreSQL connection pool
 * @returns Configured Kysely instance
 */
export const createKyselyInstance = <DatabaseType>(
  pool: Pool
): Kysely<DatabaseType> => {
  return new Kysely<DatabaseType>({
    dialect: new PostgresDialect({
      pool,
    }),
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
