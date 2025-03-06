import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	'https://tcopaaiseqrdlxfvbquk.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjb3BhYWlzZXFyZGx4ZnZicXVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNzc4NzUsImV4cCI6MjA1Njg1Mzg3NX0.7NAv0wCzFfQHd6pv-UgwuReGTExKdcG-vF5lPh_FkFw'
);
