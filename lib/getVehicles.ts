import { supabase } from './supabase';
import { Vehicle } from './vehicles';

export async function getVehicles(): Promise<Vehicle[]> {
	const { data, error } = await supabase.from('vehicles').select('*');
	if (error) throw error;
	return data as Vehicle[];
}
