import { describe, it, expect } from 'vitest';
import type { Product, Zone } from '@shared/zones';

const mockZonesWithProducts: Pick<Zone, 'id' | 'title' | 'products'>[] = [
  {
    id: 1,
    title: "Production Suite",
    products: [
      { name: "Joyn 2", brand: "Vitra", url: "https://www.vitra.com/en-us/product/joyn-2", desc: "Adaptable office table system" },
      { name: ".04 Chair", brand: "Vitra", url: "https://www.vitra.com/en-us/product/04", desc: "Ergonomic comfort chair" },
      { name: "Dancing Wall", brand: "Vitra", url: "https://www.vitra.com/en-us/product/dancing-wall", desc: "Mobile partition" }
    ]
  },
  {
    id: 5,
    title: "Private Office",
    products: [
      { name: "Tyde 2", brand: "Vitra", url: "https://www.vitra.com/en-us/product/tyde-2", desc: "Height-adjustable desk" },
      { name: "Mynt", brand: "Vitra", url: "https://www.vitra.com/en-us/product/mynt", desc: "Ergonomic office chair" },
      { name: "Mikado Side Chair", brand: "Vitra", url: "https://www.vitra.com/en-us/product/mikado", desc: "Elegant side chair" }
    ]
  },
  {
    id: 7,
    title: "Resource Room",
    products: []
  }
];

function getProductsByZoneId(zones: Pick<Zone, 'id' | 'products'>[], zoneId: number): Product[] {
  const zone = zones.find(z => z.id === zoneId);
  return zone?.products || [];
}

describe('Product Domain', () => {
  describe('Product Data Integrity', () => {
    it('should have valid product URLs', () => {
      mockZonesWithProducts.forEach(zone => {
        zone.products.forEach(product => {
          expect(product.url).toMatch(/^https:\/\//);
        });
      });
    });

    it('should have non-empty product names', () => {
      mockZonesWithProducts.forEach(zone => {
        zone.products.forEach(product => {
          expect(product.name).toBeTruthy();
          expect(product.name.length).toBeGreaterThan(0);
        });
      });
    });

    it('should have Vitra as the brand for all products', () => {
      mockZonesWithProducts.forEach(zone => {
        zone.products.forEach(product => {
          expect(product.brand).toBe('Vitra');
        });
      });
    });

    it('should have descriptions for all products', () => {
      mockZonesWithProducts.forEach(zone => {
        zone.products.forEach(product => {
          expect(product.desc).toBeTruthy();
        });
      });
    });
  });

  describe('Zone-Product Association', () => {
    it('should get products by zone ID', () => {
      expect(getProductsByZoneId(mockZonesWithProducts, 1)).toHaveLength(3);
      expect(getProductsByZoneId(mockZonesWithProducts, 7)).toHaveLength(0);
      expect(getProductsByZoneId(mockZonesWithProducts, 999)).toHaveLength(0);
    });

    it('should identify zones with products', () => {
      const zonesWithProducts = mockZonesWithProducts.filter(z => z.products.length > 0);
      expect(zonesWithProducts).toHaveLength(2);
    });

    it('should identify zones without products', () => {
      const zonesWithoutProducts = mockZonesWithProducts.filter(z => z.products.length === 0);
      expect(zonesWithoutProducts).toHaveLength(1);
      expect(zonesWithoutProducts[0].title).toBe("Resource Room");
    });
  });

  describe('Product Hierarchy', () => {
    it('should maintain product order in Production Suite (Joyn 2 first)', () => {
      const productionSuite = mockZonesWithProducts.find(z => z.id === 1);
      expect(productionSuite?.products[0].name).toBe("Joyn 2");
    });

    it('should maintain product order in Private Office (Tyde 2 first)', () => {
      const privateOffice = mockZonesWithProducts.find(z => z.id === 5);
      expect(privateOffice?.products[0].name).toBe("Tyde 2");
      expect(privateOffice?.products[1].name).toBe("Mynt");
      expect(privateOffice?.products[2].name).toBe("Mikado Side Chair");
    });
  });
});
