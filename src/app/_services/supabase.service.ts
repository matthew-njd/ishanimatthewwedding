import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from './../../environments/environment';
import { Database } from '../_models/types';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() { 
    this.supabase = createClient<Database>(environment.supabaseUrl, environment.supabaseKey, {
      auth: {
        persistSession: false,  // Disables session persistence
        autoRefreshToken: false, // Prevents auto-refreshing tokens
        detectSessionInUrl: false // Disables session detection in the URL
      }
    });
  }

  async getTable(table: string) {
    const { data, error } = await this.supabase.from(table).select('Name, IsInvitedMehndi, IsInvitedGrahShanti, IsInvitedCeremony, IsInvitedReception');
    if (error) throw error;
    return data;
  }

  async getNames(table: string) {
    const { data, error } = await this.supabase.from(table).select('Name');
    if (error) throw error;
    return data;
  }
}
