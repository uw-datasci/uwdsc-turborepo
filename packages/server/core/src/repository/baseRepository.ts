import { sql, type Sql } from "../database/connection";

/**
 * BaseRepository with shared postgres.js connection
 */
export abstract class BaseRepository {
  protected sql: Sql = sql;
}
