'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ViceCityMap = dynamic(() => import('./vice-city-map').then((mod) => ({ default: mod.ViceCityMap })), {
  loading: () => (
    <div className="w-full h-96 bg-black/50 rounded-lg flex items-center justify-center">
      <p className="text-muted-foreground">Loading map...</p>
    </div>
  ),
  ssr: false,
});

export function MapSection() {
  return (
    <section id="map" className="relative py-20 px-6">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute inset-0 scan-lines opacity-20" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="text-glow-cyan" style={{ textShadow: '0 0 10px var(--neon-cyan), 0 0 20px var(--neon-cyan), 0 0 30px var(--neon-cyan)' }}>
              Vice City Map
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore key locations across Vice City and plan your journey
          </p>
        </motion.div>

        {/* Map */}
        <Suspense
          fallback={
            <div className="w-full h-96 bg-black/50 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Loading map...</p>
            </div>
          }
        >
          <ViceCityMap />
        </Suspense>
      </div>
    </section>
  );
}
