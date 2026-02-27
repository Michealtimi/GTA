'use client';
import { notFound } from 'next/navigation';
import { HARDWARE_POOL, type Hardware } from '@/lib/hardware';
import Hero from '@/components/hero';
import { MapSection } from '@/components/map-section';
import VehicleGarage from '@/components/vehicle-garage';
import { PCAudit } from '@/components/pc-audit';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Script from 'next/script';

// --- PAGE COMPONENT ---
export default function CheckSlugPage({
	params,
}: {
	params: { slug: string };
}) {
	const hardware = HARDWARE_POOL.find(
		(h: Hardware) => h.slug === params.slug,
	);
	if (!hardware) return notFound();

	// Framer Motion scroll to Auditor
	// (Client Component logic)
	// This is a hybrid SSR/CSR pattern for smooth scroll
	// SSR: Render all sections, CSR: Scroll on mount
	const auditorRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (auditorRef.current) {
			auditorRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
		}
	}, []);

	// JSON-LD SCHEMA
	const faq = [
		{
			'@type': 'Question',
			name: `Is ${hardware.name} enough for GTA 6?`,
			acceptedAnswer: {
				'@type': 'Answer',
				text: `${hardware.tier === 'FAIL' || hardware.tier === 'WARNING' ? 'No, this hardware may struggle with GTA 6.' : 'Yes, this hardware is recommended for GTA 6.'}`,
			},
		},
	];
	const softwareApp = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: 'GTA 6 Vice City Navigator',
		operatingSystem: 'Windows, PlayStation, Xbox',
		applicationCategory: 'GameApplication',
		offers: {
			'@type': 'Offer',
			price: '69.99',
			priceCurrency: 'USD',
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.9',
			reviewCount: '12000',
		},
	};

	return (
		<main>
			<Hero />
			<MapSection />
			<VehicleGarage />
			<motion.div
				ref={auditorRef}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
			>
				<PCAudit hardware={hardware} />
			</motion.div>
			<Script
				id='faq-schema'
				type='application/ld+json'
			>
				{JSON.stringify({
					'@context': 'https://schema.org',
					'@type': 'FAQPage',
					mainEntity: faq,
				})}
			</Script>
			<Script
				id='software-schema'
				type='application/ld+json'
			>
				{JSON.stringify(softwareApp)}
			</Script>
		</main>
	);
}
