import { notFound } from 'next/navigation';
import { fetchVehicles } from '@/lib/fetchVehicles';
import Image from 'next/image';

export async function generateMetadata({ params }: { params: { id: string } }) {
	const vehicles = await fetchVehicles();
	const vehicle = vehicles.find((v) => v.id === params.id);
	if (!vehicle) return {};
	const ogImage = `/vehicles/${vehicle.id}.jpg`;
	// Fallback to default image if not found (runtime fallback, not pre-check)
	return {
		title: `${vehicle.name} - Vice City Vehicle Details`,
		description: vehicle.description,
		openGraph: {
			title: `${vehicle.name} - Vice City Vehicle Details`,
			description: vehicle.description,
			images: [ogImage, '/vehicles/default.jpg'],
		},
		twitter: {
			card: 'summary_large_image',
			title: `${vehicle.name} - Vice City Vehicle Details`,
			description: vehicle.description,
			images: [ogImage, '/vehicles/default.jpg'],
		},
	};
}

export default async function VehiclePage({
	params,
}: {
	params: { id: string };
}) {
	const vehicles = await fetchVehicles();
	const vehicle = vehicles.find((v) => v.id === params.id);
	if (!vehicle) return notFound();

	return (
		<main className='max-w-3xl mx-auto py-16 px-4'>
			<div className='flex flex-col md:flex-row gap-8 items-center'>
				<div className='w-full md:w-1/2 aspect-video relative rounded-lg overflow-hidden shadow-lg'>
					<Image
						src={`/vehicles/${vehicle.id}.jpg`}
						alt={vehicle.name}
						fill
						style={{ objectFit: 'cover' }}
						sizes='(max-width: 768px) 100vw, 50vw'
						onError={(e) => {
							// @ts-ignore
							e.target.src = '/vehicles/default.jpg';
						}}
						priority
					/>
				</div>
				<div className='w-full md:w-1/2 space-y-4'>
					<h1 className='text-4xl font-bold'>{vehicle.name}</h1>
					<p className='text-muted-foreground'>
						{vehicle.description}
					</p>
					<div className='grid grid-cols-2 gap-2 mt-4'>
						<div>
							<span className='font-semibold'>Top Speed:</span>{' '}
							{vehicle.topSpeed} km/h
						</div>
						<div>
							<span className='font-semibold'>Acceleration:</span>{' '}
							{vehicle.acceleration}/100
						</div>
						<div>
							<span className='font-semibold'>Handling:</span>{' '}
							{vehicle.handling}/100
						</div>
						<div>
							<span className='font-semibold'>Price:</span> $
							{vehicle.price.toLocaleString()}
						</div>
					</div>
				</div>
			</div>
			{/* Notify on Release Email Capture */}
			<form
				action='/api/join-waitlist'
				method='POST'
				className='mt-8 flex flex-col gap-2 max-w-md mx-auto'
			>
				<input
					type='hidden'
					name='vehicle'
					value={vehicle.id}
				/>
				<input
					type='email'
					name='email'
					placeholder='Your email address'
					required
					className='w-full border border-border rounded-lg px-4 py-2 text-foreground bg-input placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary'
				/>
				<button
					type='submit'
					className='w-full bg-accent text-accent-foreground py-2 rounded-lg font-semibold hover:bg-accent/90 transition'
				>
					Notify on Release
				</button>
			</form>
		</main>
	);
}
