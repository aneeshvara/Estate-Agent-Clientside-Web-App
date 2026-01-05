import { describe, it, expect } from 'vitest';
import { filterProperties } from '../utils/filterProperties';

// Dummy data
const mockProperties = [
  {
    id: 'prop1',
    type: 'House',
    bedrooms: 3,
    price: 750000,
    location: 'Petts Wood Road, Petts Wood, Orpington BR5',
  },
  {
    id: 'prop2',
    type: 'Apartment',
    bedrooms: 2,
    price: 399995,
    location: 'Crofton Road Orpington BR6',
  },
  {
    id: 'prop3',
    type: 'Apartment',
    bedrooms: 1,
    price: 285000,
    location: 'High Street, Bromley BR1',
  },
  {
    id: 'prop4',
    type: 'House',
    bedrooms: 5,
    price: 1250000,
    location: 'Green Lane, Chislehurst BR7',
  },
];

describe('filterProperties', () => {
  it('should return all properties when no criteria is provided', () => {
    const criteria = {
      propertyType: '',
      priceRange: '',
      bedrooms: '',
      postcodeArea: '',
    };

    const result = filterProperties(mockProperties, criteria);

    expect(result).toHaveLength(4);
    expect(result).toEqual(mockProperties);
  });

  it('should filter properties by type (House only)', () => {
    const criteria = {
      propertyType: 'House',
      priceRange: '',
      bedrooms: '',
      postcodeArea: '',
    };

    const result = filterProperties(mockProperties, criteria);

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('prop1');
    expect(result[1].id).toBe('prop4');
    expect(result.every(p => p.type === 'House')).toBe(true);
  });

  it('should filter properties by price range (250000-500000)', () => {
    const criteria = {
      propertyType: '',
      priceRange: '250000-500000',
      bedrooms: '',
      postcodeArea: '',
    };

    const result = filterProperties(mockProperties, criteria);

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('prop2');
    expect(result[1].id).toBe('prop3');
    expect(result.every(p => p.price >= 250000 && p.price <= 500000)).toBe(true);
  });

  it('should filter properties by bedrooms (3 bedrooms exactly)', () => {
    const criteria = {
      propertyType: '',
      priceRange: '',
      bedrooms: '3',
      postcodeArea: '',
    };

    const result = filterProperties(mockProperties, criteria);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('prop1');
    expect(result[0].bedrooms).toBe(3);
  });

  it('should filter properties by postcode area (BR6)', () => {
    const criteria = {
      propertyType: '',
      priceRange: '',
      bedrooms: '',
      postcodeArea: 'BR6',
    };

    const result = filterProperties(mockProperties, criteria);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('prop2');
    expect(result[0].location).toContain('BR6');
  });

  it('should handle case-insensitive postcode search', () => {
    const criteria = {
      propertyType: '',
      priceRange: '',
      bedrooms: '',
      postcodeArea: 'br5',
    };

    const result = filterProperties(mockProperties, criteria);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('prop1');
  });

  it('should filter properties with multiple criteria (House, 3 bedrooms, price 500000-1000000)', () => {
    const criteria = {
      propertyType: 'House',
      priceRange: '500000-1000000',
      bedrooms: '3',
      postcodeArea: '',
    };

    const result = filterProperties(mockProperties, criteria);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('prop1');
    expect(result[0].type).toBe('House');
    expect(result[0].bedrooms).toBe(3);
    expect(result[0].price).toBeGreaterThanOrEqual(500000);
    expect(result[0].price).toBeLessThanOrEqual(1000000);
  });

  it('should filter properties above 1 million (1000000+)', () => {
    const criteria = {
      propertyType: '',
      priceRange: '1000000+',
      bedrooms: '',
      postcodeArea: '',
    };

    const result = filterProperties(mockProperties, criteria);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('prop4');
    expect(result[0].price).toBeGreaterThanOrEqual(1000000);
  });

  it('should filter properties with 5+ bedrooms', () => {
    const criteria = {
      propertyType: '',
      priceRange: '',
      bedrooms: '5',
      postcodeArea: '',
    };

    const result = filterProperties(mockProperties, criteria);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('prop4');
    expect(result[0].bedrooms).toBeGreaterThanOrEqual(5);
  });

  it('should return empty array when no properties match criteria', () => {
    const criteria = {
      propertyType: 'Apartment',
      priceRange: '1000000+',
      bedrooms: '',
      postcodeArea: '',
    };

    const result = filterProperties(mockProperties, criteria);

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });
});
