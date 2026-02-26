import type { Metadata } from 'next';
import { Navigation } from '@/components/navigation';
import Hero from '@/components/hero';
import { PCAudit } from '@/components/pc-audit';
import { MapSection } from '@/components/map-section';
import VehicleGarage from '@/components/vehicle-garage';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
	title: 'GTA VI - Vice City Navigator',
	description:
		'Explore Vice City, audit your PC specs, and discover the perfect vehicles for your mission',
	keywords: ['GTA VI', 'Vice City', 'Navigator', 'Gaming', 'PC Audit'],
	openGraph: {
		title: 'GTA VI - Vice City Navigator',
		description:
			'Explore Vice City, audit your PC specs, and discover the perfect vehicles for your mission',
		type: 'website',
	},
};

export default function Page() {
	return (
		<main style={{ position: 'relative', minHeight: '100vh' }}>
			{/* Background image */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					backgroundImage: `url('https://www.hollywoodreporter.com/wp-content/uploads/2025/05/GTA6.jpeg?crop=0px%2C4px%2C1920px%2C1074px&resize=1000%2C563')`,
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					zIndex: 0,
				}}
			/>
			{/* Overlay */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					background: 'rgba(0,0,0,0.85)',
					zIndex: 1,
				}}
			/>
			<div style={{ position: 'relative', zIndex: 2 }}>
				{/* Navigation */}
				<Navigation />

				{/* Hero Section */}
				<section
					id='hero'
					style={{ position: 'relative', minHeight: '40vh' }}
				>
					{/* Full background for Hero section */}
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							backgroundImage: `url('https://www.hollywoodreporter.com/wp-content/uploads/2025/05/GTA6.jpeg?crop=0px%2C4px%2C1920px%2C1074px&resize=1000%2C563')`,
							backgroundPosition: 'center',
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
							zIndex: 0,
						}}
					/>
					<div style={{ position: 'relative', zIndex: 1 }}>
						<Hero />
					</div>
				</section>

				{/* PC Audit Section */}
				<section id='audit'>
					<PCAudit />
				</section>

				{/* Map Section */}
				<section id='map'>
					<MapSection />
				</section>

				{/* Vehicle Garage Section */}
				<section id='garage'>
					<VehicleGarage />
				</section>

				{/* Footer */}
				<Footer />
			</div>
		</main>
	);
}
