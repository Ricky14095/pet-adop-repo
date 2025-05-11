import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const signUp = async (email, password, fullName) => {
  const { data: { user }, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName
      }
    }
  });
  
  if (error) throw error;
  return user;
};

export const signIn = async (email, password) => {
  const { data: { user }, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) throw error;
  return user;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Pets helpers
export const fetchPets = async (filters = {}) => {
  let query = supabase.from('pets').select('*');
  
  if (filters.species) {
    query = query.eq('species', filters.species);
  }
  if (filters.size) {
    query = query.eq('size', filters.size);
  }
  if (filters.location) {
    query = query.ilike('location', `%${filters.location}%`);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

// Meet & Greet helpers
export const scheduleMeetGreet = async (petId, userId, scheduledTime, meetingType) => {
  const { data, error } = await supabase
    .from('meet_greets')
    .insert({
      pet_id: petId,
      user_id: userId,
      scheduled_time: scheduledTime,
      meeting_type: meetingType
    })
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

// Adoption helpers
export const createAdoptionApplication = async (petId, userId, applicationData) => {
  const { data, error } = await supabase
    .from('adoption_applications')
    .insert({
      pet_id: petId,
      user_id: userId,
      application_data: applicationData
    })
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

// Profile helpers
export const updateProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

// Vaccination records helpers
export const fetchVaccinationRecords = async (petId) => {
  const { data, error } = await supabase
    .from('vaccination_records')
    .select('*')
    .eq('pet_id', petId)
    .order('date_due', { ascending: true });
    
  if (error) throw error;
  return data;
};