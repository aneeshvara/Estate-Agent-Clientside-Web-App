import { describe, it, expect, beforeEach } from 'vitest';
import {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
  toggleFavorite,
} from '../utils/favorites';

describe('Favorites Logic', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should return empty array when no favorites exist', () => {
    const favorites = getFavorites();

    expect(favorites).toEqual([]);
    expect(favorites).toHaveLength(0);
  });

  it('should add a property to favorites', () => {
    const propertyId = 'prop1';

    const favorites = addToFavorites(propertyId);

    expect(favorites).toContain(propertyId);
    expect(favorites).toHaveLength(1);
    expect(localStorage.getItem('favorites')).toBe('["prop1"]');
  });

  it('should not add duplicate property to favorites', () => {
    const propertyId = 'prop1';

    addToFavorites(propertyId);
    const favorites = addToFavorites(propertyId);

    expect(favorites).toHaveLength(1);
    expect(favorites).toEqual(['prop1']);
  });

  it('should add multiple properties to favorites', () => {
    addToFavorites('prop1');
    addToFavorites('prop2');
    const favorites = addToFavorites('prop3');

    expect(favorites).toHaveLength(3);
    expect(favorites).toEqual(['prop1', 'prop2', 'prop3']);
  });

  it('should remove a property from favorites', () => {
    addToFavorites('prop1');
    addToFavorites('prop2');
    addToFavorites('prop3');

    const favorites = removeFromFavorites('prop2');

    expect(favorites).toHaveLength(2);
    expect(favorites).toEqual(['prop1', 'prop3']);
    expect(favorites).not.toContain('prop2');
  });

  it('should check if property is favorited (true case)', () => {
    addToFavorites('prop1');

    const result = isFavorite('prop1');

    expect(result).toBe(true);
  });

  it('should check if property is favorited (false case)', () => {
    addToFavorites('prop1');

    const result = isFavorite('prop2');

    expect(result).toBe(false);
  });

  it('should toggle favorite - add when not favorited', () => {
    const propertyId = 'prop1';

    const favorites = toggleFavorite(propertyId);

    expect(favorites).toContain(propertyId);
    expect(favorites).toHaveLength(1);
  });

  it('should toggle favorite - remove when already favorited', () => {
    const propertyId = 'prop1';
    addToFavorites(propertyId);

    const favorites = toggleFavorite(propertyId);

    expect(favorites).not.toContain(propertyId);
    expect(favorites).toHaveLength(0);
  });

  it('should toggle favorite multiple times', () => {
    const propertyId = 'prop1';

    // Add
    let favorites = toggleFavorite(propertyId);
    expect(favorites).toContain(propertyId);

    // Remove
    favorites = toggleFavorite(propertyId);
    expect(favorites).not.toContain(propertyId);

    // Add again
    favorites = toggleFavorite(propertyId);
    expect(favorites).toContain(propertyId);
  });

  it('should persist favorites in localStorage', () => {
    addToFavorites('prop1');
    addToFavorites('prop2');

    const storedData = localStorage.getItem('favorites');
    const parsedData = JSON.parse(storedData);

    expect(parsedData).toEqual(['prop1', 'prop2']);
  });

  it('should handle removing non-existent property gracefully', () => {
    addToFavorites('prop1');

    const favorites = removeFromFavorites('prop99');

    expect(favorites).toEqual(['prop1']);
    expect(favorites).toHaveLength(1);
  });
});
