import { Pool } from "pg";
import { pool } from "../database/connection";

/**
 * BaseRepository with shared database connection pool
 */
export abstract class BaseRepository {
  protected db: Pool = pool;
}
