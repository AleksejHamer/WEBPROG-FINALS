import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class GuestbookService {
  private supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_KEY || ''
  );

  async findAll() { 
    const { data, error } = await this.supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }

  async create(dto: any) {
    // This sends the data in the exact format Supabase needs
    const { data, error } = await this.supabase
      .from('guestbook')
      .insert([dto]) 
      .select();
    if (error) throw error;
    return data;
  }

  async delete(id: string) {
    const { error } = await this.supabase.from('guestbook').delete().eq('id', id);
    if (error) throw error;
    return { success: true };
  }
}