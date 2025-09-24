import { supabase, SupabaseClient } from "../database/client";

export class BaseRepository {
  protected client: SupabaseClient;

  constructor() {
    this.client = supabase;
  }
}
