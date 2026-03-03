'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import AdSlot from './AdSlot';
import AdsenseSlot from './adsense-slot'; // auto-ads component (use wherever you want an ad)
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Vehicle } from '@/lib/vehicles';
import { fetchVehicles } from '@/lib/fetchVehicles';
import { Search } from 'lucide-react';

export default function VehicleGarage() {
	type Category =
		| 'all'
		| 'sports'
		| 'muscle'
		| 'luxury'
		| 'vintage'
		| 'exotic';

	const categoryColors: Record<Exclude<Category, 'all'>, string> = {
		sports: 'from-cyan-500 to-blue-500',
		muscle: 'from-red-500 to-orange-500',
		luxury: 'from-purple-500 to-pink-500',
		vintage: 'from-amber-500 to-yellow-500',
		exotic: 'from-pink-500 to-purple-500',
	};

	const categoryEmojis: Record<Exclude<Category, 'all'>, string> = {
		sports: '⚡',
		muscle: '💪',
		luxury: '👑',
		vintage: '🏛️',
		exotic: '🌟',
	};

	// ...existing code...
	const { toast } = useToast();
	const formRef = useRef<HTMLFormElement>(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState<Category>('all');
	const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(
		null,
	);
	const [vehicles, setVehicles] = useState<Vehicle[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let mounted = true;
		fetchVehicles().then((data) => {
			if (mounted) {
				setVehicles(data);
				setLoading(false);
			}
		});
		return () => {
			mounted = false;
		};
	}, []);

	const filteredVehicles = useMemo(() => {
		let result = vehicles;
		if (selectedCategory !== 'all') {
			result = result.filter((v) => v.category === selectedCategory);
		}
		if (searchQuery) {
			result = result.filter(
				(v) =>
					v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
					v.description
						.toLowerCase()
						.includes(searchQuery.toLowerCase()),
			);
		}
		return result;
	}, [vehicles, selectedCategory, searchQuery]);

	return (
		<section
			id='garage'
			className='relative py-12 sm:py-16 md:py-20 px-4 sm:px-6'
		>
			{/* Example using the auto-ads component instead of a manual slot. In
			    adsense-slot.tsx replace YOUR_SIDEBAR_SLOT_ID with your real unit id.
			    This will render a responsive ad that adapts to the available space. */}
			<div className='adspace-top mb-8 flex justify-center'>
				<AdsenseSlot />
			</div>

			<section className='about-leonida mt-8 sm:mt-12 lg:mt-16 bg-background rounded-lg p-4 sm:p-6 shadow-lg'>
				<h2 className='text-2xl sm:text-3xl font-bold mb-3 sm:mb-4'>
					About Leonida: GTA VI, Hardware Requirements & Vice City
					History
				</h2>
				<article className='prose w-full text-muted-foreground'>
					{/* About Leonida, Hardware Requirements & Vice City History */}
					Grand Theft Auto VI (GTA VI) is the latest installment in
					Rockstar Games' iconic open-world series, set in the vibrant
					city of Leonida—a fictional reimagining of Vice City. The
					game promises a massive leap in realism, storytelling, and
					gameplay mechanics, pushing the boundaries of what players
					expect from the franchise. Leonida is a sprawling metropolis
					inspired by Miami, featuring neon-lit streets, bustling
					beaches, and a rich cultural tapestry that immerses players
					in a world of crime, ambition, and adventure. The hardware
					requirements for GTA VI reflect its ambitious scope. To
					fully experience the game, players will need a modern gaming
					PC or console. Recommended specs include an Intel Core i7 or
					AMD Ryzen 7 processor, 16GB RAM, and a graphics card such as
					the NVIDIA RTX 5070 or AMD Radeon RX 8800 XT. Storage
					requirements are substantial, with at least 200GB of free
					space suggested on an NVMe SSD. These specs ensure smooth
					gameplay, high-resolution textures, and advanced effects
					like ray tracing, dynamic weather, and realistic NPC
					behavior. For consoles, the game is optimized for
					PlayStation 5 Pro and the 2026 Xbox refreshes, leveraging
					their powerful GPUs for seamless exploration. Vice City,
					first introduced in 2002, has a storied history within the
					Grand Theft Auto universe. The city is known for its pastel
					colors, retro vibes, and a soundtrack that captures the
					essence of the coast. Over the years, Vice City has evolved
					from a pixelated playground to a fully realized urban
					landscape. GTA VI's Leonida builds on this legacy, offering
					new districts, expanded lore, and deeper character
					interactions. Players can expect to revisit iconic
					locations, meet familiar faces, and uncover secrets that
					connect the neon past to the hyper-realistic present
					narrative. Beyond its technical achievements, GTA VI is
					celebrated for its attention to detail. The development team
					spent years researching Leonida's architecture and culture
					to create a city that feels alive. From the sun-soaked
					boardwalks to the gritty inner neighborhoods, Leonida is a
					playground for both new and veteran players. The game
					introduces innovative features such as dynamic police
					responses, evolving criminal networks, and a branching
					storyline. These elements ensure that every playthrough is
					unique, rewarding exploration and experimentation in the
					most advanced open world ever created.
				</article>
			</section>
			<div className='adspace-bottom mt-12 flex justify-center'>
				{/* Another slot - plug a second slot ID here if desired. */}
				<AdSlot slot="BOTTOM_SLOT_ID" style={{ minHeight: 90, width: '100%' }} />
			</div>
			<div className='absolute inset-0 grid-pattern opacity-10' />
			<div className='absolute inset-0 scan-lines opacity-20' />
			<div className='max-w-6xl mx-auto relative z-10'>
				{/* Section title */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className='mt-6 mb-8 sm:mb-12 text-center'
				>
					<h2 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4'>
						<span className='text-glow'>Vice City Garage</span>
					</h2>
					<p className='text-sm sm:text-base md:text-lg text-muted-foreground'>
						Explore the finest collection of vehicles in Vice City
					</p>
				</motion.div>

				{/* Search and Filter */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.1 }}
					viewport={{ once: true }}
					className='space-y-6 mb-12'
				>
					{/* Search Bar */}
					<div className='relative'>
						<Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground' />
						<input
							type='text'
							placeholder='Search vehicles...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className='w-full bg-input border border-border rounded-lg pl-12 pr-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary'
						/>
					</div>

					{/* Category Filters */}
					<div className='flex flex-wrap gap-3'>
						{(
							[
								'all',
								'sports',
								'muscle',
								'luxury',
								'vintage',
								'exotic',
							] as const
						).map((category) => (
							<motion.button
								key={category}
								onClick={() => setSelectedCategory(category)}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className={`px-4 py-2 rounded-lg font-semibold transition-all ${
									selectedCategory === category ?
										'bg-primary text-primary-foreground neon-glow'
									:	'bg-secondary text-secondary-foreground hover:bg-secondary/80'
								}`}
							>
								{category === 'all' ?
									'All Vehicles'
								:	`${categoryEmojis[category as Exclude<Category, 'all'>]} ${
										category.charAt(0).toUpperCase() +
										category.slice(1)
									}`
								}
							</motion.button>
						))}
					</div>
				</motion.div>

				{/* Vehicle Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{filteredVehicles.map((vehicle, index) => (
						<motion.div
							key={vehicle.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.05 }}
							viewport={{ once: true }}
							onClick={() => setSelectedVehicle(vehicle)}
							className='cursor-pointer group'
						>
							<div
								className={`glass-effect rounded-lg overflow-hidden transition-all hover:scale-105`}
							>
								{/* Vehicle Card Header with Image */}
								<div
									className={`h-32 bg-linear-to-br ${
										categoryColors[
											vehicle.category as Exclude<
												Category,
												'all'
											>
										]
									} p-4 flex items-end relative overflow-hidden`}
								>
									<div className='absolute inset-0 opacity-20'>
										<div className='absolute inset-0 bg-linear-to-t from-black/50 to-transparent' />
									</div>
									<div className='absolute right-2 top-2 w-24 h-16 rounded shadow-lg overflow-hidden z-10'>
										<img
											src={vehicle.image}
											alt={vehicle.name}
											referrerPolicy='no-referrer'
											className='rounded w-full h-full object-cover'
											style={{
												width: '100%',
												height: '100%',
											}}
										/>
									</div>
									<div className='relative z-20'>
										<h3 className='text-xl font-bold text-white'>
											{vehicle.name}
										</h3>
										<p className='text-sm text-white/80'>
											{vehicle.year}
										</p>
									</div>
								</div>

								{/* Card Content */}
								<div className='p-4 space-y-4'>
									{/* Category Badge */}
									<div className='flex items-center gap-2'>
										<span className='text-xl'>
											{
												categoryEmojis[
													vehicle.category as Exclude<
														Category,
														'all'
													>
												]
											}
										</span>
										<span className='text-sm font-semibold text-primary capitalize'>
											{vehicle.category}
										</span>
									</div>

									{/* Description */}
									<p className='text-sm text-muted-foreground line-clamp-2'>
										{vehicle.description}
									</p>

									{/* Stats */}
									<div className='space-y-2 pt-2 border-t border-border'>
										<div className='flex justify-between text-sm'>
											<span className='text-muted-foreground'>
												Top Speed
											</span>
											<span className='font-semibold text-foreground'>
												{vehicle.topSpeed} km/h
											</span>
										</div>
										<div className='flex justify-between text-sm'>
											<span className='text-muted-foreground'>
												Acceleration
											</span>
											<span className='font-semibold text-foreground'>
												{vehicle.acceleration}/100
											</span>
										</div>
										<div className='flex justify-between text-sm'>
											<span className='text-muted-foreground'>
												Handling
											</span>
											<span className='font-semibold text-foreground'>
												{vehicle.handling}/100
											</span>
										</div>
									</div>

									{/* Price */}
									<div className='pt-2 border-t border-border'>
										<p className='text-sm text-muted-foreground'>
											Price
										</p>
										<p className='text-lg font-bold text-accent'>
											${vehicle.price.toLocaleString()}
										</p>
									</div>

									{/* View Details Button */}
									<button className='w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:bg-primary/90 transition neon-glow'>
										View Details
									</button>
									{/* Notify on Release Email Capture */}
									<form
										ref={formRef}
										className='flex flex-col gap-2 mb-4'
										onClick={(e: React.MouseEvent) =>
											e.stopPropagation()
										}
										onSubmit={async (e) => {
											e.preventDefault();
											const form = formRef.current;
											if (!form) return;
											const formData = new FormData(form);
											const res = await fetch(
												'/api/join-waitlist',
												{
													method: 'POST',
													body: formData,
												},
											);
											if (res.ok) {
												toast({
													title: 'Success',
													description:
														'You have been added to the waitlist!',
												});
												form.reset();
											} else {
												toast({
													title: 'Error',
													description:
														'Failed to join waitlist. Try again.',
												});
											}
										}}
									>
										<input
											type='hidden'
											name='vehicle'
											value={selectedVehicle?.id || ''}
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
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{/* No Results */}
				{filteredVehicles.length === 0 && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className='text-center py-12'
					>
						<p className='text-muted-foreground text-lg'>
							No vehicles found matching your search
						</p>
					</motion.div>
				)}

				{/* Vehicle Details Modal */}
				{selectedVehicle && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						onClick={() => setSelectedVehicle(null)}
						className='fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm'
					>
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							onClick={(e) => e.stopPropagation()}
							className={`glass-effect-dark rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto`}
						>
							<div
								className={`h-48 bg-linear-to-br ${
									categoryColors[
										selectedVehicle.category as Exclude<
											Category,
											'all'
										>
									]
								} p-6 flex items-end relative`}
							>
								<div className='absolute inset-0 bg-linear-to-t from-black/60 to-transparent' />
								<div className='absolute right-4 top-4 w-40 h-28 rounded shadow-lg overflow-hidden z-10'>
									<img
										src={selectedVehicle.image}
										alt={selectedVehicle.name}
										referrerPolicy='no-referrer'
										className='rounded w-full h-full object-cover'
										style={{
											width: '100%',
											height: '100%',
										}}
									/>
								</div>
								<div className='relative z-20'>
									<h2 className='text-4xl font-bold text-white'>
										{selectedVehicle.name}
									</h2>
									<p className='text-lg text-white/80'>
										{selectedVehicle.year}
									</p>
								</div>
							</div>

							<div className='p-6 space-y-6'>
								<p className='text-foreground'>
									{selectedVehicle.description}
								</p>

								<div className='grid grid-cols-2 gap-4'>
									<div className='space-y-1'>
										<p className='text-sm text-muted-foreground'>
											Top Speed
										</p>
										<p className='text-2xl font-bold text-cyan-400'>
											{selectedVehicle.topSpeed} km/h
										</p>
									</div>
									<div className='space-y-1'>
										<p className='text-sm text-muted-foreground'>
											Acceleration
										</p>
										<p className='text-2xl font-bold text-yellow-400'>
											{selectedVehicle.acceleration}/100
										</p>
									</div>
									<div className='space-y-1'>
										<p className='text-sm text-muted-foreground'>
											Handling
										</p>
										<p className='text-2xl font-bold text-pink-400'>
											{selectedVehicle.handling}/100
										</p>
									</div>
									<div className='space-y-1'>
										<p className='text-sm text-muted-foreground'>
											Price
										</p>
										<p className='text-2xl font-bold text-green-400'>
											$
											{selectedVehicle.price.toLocaleString()}
										</p>
									</div>
								</div>

								<button
									onClick={() => setSelectedVehicle(null)}
									className='w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition'
								>
									Close
								</button>
							</div>
						</motion.div>
					</motion.div>
				)}
			</div>
		</section>
	);
}
