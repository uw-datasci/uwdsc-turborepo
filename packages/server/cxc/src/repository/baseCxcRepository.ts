import { BaseRepository } from "@uwdsc/server/core/repository/baseRepository";
import {
  createConnectionPool,
  createKyselyInstance,
} from "@uwdsc/server/core/database/connection";
// import { DB } from "../generated/database";
type DB = any; // REMOVE ONE SCHEMA IS ADDED

// Initialize connections once for the CxC app
const pool = createConnectionPool(process.env.NEXT_PUBLIC_DATABASE_URL!);
const db = createKyselyInstance<DB>(pool);

/**
 * Base repository for CxC application with pre-configured database connections
 * All CxC repositories should extend from this class
 */
export abstract class BaseCxcRepository extends BaseRepository<DB> {
  constructor() {
    super(db, pool);
  }
}
