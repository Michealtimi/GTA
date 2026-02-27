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
				minWidth: size === 'big' ? 120 : 60,
				padding: size === 'big' ? '0.5rem' : '0.25rem',
			}}
		>
			<FlipNumber
				value={value}
				size={size}
			/>
			<span
				style={{
					fontSize: size === 'big' ? '1.5rem' : '0.8rem',
					color: '#fff', // White label
					marginTop: 8,
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
				fontSize: size === 'big' ? '2.5rem' : '1.2rem',
				fontWeight: 900,
				letterSpacing: '0.1em',
				marginBottom: '0.5rem',
				color: '#fff', // White label
				textAlign: 'center',
			}}
		>
			{label}
			<div
				style={{
					display: 'flex',
					gap: size === 'big' ? '1.5rem' : '0.5rem',
					justifyContent: 'center',
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
