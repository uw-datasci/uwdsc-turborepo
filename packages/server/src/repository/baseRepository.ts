import { supabase, SupabaseClient } from "@uwdsc/supabase";

export class BaseRepository {
  protected client: SupabaseClient;

  constructor() {
    this.client = supabase;
  }
}
