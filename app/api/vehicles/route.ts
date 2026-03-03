import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

export async function GET() {
	try {
		// Check if environment variables are configured
		if (!supabaseUrl || !supabaseAnonKey) {
			return NextResponse.json(
				{ error: 'Supabase credentials not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.' },
				{ status: 500 }
			);
		}

		const supabase = createClient(supabaseUrl, supabaseAnonKey);
		const { data, error } = await supabase.from('vehicles').select('*');
		
		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}
		return NextResponse.json(data || []);
	} catch (e: any) {
		return NextResponse.json({ error: e.message }, { status: 500 });
	}
}
