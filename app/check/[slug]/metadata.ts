import { Metadata } from 'next';
import { HARDWARE_POOL, type Hardware } from '@/lib/hardware';
import { supabase } from '@/lib/supabase';

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	// Try Supabase first
	let hardware: Hardware | undefined;
	try {
		const { data } = await supabase
			.from('hardware_stats')
			.select('*')
			.eq('slug', params.slug)
			.single();
		if (data) hardware = data as Hardware;
	} catch {}
	// Fallback to static
	if (!hardware) {
		hardware = HARDWARE_POOL.find((h: Hardware) => h.slug === params.slug);
	}
	if (!hardware) return {};
	const title = `Can the ${hardware.name} Run GTA 6? Official Leonida Benchmarks & Settings.`;
	const description = `Find out if the ${hardware.name} is enough for GTA 6. See benchmarks, settings, and expert verdicts for Vice City.`;
	const ogImage = `/og/${hardware.slug}.png`;
	return {
		title,
		description,
		openGraph: {
			title,
			description,
			images: [ogImage],
			url: `https://vicecitynavigator.com/check/${hardware.slug}`,
			type: 'article',
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	};
}
