export interface Vehicle {
	id: string;
	name: string;
	category: 'sports' | 'muscle' | 'luxury' | 'vintage' | 'exotic';
	year: number;
	description: string;
	topSpeed: number;
	acceleration: number;
	handling: number;
	price: number;
	image: string;
}

export const vehicles: Vehicle[] = [
	{
		id: 'cheetah2',
		name: 'Cheetah 2',
		category: 'sports',
		year: 1998,
		description:
			'Iconic two-seater sports car. A staple of Vice City streets.',
		topSpeed: 160,
		acceleration: 85,
		handling: 80,
		price: 95000,
		image: 'https://static.wikia.nocookie.net/gtawiki/images/7/71/Cheetah-GTAVC.png',
	},
	{
		id: 'banshee',
		name: 'Banshee',
		category: 'sports',
		year: 1998,
		description: 'Classic American sports car with aggressive styling.',
		topSpeed: 150,
		acceleration: 78,
		handling: 75,
		price: 85000,
		image: 'https://static.wikia.nocookie.net/gtawiki/images/4/4b/Banshee-GTAVC.png',
	},
	{
		id: 'infernus',
		name: 'Infernus',
		category: 'exotic',
		year: 1998,
		description:
			'Premium exotic sports car. Ultra-high performance machine.',
		topSpeed: 200,
		acceleration: 95,
		handling: 85,
		price: 250000,
		image: 'https://static.wikia.nocookie.net/gtawiki/images/2/23/Infernus-GTAVC.png',
	},
	{
		id: 'comet',
		name: 'Comet',
		category: 'sports',
		year: 1998,
		description: 'Sleek two-door sports car. Fast and nimble.',
		topSpeed: 155,
		acceleration: 82,
		handling: 78,
		price: 80000,
		image: 'https://static.wikia.nocookie.net/gtawiki/images/4/4c/Comet-GTAVC.png',
	},
	{
		id: 'phoenix',
		name: 'Phoenix',
		category: 'muscle',
		year: 1970,
		description: 'Classic muscle car. Raw power and style.',
		topSpeed: 140,
		acceleration: 88,
		handling: 65,
		price: 65000,
		image: 'https://static.wikia.nocookie.net/gtawiki/images/d/d4/Phoenix-GTAVC.png',
	},
	{
		id: 'sabregt',
		name: 'Sabre GT',
		category: 'muscle',
		year: 1972,
		description: 'American muscle legend. Straight line beast.',
		topSpeed: 145,
		acceleration: 90,
		handling: 62,
		price: 72000,
		image: 'https://static.wikia.nocookie.net/gtawiki/images/6/6f/SabreTurbo-GTAVC.png',
	},
	{
		id: 'deluxo',
		name: 'Deluxo',
		category: 'luxury',
		year: 1985,
		description: 'Timeless luxury vehicle. Elegant and sophisticated.',
		topSpeed: 120,
		acceleration: 70,
		handling: 70,
		price: 95000,
		image: 'https://static.wikia.nocookie.net/gtawiki/images/0/0c/Deluxo-GTAVC.png',
	},
	{
		id: 'elegance',
		name: 'Elegance',
		category: 'luxury',
		year: 1980,
		description: 'Premium luxury sedan. The epitome of class.',
		topSpeed: 130,
		acceleration: 68,
		handling: 72,
		price: 110000,
		image: 'https://static.wikia.nocookie.net/gtawiki/images/a/a7/Admiral-GTAVC.png',
	},
	{
		id: 'vcnmercenary',
		name: 'VC-NM Mercenary',
		category: 'exotic',
		year: 1998,
		description: 'High-performance exotic. Built for speed and agility.',
		topSpeed: 190,
		acceleration: 92,
		handling: 88,
		price: 200000,
		image: 'https://static.wikia.nocookie.net/gtawiki/images/e/e0/Stinger-GTAVC.png',
	},
	{
		id: 'forelli',
		name: 'Forelli Bounded',
		category: 'vintage',
		year: 1965,
		description: 'Vintage classic. A piece of automotive history.',
		topSpeed: 110,
		acceleration: 50,
		handling: 60,
		price: 45000,
		image: 'https://static.wikia.nocookie.net/gtawiki/images/1/13/Glendale-GTAVC.png',
	},
	{
		id: 'stallion',
		name: 'Stallion',
		category: 'muscle',
		year: 1975,
		description: 'Aggressive muscle car. Pure American performance.',
		topSpeed: 150,
		acceleration: 89,
		handling: 64,
		price: 75000,
		image: 'https://static.wikia.nocookie.net/gtawiki/images/e/e3/Stallion-GTAVC.png',
	},
	{
		id: 'stretch',
		name: 'Stretch',
		category: 'luxury',
		year: 1985,
		description: 'Limousine. The ultimate in luxury and comfort.',
		topSpeed: 125,
		acceleration: 65,
		handling: 68,
		price: 150000,
		image: 'https://static.wikia.nocookie.net/gtawiki/images/0/01/Stretch-GTAVC.png',
	},
];

export function getVehiclesByCategory(
	category: Vehicle['category'],
): Vehicle[] {
	return vehicles.filter((v) => v.category === category);
}

export function searchVehicles(query: string): Vehicle[] {
	const lowerQuery = query.toLowerCase();
	return vehicles.filter(
		(v) =>
			v.name.toLowerCase().includes(lowerQuery) ||
			v.description.toLowerCase().includes(lowerQuery) ||
			v.category.toLowerCase().includes(lowerQuery),
	);
}

export function getVehicleById(id: string): Vehicle | undefined {
	return vehicles.find((v) => v.id === id);
}
