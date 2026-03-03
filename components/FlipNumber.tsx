import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FlipNumber({
	value,
	size = 'big',
}: {
	value: number;
	size?: 'big' | 'small';
}) {
	const [prev, setPrev] = useState(value);
	const [flipping, setFlipping] = useState(false);

	useEffect(() => {
		if (value !== prev) {
			setFlipping(true);
			const timeout = setTimeout(() => {
				setPrev(value);
				setFlipping(false);
			}, 400);
			return () => clearTimeout(timeout);
		}
	}, [value, prev]);

	const fontSize = size === 'big' ? 'clamp(2rem, 6vw, 4rem)' : 'clamp(1rem, 4vw, 2rem)';
	const boxSize = size === 'big' ? 'clamp(60px, 15vw, 100px)' : 'clamp(35px, 8vw, 50px)';
	const boxHeight = size === 'big' ? 'clamp(72px, 18vw, 120px)' : 'clamp(42px, 9.6vw, 60px)';
	const padding = size === 'big' ? '0.5em 0.3em' : '0.2em 0.1em';

	return (
		<div
			style={{
				width: boxSize,
				height: boxHeight,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				perspective: 1000,
				padding,
				position: 'relative',
			}}
		>
			<AnimatePresence mode='popLayout'>
				{flipping ?
					<motion.div
						key={value}
						initial={{ rotateX: 0 }}
						animate={{ rotateX: 90 }} // Flip downward
						exit={{ opacity: 0 }}
						transition={{ duration: 0.4, ease: 'easeInOut' }}
						style={{
							width: '100%',
							height: '100%',
							background: '#111',
							borderRadius: 16,
							boxShadow: '0 2px 16px #0008',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize,
							fontWeight: 900,
							color: '#fff',
							textShadow: '0 2px 8px #000a',
							position: 'absolute',
							top: 0,
							left: 0,
							zIndex: 2,
							transformOrigin: 'top', // Flip downward
						}}
					>
						{prev.toString().padStart(2, '0')}
					</motion.div>
				:	<motion.div
						key={value}
						initial={{ rotateX: -90 }}
						animate={{ rotateX: 0 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.4, ease: 'easeInOut' }}
						style={{
							width: '100%',
							height: '100%',
							background: '#111',
							borderRadius: 16,
							boxShadow: '0 2px 16px #0008',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize,
							fontWeight: 900,
							color: '#fff',
							textShadow: '0 2px 8px #000a',
							position: 'absolute',
							top: 0,
							left: 0,
							zIndex: 1,
							transformOrigin: 'bottom',
						}}
					>
						{value.toString().padStart(2, '0')}
					</motion.div>
				}
			</AnimatePresence>
			{/* Middle line for flip effect */}
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: 0,
					width: '100%',
					height: 2,
					background: 'rgba(255,255,255,0.15)',
					zIndex: 10,
				}}
			/>
		</div>
	);
}
