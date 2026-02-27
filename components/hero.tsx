'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import Countdown to avoid SSR issues with 'use client'
const Countdown = dynamic(() => import('./Countdown'), { ssr: false });

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
			delayChildren: 0.3,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: 'easeOut',
		},
	},
};

const flipVariants = {
	hidden: { rotateX: 90, opacity: 0 },
	visible: {
		rotateX: 0,
		opacity: 1,
		transition: {
			duration: 0.6,
			ease: 'easeOut',
		},
	},
};

const Hero = () => {
	return (
		<section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
			{/* Background grid pattern */}
			<div className='absolute inset-0 grid-pattern opacity-20' />
			<div className='absolute inset-0 scan-lines opacity-30' />

			{/* Gradient overlay */}
			<div className='absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/50' />

			{/* Animated background elements */}
			<motion.div
				className='absolute top-20 left-10 w-96 h-96 rounded-full opacity-10'
				style={{
					background:
						'radial-gradient(circle, var(--neon-pink), transparent)',
				}}
				animate={{
					x: [0, 20, 0],
					y: [0, 30, 0],
				}}
				transition={{
					duration: 8,
					repeat: Infinity,
					ease: 'easeInOut',
				}}
			/>

			<motion.div
				className='absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-10'
				style={{
					background:
						'radial-gradient(circle, var(--neon-purple), transparent)',
				}}
				animate={{
					x: [0, -20, 0],
					y: [0, -30, 0],
				}}
				transition={{
					duration: 10,
					repeat: Infinity,
					ease: 'easeInOut',
				}}
			/>

			{/* Content */}
			<motion.div
				className='relative z-10 max-w-4xl mx-auto px-6 text-center'
				variants={containerVariants}
				initial='hidden'
				animate='visible'
			>
				{/* Main heading and subtitle above timers */}
				<motion.h1
					variants={itemVariants}
					className='text-6xl md:text-7xl font-bold mb-6'
				>
					<span
						className='text-glow'
						style={{
							color: 'var(--neon-pink)',
							textShadow:
								'0 0 5px #fff, 0 0 10px #fff, 0 0 20px var(--neon-pink)',
						}}
					>
						GTA VI
					</span>
					<br />
					<span className='text-foreground'>Vice City Navigator</span>
				</motion.h1>

				<motion.p
					variants={itemVariants}
					className='text-xl md:text-2xl mb-8 text-amber-200'
				>
					Explore the neon-lit streets of Vice City, find the perfect
					ride, and audit your PC specs
				</motion.p>

				{/* Animated Countdown: Main Release */}
				<motion.div
					variants={flipVariants}
					className='mb-8 flex justify-center'
				>
					<Countdown
						label='GTA VI Release Date Countdown'
						date='2026-11-19T00:00:00Z'
						size='big'
					/>
				</motion.div>

				{/* Animated Countdown: Trailer Drop */}
				<motion.div
					variants={flipVariants}
					className='mb-4 flex justify-center'
				>
					<Countdown
						label='Trailer 2 Drop Countdown'
						date='2026-04-15T00:00:00Z'
						size='small'
					/>
				</motion.div>

				{/* CTA Buttons */}
				<motion.div
					variants={itemVariants}
					className='flex flex-col sm:flex-row gap-4 justify-center items-center'
				>
					<button
						type='button'
						className='px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold neon-glow cursor-pointer'
						onClick={() => {
							const el = document.getElementById('audit');
							if (el) el.scrollIntoView({ behavior: 'smooth' });
						}}
					>
						<motion.span
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							Audit Your PC
						</motion.span>
					</button>
					<button
						type='button'
						className='px-8 py-3 border-2 border-accent text-accent rounded-lg font-semibold hover:bg-accent/10 transition cursor-pointer'
						onClick={() => {
							const el = document.getElementById('garage');
							if (el) el.scrollIntoView({ behavior: 'smooth' });
						}}
					>
						<motion.span
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							Explore Vehicles
						</motion.span>
					</button>
				</motion.div>
			</motion.div>

			{/* Scroll indicator */}
			<motion.div
				className='absolute bottom-8 left-1/2 -translate-x-1/2'
				animate={{ y: [0, 10, 0] }}
				transition={{ duration: 2, repeat: Infinity }}
			>
				<div className='w-6 h-10 border-2 border-primary rounded-full flex justify-center'>
					<motion.div
						className='w-1 h-2 bg-primary rounded-full mt-2'
						animate={{ opacity: [1, 0] }}
						transition={{ duration: 1.5, repeat: Infinity }}
					/>
				</div>
			</motion.div>
		</section>
	);
};

export default Hero;
