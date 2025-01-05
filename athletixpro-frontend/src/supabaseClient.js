import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vaghxwrrxlmcisldfaed.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhZ2h4d3JyeGxtY2lzbGRmYWVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5MzY1NjcsImV4cCI6MjA1MTUxMjU2N30.hIOdolYs20Qnepf7bxASA_AUSDpGo5UWEX3dMN0U12A';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const registerUser = async (email, password) => {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error };
  }

  const { data, error: insertError } = await supabase
    .from('users')
    .insert([{ id: user.id, email: user.email }]);

  return { data, error: insertError };
};
