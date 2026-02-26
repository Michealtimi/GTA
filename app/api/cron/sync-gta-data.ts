import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
	process.env.SUPABASE_URL!,
	process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

async function saveToDatabase(type: string, data: any) {
	if (type === 'releaseDate') {
		await supabase.from('release_dates').upsert([data]);
	} else if (type === 'vehicles') {
		await supabase.from('vehicles').upsert(data);
	} else if (type === 'hardware') {
		await supabase.from('hardware_stats').upsert([data]);
	}
}

export async function GET(req: NextRequest) {
	// Scrape Rockstar Newswire for release dates
	try {
		const newswireHtml = await fetch(
			'https://newswire.rockstargames.com/',
		).then((r) => r.text());
		const $ = cheerio.load(newswireHtml);
		// Example selector, update as needed
		const releaseDate = $("article:contains('GTA VI') time")
			.first()
			.attr('datetime');
		if (releaseDate) {
			await saveToDatabase('releaseDate', {
				game: 'GTA VI',
				releaseDate,
			});
		}
	} catch (e) {
		console.error('Newswire scrape failed', e);
	}

	// Scrape GTA VI Mapping Project for vehicles/locations
	try {
		const mapHtml = await fetch('https://gtavi-mapping.com/').then((r) =>
			r.text(),
		);
		const $$ = cheerio.load(mapHtml);
		// Example selector, update as needed
		type Vehicle = { name: string; type: string; location: string };
		const vehicles: Vehicle[] = [];
		$$('.vehicle-card').each((i: number, el: any) => {
			vehicles.push({
				name: $$(el).find('.vehicle-name').text(),
				type: $$(el).find('.vehicle-type').text(),
				location: $$(el).find('.vehicle-location').text(),
			});
		});
		if (vehicles.length) {
			await saveToDatabase('vehicles', vehicles);
		}
	} catch (e) {
		console.error('Mapping scrape failed', e);
	}

	// Scrape Steam Hardware Survey for PC specs
	try {
		const steamHtml = await fetch(
			'https://store.steampowered.com/hwsurvey/',
		).then((r) => r.text());
		const $$$ = cheerio.load(steamHtml);
		// Example selector, update as needed
		const avgGpu = $$$('table#gpu_table tr').eq(1).find('td').eq(0).text();
		if (avgGpu) {
			await saveToDatabase('hardware', { avgGpu });
		}
	} catch (e) {
		console.error('Steam HW scrape failed', e);
	}

	return NextResponse.json({ success: true, message: 'Sync complete.' });
}
