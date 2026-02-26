import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET() {
	try {
		const { data, error } = await supabase.from('vehicles').select('*');
		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}
		return NextResponse.json(data || []);
	} catch (e: any) {
		return NextResponse.json({ error: e.message }, { status: 500 });
	}
}
