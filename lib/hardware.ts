// Central hardware pool for all dynamic and SEO logic
export type Hardware = {
	slug: string;
	name: string;
	score: number;
	tier: string;
	price: string;
};
export const HARDWARE_POOL: Hardware[] = [
	// --- NVIDIA 50-SERIES (The 2026 Meta) ---
	{
		slug: 'rtx-5090',
		name: 'NVIDIA RTX 5090',
		score: 100,
		tier: 'GOD-TIER',
		price: '$1,999',
	},
	{
		slug: 'rtx-5080',
		name: 'NVIDIA RTX 5080',
		score: 88,
		tier: 'ULTRA',
		price: '$1,199',
	},
	{
		slug: 'rtx-5070-ti',
		name: 'NVIDIA RTX 5070 Ti',
		score: 75,
		tier: 'HIGH',
		price: '$799',
	},
	{
		slug: 'rtx-5070',
		name: 'NVIDIA RTX 5070',
		score: 68,
		tier: 'RECOMMENDED',
		price: '$599',
	},
	{
		slug: 'rtx-5060',
		name: 'NVIDIA RTX 5060',
		score: 48,
		tier: 'ENTRY',
		price: '$399',
	},

	// --- NVIDIA 40-SERIES (The "Will it still work?" Traffic) ---
	{
		slug: 'rtx-4090',
		name: 'NVIDIA RTX 4090',
		score: 85,
		tier: 'ULTRA',
		price: 'N/A',
	},
	{
		slug: 'rtx-4070-super',
		name: 'NVIDIA RTX 4070 Super',
		score: 62,
		tier: 'STABLE',
		price: 'N/A',
	},
	{
		slug: 'rtx-4060',
		name: 'NVIDIA RTX 4060',
		score: 39,
		tier: 'WARNING',
		price: 'N/A',
	},

	// --- AMD RDNA 4 (The Competitors) ---
	{
		slug: 'rx-9900-xtx',
		name: 'AMD Radeon RX 9900 XTX',
		score: 95,
		tier: 'GOD-TIER',
		price: '$999',
	},
	{
		slug: 'rx-9800-xt',
		name: 'AMD Radeon RX 9800 XT',
		score: 80,
		tier: 'ULTRA',
		price: '$749',
	},
	{
		slug: 'rx-7600',
		name: 'AMD Radeon RX 7600',
		score: 32,
		tier: 'FAIL',
		price: 'N/A',
	},

	// --- POPULAR CPUS ---
	{
		slug: 'i9-16900k',
		name: 'Intel Core i9-16900K',
		score: 100,
		tier: 'GOD-TIER',
		price: '$589',
	},
	{
		slug: 'ryzen-9-9950x',
		name: 'AMD Ryzen 9 9950X',
		score: 98,
		tier: 'ULTRA',
		price: '$649',
	},
	{
		slug: 'i5-13600k',
		name: 'Intel Core i5-13600K',
		score: 42,
		tier: 'WARNING',
		price: 'N/A',
	},
];
