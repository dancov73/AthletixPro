import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vaghxwrrxlmcisldfaed.supabase.co'; // Sostituisci con il tuo project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhZ2h4d3JyeGxtY2lzbGRmYWVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5MzY1NjcsImV4cCI6MjA1MTUxMjU2N30.hIOdolYs20Qnepf7bxASA_AUSDpGo5UWEX3dMN0U12A'
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
