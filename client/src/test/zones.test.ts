import { describe, it, expect } from 'vitest';
import { 
  zoneCoordinates, 
  findZoneById, 
  getZoneIndex, 
  getNextZoneIndex, 
  getPrevZoneIndex,
  isValidCoordinate 
} from '@shared/zones';

describe('Zone Domain', () => {
  describe('Zone Coordinates', () => {
    it('should have valid x coordinates between 0 and 100', () => {
      zoneCoordinates.forEach(zone => {
        expect(isValidCoordinate(zone.x)).toBe(true);
      });
    });

    it('should have valid y coordinates between 0 and 100', () => {
      zoneCoordinates.forEach(zone => {
        expect(isValidCoordinate(zone.y)).toBe(true);
      });
    });

    it('should have unique zone IDs', () => {
      const ids = zoneCoordinates.map(z => z.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have non-empty titles', () => {
      zoneCoordinates.forEach(zone => {
        expect(zone.title).toBeTruthy();
        expect(zone.title.length).toBeGreaterThan(0);
      });
    });

    it('should have 9 zones total', () => {
      expect(zoneCoordinates).toHaveLength(9);
    });
  });

  describe('Zone Navigation', () => {
    it('should be able to navigate to next zone', () => {
      const nextIndex = getNextZoneIndex(0, zoneCoordinates.length);
      expect(nextIndex).toBe(1);
    });

    it('should wrap around to first zone from last', () => {
      const nextIndex = getNextZoneIndex(zoneCoordinates.length - 1, zoneCoordinates.length);
      expect(nextIndex).toBe(0);
    });

    it('should be able to navigate to previous zone', () => {
      const prevIndex = getPrevZoneIndex(1, zoneCoordinates.length);
      expect(prevIndex).toBe(0);
    });

    it('should wrap around to last zone from first', () => {
      const prevIndex = getPrevZoneIndex(0, zoneCoordinates.length);
      expect(prevIndex).toBe(zoneCoordinates.length - 1);
    });
  });

  describe('Zone Selection', () => {
    it('should find zone by ID', () => {
      const zone1 = findZoneById([...zoneCoordinates], 1);
      expect(zone1?.title).toBe("Production Suite");
      
      const zone8 = findZoneById([...zoneCoordinates], 8);
      expect(zone8?.title).toBe("Dynamic Space");
      
      const notFound = findZoneById([...zoneCoordinates], 999);
      expect(notFound).toBeUndefined();
    });

    it('should get zone index by ID', () => {
      expect(getZoneIndex([...zoneCoordinates], 1)).toBe(0);
      expect(getZoneIndex([...zoneCoordinates], 4)).toBe(1);
      expect(getZoneIndex([...zoneCoordinates], 999)).toBe(-1);
    });
  });

  describe('Coordinate Validation', () => {
    it('should validate coordinates within bounds', () => {
      expect(isValidCoordinate(0)).toBe(true);
      expect(isValidCoordinate(50)).toBe(true);
      expect(isValidCoordinate(100)).toBe(true);
    });

    it('should reject coordinates outside bounds', () => {
      expect(isValidCoordinate(-1)).toBe(false);
      expect(isValidCoordinate(101)).toBe(false);
    });
  });
});
