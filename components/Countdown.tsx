// Animated Countdown Component for Milestones
'use client';
import FlipClock from 'react-flip-clock';
import { useMemo } from 'react';

const milestones = [
	{ label: 'Trailer 2 Drop', date: '2026-04-15T00:00:00Z' },
	{ label: 'Gold Master', date: '2026-09-01T00:00:00Z' },
	{ label: 'Console Launch', date: '2026-11-19T00:00:00Z' },
	{ label: 'PC Launch', date: '2027-11-01T00:00:00Z' },
];

export default function Countdown() {
	const now = new Date();
	const next = useMemo(() => {
		return (
			milestones.find((m) => new Date(m.date) > now) ||
			milestones[milestones.length - 1]
		);
	}, [now]);

	// If the last milestone is reached, show LIVE NOW
	if (new Date(next.date) < now && next.label === 'Console Launch') {
		return (
			<div
				style={{ fontSize: 48, color: '#e6007a', textAlign: 'center' }}
			>
				LIVE NOW
			</div>
		);
	}

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<FlipClock
				countdown
				to={new Date(next.date)}
				labels={{
					days: 'Days',
					hours: 'Hours',
					minutes: 'Minutes',
					seconds: 'Seconds',
				}}
				theme='dark'
				size='large'
			/>
			<div
				style={{
					textAlign: 'center',
					color: '#e6007a',
					fontWeight: 600,
					marginTop: 8,
					fontSize: 24,
				}}
			>
				{next.label}
			</div>
		</div>
	);
}
