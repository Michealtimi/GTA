export interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'shop' | 'safehouse' | 'garage' | 'casino' | 'landmark';
  description: string;
  color: string;
}

export const locations: Location[] = [
  {
    id: 'ocean_beach',
    name: 'Ocean Beach',
    lat: 25.78,
    lng: -80.12,
    type: 'landmark',
    description: 'Scenic beachfront with palm trees. Popular hangout spot.',
    color: '#00FFFF',
  },
  {
    id: 'vice_point',
    name: 'Vice Point',
    lat: 25.82,
    lng: -80.15,
    type: 'landmark',
    description: 'Upscale district. Art deco buildings and premium shops.',
    color: '#FF00FF',
  },
  {
    id: 'south_point',
    name: 'South Point',
    lat: 25.75,
    lng: -80.18,
    type: 'shop',
    description: 'Downtown shopping district. Multiple car vendors.',
    color: '#FFD700',
  },
  {
    id: 'starfish_island',
    name: 'Starfish Island',
    lat: 25.79,
    lng: -80.25,
    type: 'safehouse',
    description: 'Private island estate. Safe haven for operations.',
    color: '#00FF00',
  },
  {
    id: 'prawn_island',
    name: 'Prawn Island',
    lat: 25.88,
    lng: -80.12,
    type: 'garage',
    description: 'Hidden garage. Vehicle storage and upgrades.',
    color: '#FF6347',
  },
];

export function getLocationsByType(type: Location['type']): Location[] {
  return locations.filter((l) => l.type === type);
}

export function getLocationById(id: string): Location | undefined {
  return locations.find((l) => l.id === id);
}

export function getMapCenter(): [number, number] {
  const avgLat = locations.reduce((sum, l) => sum + l.lat, 0) / locations.length;
  const avgLng = locations.reduce((sum, l) => sum + l.lng, 0) / locations.length;
  return [avgLat, avgLng];
}
