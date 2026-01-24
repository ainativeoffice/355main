export interface Product {
  name: string;
  brand: string;
  image?: string;
  url: string;
  pdf?: string;
  desc: string;
}

export interface Zone {
  id: number;
  title: string;
  desc: string;
  x: number;
  y: number;
  images: string[];
  products: Product[];
}

export const zoneCoordinates = [
  { id: 1, title: "Production Suite", x: 39, y: 10.5 },
  { id: 4, title: "Conference Area", x: 10.5, y: 41.5 },
  { id: 5, title: "Private Office", x: 26.5, y: 49 },
  { id: 6, title: "Team Offices", x: 31, y: 54.5 },
  { id: 7, title: "Resource Room", x: 42, y: 50.5 },
  { id: 8, title: "Dynamic Space", x: 57.5, y: 55 },
  { id: 9, title: "Break Room", x: 85.5, y: 58.5 },
  { id: 10, title: "Shared Café", x: 48, y: 36.5 },
  { id: 11, title: "Semi-Private Conference", x: 36.5, y: 34 },
] as const;

export function findZoneById(zones: { id: number }[], id: number) {
  return zones.find(z => z.id === id);
}

export function getZoneIndex(zones: { id: number }[], id: number): number {
  return zones.findIndex(z => z.id === id);
}

export function getNextZoneIndex(currentIndex: number, totalZones: number): number {
  return (currentIndex + 1) % totalZones;
}

export function getPrevZoneIndex(currentIndex: number, totalZones: number): number {
  return (currentIndex - 1 + totalZones) % totalZones;
}

export function isValidCoordinate(value: number): boolean {
  return value >= 0 && value <= 100;
}
