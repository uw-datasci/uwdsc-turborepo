import { Pool } from "pg";
import { createConnectionPool } from "../database/connection";

/**
 * BaseRepository with database connection
 */
export abstract class BaseRepository {
  protected db: Pool;

  constructor() {
    this.db = createConnectionPool(process.env.NEXT_PUBLIC_DATABASE_URL!);
  }
}
