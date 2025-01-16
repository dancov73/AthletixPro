import supabase from './supabaseClient';
import { fetchAthletes } from './databaseOperations';

async function displayAthletes() {
  const athletes = await fetchAthletes();
  console.log('Athletes:', athletes);
}

displayAthletes();