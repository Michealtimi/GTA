'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import L from 'leaflet';
import { locations, Location } from '@/lib/locations';
import 'leaflet/dist/leaflet.css';

const typeIcons: Record<string, string> = {
  shop: '🛒',
  safehouse: '🏠',
  garage: '🚗',
  casino: '🎰',
  landmark: '🌴',
};

const typeLabels: Record<string, string> = {
  shop: 'Shop',
  safehouse: 'Safehouse',
  garage: 'Garage',
  casino: 'Casino',
  landmark: 'Landmark',
};

const colorMap: Record<string, string> = {
  shop: '#FF1493',
  safehouse: '#00FFFF',
  garage: '#FFD700',
  casino: '#FF69B4',
  landmark: '#00FF00',
};

export function ViceCityMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  useEffect(() => {
    // Only initialize map once
    if (mapInstanceRef.current || !mapRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([25.8, -80.15], 11);

    // Add tile layer with inverted colors for dark theme
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      className: 'map-tiles',
    }).addTo(map);

    // Add CSS for inverted tiles
    const style = document.createElement('style');
    style.innerHTML = `
      .map-tiles {
        filter: invert(0.9) hue-rotate(180deg);
      }
    `;
    document.head.appendChild(style);

    // Add markers
    locations.forEach((location) => {
      const color = colorMap[location.type] || '#FF1493';
      
      const customIcon = L.divIcon({
        html: `
          <div style="
            background-color: ${color};
            border: 2px solid ${color};
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 10px ${color}, 0 0 20px ${color};
            position: relative;
          ">
            <div style="
              width: 10px;
              height: 10px;
              background-color: white;
              border-radius: 50%;
            "></div>
          </div>
        `,
        iconSize: [30, 30],
        className: 'custom-marker',
      });

      const marker = L.marker([location.lat, location.lng], { icon: customIcon })
        .bindPopup(
          `<div style="color: #000;">
            <p style="font-weight: bold; margin: 0;">${location.name}</p>
            <p style="margin: 4px 0 0 0; font-size: 12px;">${location.description}</p>
          </div>`
        )
        .on('click', () => {
          setSelectedLocation(location);
        })
        .addTo(map);
    });

    mapInstanceRef.current = map;

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Map Container */}
      <div className="rounded-lg overflow-hidden border border-border shadow-lg">
        <div
          ref={mapRef}
          style={{
            height: '500px',
            width: '100%',
            background: '#0a0a0a',
          }}
          className="z-0"
        />
      </div>

      {/* Legend and Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-effect rounded-lg p-6"
        >
          <h3 className="font-semibold text-foreground mb-4">Location Types</h3>
          <div className="space-y-3">
            {Object.entries(typeLabels).map(([type, label]) => (
              <div key={type} className="flex items-center gap-3">
                <div className="text-2xl">{typeIcons[type]}</div>
                <div>
                  <p className="text-sm font-medium text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground">
                    {locations.filter((l) => l.type === type).length} location
                    {locations.filter((l) => l.type === type).length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Selected Location Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="glass-effect rounded-lg p-6"
        >
          <h3 className="font-semibold text-foreground mb-4">Location Details</h3>
          {selectedLocation ? (
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-semibold text-foreground">{selectedLocation.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                <p className="font-semibold text-foreground flex items-center gap-2">
                  <span>{typeIcons[selectedLocation.type]}</span>
                  {typeLabels[selectedLocation.type]}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="text-foreground">{selectedLocation.description}</p>
              </div>
              <div className="flex gap-4 pt-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Lat</p>
                  <p className="font-mono text-primary">{selectedLocation.lat.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Lng</p>
                  <p className="font-mono text-primary">{selectedLocation.lng.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">Click on a marker to view location details</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
