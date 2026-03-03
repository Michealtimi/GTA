'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scorePC, getGPUList, AuditResult } from '@/lib/gpu-scorer';
import { Button } from '@/components/ui/button';

import type { Hardware } from '@/lib/hardware';

type PCAuditProps = {
	hardware?: Hardware;
};

export function PCAudit({ hardware }: PCAuditProps) {
	const [gpu, setGpu] = useState<string>(hardware?.name || '');
	const [cpu, setCpu] = useState<string>('');
	const [ram, setRam] = useState<number>(16);
	const [storage, setStorage] = useState<number>(512);
	const [result, setResult] = useState<AuditResult | null>(null);
	const [submitted, setSubmitted] = useState(false);

	const gpuOptions = getGPUList();

	// Amazon Affiliate Buy Button logic
	const getAmazonUrl = () => {
		const query = hardware?.name || gpu;
		if (!query) return '#';
		return `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=YOUR_AFFILIATE_ID`;
	};

	const shouldGlow = (result: AuditResult | null) => {
		if (!result) return false;
		return result.rating === 'POOR' || result.rating === 'MODERATE';
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!gpu && !hardware) return;
		// If hardware prop is provided, use its data for result
		if (hardware) {
			setResult({
				rating:
					hardware.tier === 'FAIL' ? 'POOR'
					: hardware.tier === 'WARNING' ? 'MODERATE'
					: 'EXCELLENT',
				details: `Official verdict for ${hardware.name}`,
				hardware,
			});
			setSubmitted(true);
			return;
		}
		if (!gpu || !cpu) return;
		const auditResult = scorePC(gpu, cpu, ram, storage);
		setResult(auditResult);
		setSubmitted(true);
	};

	const getRatingColor = (rating: AuditResult['rating']) => {
		switch (rating) {
			case 'EXCELLENT':
				return 'text-green-400';
			case 'GREAT':
				return 'text-cyan-400';
			case 'GOOD':
				return 'text-yellow-400';
			case 'MODERATE':
				return 'text-orange-400';
			case 'POOR':
				return 'text-red-400';
			default:
				return 'text-white';
		}
	};

	return (
		<section
			id='audit'
			className='relative py-12 sm:py-16 md:py-20 px-4 sm:px-6'
		>
			<div className='absolute inset-0 grid-pattern opacity-10' />
			<div className='absolute inset-0 scan-lines opacity-20' />

			<div className='max-w-4xl mx-auto relative z-10'>
				{/* Section title */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className='mb-8 sm:mb-12 text-center'
				>
					<h2 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4'>
						<span className='text-glow-purple'>
							PC Audit System
						</span>
					</h2>
					<p className='text-sm sm:text-base md:text-lg text-muted-foreground'>
						Check if your rig can handle Vice City in all its glory
					</p>
				</motion.div>

				{/* Form */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.1 }}
					viewport={{ once: true }}
					className='glass-effect rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8'
				>
					<form
						onSubmit={handleSubmit}
						className='space-y-6'
					>
						{/* GPU Selection */}
						<div className='space-y-2'>
							<label className='block text-sm font-semibold text-foreground'>
								Graphics Card
							</label>
							<select
								value={gpu}
								onChange={(e) => setGpu(e.target.value)}
								className='w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary'
							>
								<option value=''>Select a GPU...</option>
								{gpuOptions.map((option) => (
									<option
										key={option}
										value={option}
									>
										{option}
									</option>
								))}
							</select>
						</div>

						{/* CPU Input */}
						<div className='space-y-2'>
							<label className='block text-sm font-semibold text-foreground'>
								Processor
							</label>
							<input
								type='text'
								value={cpu}
								onChange={(e) => setCpu(e.target.value)}
								placeholder='e.g., Ryzen 9 7950X, Core i9-13900KS'
								className='w-full bg-input border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary'
							/>
						</div>

						{/* RAM Slider */}
						<div className='space-y-2'>
							<label className='flex items-center justify-between text-sm font-semibold text-foreground'>
								<span>RAM</span>
								<span className='text-primary'>{ram} GB</span>
							</label>
							<input
								type='range'
								min='8'
								max='128'
								step='8'
								value={ram}
								onChange={(e) => setRam(Number(e.target.value))}
								className='w-full h-2 bg-input rounded-lg appearance-none cursor-pointer accent-primary'
							/>
							<div className='flex justify-between text-xs text-muted-foreground'>
								<span>8 GB</span>
								<span>128 GB</span>
							</div>
						</div>

						{/* Storage Slider */}
						<div className='space-y-2'>
							<label className='flex items-center justify-between text-sm font-semibold text-foreground'>
								<span>Storage Available</span>
								<span className='text-primary'>
									{storage} GB
								</span>
							</label>
							<input
								type='range'
								min='256'
								max='4096'
								step='256'
								value={storage}
								onChange={(e) =>
									setStorage(Number(e.target.value))
								}
								className='w-full h-2 bg-input rounded-lg appearance-none cursor-pointer accent-primary'
							/>
							<div className='flex justify-between text-xs text-muted-foreground'>
								<span>256 GB</span>
								<span>4 TB</span>
							</div>
						</div>

						{/* Submit Button */}
						<Button
							type='submit'
							disabled={!gpu || !cpu}
							className='w-full bg-primary text-primary-foreground hover:bg-primary/90 neon-glow py-2'
						>
							Run Audit
						</Button>
					</form>
				</motion.div>

				{/* Results */}
				<AnimatePresence>
					{result && submitted && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.6 }}
							className='glass-effect-dark rounded-xl p-8 space-y-6'
						>
							{/* Score Display */}
							<div className='flex flex-col items-center justify-center py-8 border-b border-border'>
								<motion.div
									initial={{ scale: 0, rotate: -180 }}
									animate={{ scale: 1, rotate: 0 }}
									transition={{
										duration: 0.8,
										ease: 'easeOut',
									}}
									className='text-center'
								>
									<div className='text-6xl font-bold mb-2'>
										<span
											className={getRatingColor(
												result.rating,
											)}
										>
											{result.score}
										</span>
										<span className='text-2xl text-muted-foreground'>
											/100
										</span>
									</div>
									<div
										className={`text-2xl font-bold mb-2 ${getRatingColor(result.rating)}`}
									>
										{result.rating}
									</div>
								</motion.div>
							</div>

							{/* Details & Buy Button */}
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.6, delay: 0.2 }}
								className='space-y-4'
							>
								<div>
									<h3 className='font-semibold text-foreground mb-2'>
										System Analysis
									</h3>
									<p className='text-muted-foreground'>
										{result.details}
									</p>
								</div>

								<div>
									<h3 className='font-semibold text-accent mb-2'>
										Recommendation
									</h3>
									<p className='text-muted-foreground'>
										{result.recommendation}
									</p>
								</div>

								{/* Amazon Buy Button */}
								<a
									href={getAmazonUrl()}
									target='_blank'
									rel='noopener noreferrer'
									className={`block w-full mt-4 py-3 rounded-lg font-bold text-center transition shadow-lg ${shouldGlow(result) ? 'bg-yellow-400 text-black animate-glow' : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'}`}
								>
									Check Price on Amazon
								</a>
							</motion.div>

							{/* System Info */}
							<div className='grid grid-cols-2 gap-4 pt-6 border-t border-border'>
								<div className='space-y-1'>
									<p className='text-sm text-muted-foreground'>
										GPU
									</p>
									<p className='font-semibold text-foreground'>
										{gpu}
									</p>
								</div>
								<div className='space-y-1'>
									<p className='text-sm text-muted-foreground'>
										CPU
									</p>
									<p className='font-semibold text-foreground'>
										{cpu}
									</p>
								</div>
								<div className='space-y-1'>
									<p className='text-sm text-muted-foreground'>
										RAM
									</p>
									<p className='font-semibold text-foreground'>
										{ram} GB
									</p>
								</div>
								<div className='space-y-1'>
									<p className='text-sm text-muted-foreground'>
										Storage
									</p>
									<p className='font-semibold text-foreground'>
										{storage} GB
									</p>
								</div>
							</div>

							{/* Audit Again Button */}
							<Button
								onClick={() => {
									setResult(null);
									setSubmitted(false);
									setGpu('');
									setCpu('');
									setRam(16);
									setStorage(512);
								}}
								className='w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-2'
							>
								Audit Another PC
							</Button>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</section>
	);
}
