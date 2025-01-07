import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vaghxwrrxlmcisldfaed.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhZ2h4d3JyeGxtY2lzbGRmYWVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5MzY1NjcsImV4cCI6MjA1MTUxMjU2N30.hIOdolYs20Qnepf7bxASA_AUSDpGo5UWEX3dMN0U12A';
export const supabase = createClient(supabaseUrl, supabaseKey);

export const registerUser = async (email, password, fullName) => {
  console.log('Received data:', { email, password, fullName });

  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error('Error during sign up:', error.message);
      return { data: null, error };
    }
    console.log('Sign up data:', data);

    if (!data.user) {
      console.error('Sign up failed: No user data returned');
      return { data: null, error: 'Sign up failed: No user data returned' };
    }

    // Aggiorna la tabella users con i dati aggiuntivi
    const { data: dbData, error: dbError } = await supabase
      .from('users')
      .insert([{ email, full_name: fullName, user_id: data.user.id }]); // Removed id

    if (dbError) {
      console.error('Error inserting data:', dbError);
      return { error: dbError.message };
    }

    console.log('Data inserted successfully:', dbData);
    return { message: 'User registered successfully', data: dbData };
  } catch (error) {
    console.error('Unexpected error during sign up:', error.message);
    return { data: null, error };
  }
};