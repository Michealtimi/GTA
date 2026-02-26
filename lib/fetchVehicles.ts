// Fetch vehicles from remote TGD API, fallback to local
import { vehicles as localVehicles, Vehicle } from './vehicles';

export async function fetchVehicles(): Promise<Vehicle[]> {
	// Try local API route first
	try {
		const res = await fetch('/api/vehicles');
		if (res.ok) {
			const data = await res.json();
			if (Array.isArray(data) && data.length > 0) {
				return data as Vehicle[];
			}
		}
	} catch (e) {
		// ignore and fallback
	}
	// Fallback to remote API
	try {
		const res = await fetch('https://api.leonida-tgd.com/vehicles.json');
		if (!res.ok) throw new Error('Network error');
		const data = await res.json();
		return data;
	} catch (e) {
		// ignore and fallback
	}
	// Fallback to local
	return localVehicles;
}
