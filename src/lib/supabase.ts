import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  company_name: string;
  created_at: string;
};

export type PollOption = {
  id: string;
  text: string;
};

export type Post = {
  id: string;
  author_id: string;
  title: string;
  content: string;
  created_at: string;
  profiles?: Profile;
  is_pinned?: boolean;
  post_type?: 'text' | 'poll';
  poll_options?: PollOption[];
};

export type Reply = {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  created_at: string;
  profiles?: Profile;
};
