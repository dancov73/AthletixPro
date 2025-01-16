import supabase from './supabaseClient';

export async function fetchAthletes() {
  const { data, error } = await supabase
    .from('athletes')
    .select('*');

  if (error) {
    console.error('Error fetching athletes:', error);
    return [];
  }

  return data;
}