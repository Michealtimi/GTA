// Animated Countdown Component for Milestones
'use client';

import { useState, useEffect } from 'react';
import FlipNumber from './FlipNumber';

const milestones = [
	{ label: 'Trailer 2 Drop', date: '2026-04-15T00:00:00Z' },
	{ label: 'Gold Master', date: '2026-09-01T00:00:00Z' },
	{ label: 'Console Launch', date: '2026-11-19T00:00:00Z' },
	{ label: 'PC Launch', date: '2027-11-01T00:00:00Z' },
];

function getTimeLeft(target: Date) {
	const total = Math.max(0, target.getTime() - Date.now());
	const days = Math.floor(total / (1000 * 60 * 60 * 24));
	const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
	const minutes = Math.floor((total / (1000 * 60)) % 60);
	const seconds = Math.floor((total / 1000) % 60);
	return { days, hours, minutes, seconds };
}

// Helper component for time blocks
function TimeBlock({
	label,
	value,
	size = 'big',
}: {
	label: string;
	value: number;
	size?: 'big' | 'small';
}) {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				minWidth: size === 'big' ? 'clamp(50px, 12vw, 120px)' : 'clamp(40px, 8vw, 60px)',
				padding: size === 'big' ? 'clamp(0.25rem, 2vw, 0.5rem)' : 'clamp(0.15rem, 1vw, 0.25rem)',
			}}
		>
			<FlipNumber
				value={value}
				size={size}
			/>
			<span
				style={{
					fontSize: size === 'big' ? 'clamp(0.8rem, 2.5vw, 1.5rem)' : 'clamp(0.5rem, 1.5vw, 0.8rem)',
					color: '#fff',
					marginTop: 'clamp(4px, 1vw, 8px)',
					fontWeight: 700,
					letterSpacing: '0.05em',
				}}
			>
				{label}
			</span>
		</div>
	);
}

// Generic Countdown component
export default function Countdown({
	label,
	date,
	size = 'big',
}: {
	label: string;
	date: string;
	size?: 'big' | 'small';
}) {
	const target = new Date(date);
	const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeLeft(getTimeLeft(target));
		}, 1000);
		return () => clearInterval(interval);
	}, [date]);

	return (
		<div
			style={{
				fontSize: size === 'big' ? 'clamp(1.2rem, 4vw, 2.5rem)' : 'clamp(0.8rem, 2.5vw, 1.2rem)',
				fontWeight: 900,
				letterSpacing: '0.1em',
				marginBottom: 'clamp(0.25rem, 1vw, 0.5rem)',
				color: '#fff',
				textAlign: 'center',
			}}
		>
			{label}
			<div
				style={{
					display: 'flex',
					gap: size === 'big' ? 'clamp(0.5rem, 2vw, 1.5rem)' : 'clamp(0.3rem, 1.5vw, 0.5rem)',
					justifyContent: 'center',
					flexWrap: 'wrap',
				}}
			>
				<TimeBlock
					label='DAYS'
					value={timeLeft.days}
					size={size}
				/>
				<TimeBlock
					label='HOURS'
					value={timeLeft.hours}
					size={size}
				/>
				<TimeBlock
					label='MINUTES'
					value={timeLeft.minutes}
					size={size}
				/>
				<TimeBlock
					label='SECONDS'
					value={timeLeft.seconds}
					size={size}
				/>
			</div>
		</div>
	);
}
