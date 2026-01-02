/**
 * Pure function to filter properties based on search criteria
 * 
 * PURE FUNCTION PRINCIPLES:
 * - No side effects (doesn't modify input arrays or external state)
 * - Deterministic (same inputs always produce same output)
 * - No external dependencies beyond inputs
 * 
 * @param {Array} properties - Array of property objects to filter
 * @param {Object} criteria - Search criteria object with the following optional fields:
 *   - propertyType: string (e.g., "House", "Flat", "Bungalow")
 *   - minPrice: number
 *   - maxPrice: number
 *   - minBedrooms: number
 *   - maxBedrooms: number
 *   - dateAdded: string (ISO date format YYYY-MM-DD)
 *   - postcodeArea: string (partial postcode to match)
 * 
 * @returns {Array} - Filtered array of properties (new array, original unchanged)
 */
export const filterProperties = (properties, criteria) => {
  // Guard clause: if no properties, return empty array
  if (!properties || !Array.isArray(properties)) {
    return [];
  }

  // Guard clause: if no criteria, return all properties
  if (!criteria || typeof criteria !== 'object') {
    return properties;
  }

  // Use Array.filter() to create a new array (maintains purity)
  return properties.filter(property => {
    // ALL criteria must pass (AND logic)
    // Each check returns true if criterion is empty OR if it matches

    // 1. Property Type Filter
    const typeMatch = !criteria.propertyType || 
                      criteria.propertyType === '' || 
                      property.type === criteria.propertyType;

    // 2. Price Range Filter
    const priceMatch = (
      (!criteria.minPrice || property.price >= criteria.minPrice) &&
      (!criteria.maxPrice || property.price <= criteria.maxPrice)
    );

    // 3. Bedroom Range Filter
    const bedroomMatch = (
      (!criteria.minBedrooms || property.bedrooms >= criteria.minBedrooms) &&
      (!criteria.maxBedrooms || property.bedrooms <= criteria.maxBedrooms)
    );

    // 4. Date Added Filter
    // Property must be added on or after the specified date
    const dateMatch = !criteria.dateAdded || 
                      criteria.dateAdded === '' ||
                      isPropertyAddedAfter(property.added, criteria.dateAdded);

    // 5. Postcode Area Filter
    // Case-insensitive partial match in location string
    const postcodeMatch = !criteria.postcodeArea || 
                          criteria.postcodeArea === '' ||
                          property.location
                            .toLowerCase()
                            .includes(criteria.postcodeArea.toLowerCase());

    // Return true only if ALL criteria match (AND combination)
    return typeMatch && priceMatch && bedroomMatch && dateMatch && postcodeMatch;
  });
};

/**
 * Helper function to compare property added date with search criteria date
 * 
 * @param {Object} propertyDate - Object with month, day, year properties
 * @param {string} criteriaDate - ISO date string (YYYY-MM-DD)
 * @returns {boolean} - True if property was added on or after the criteria date
 */
const isPropertyAddedAfter = (propertyDate, criteriaDate) => {
  if (!propertyDate || !criteriaDate) {
    return true;
  }

  // Convert property date to comparable format
  const monthMap = {
    'January': 0, 'February': 1, 'March': 2, 'April': 3,
    'May': 4, 'June': 5, 'July': 6, 'August': 7,
    'September': 8, 'October': 9, 'November': 10, 'December': 11
  };

  const propertyDateObj = new Date(
    propertyDate.year,
    monthMap[propertyDate.month],
    propertyDate.day
  );

  const criteriaDateObj = new Date(criteriaDate);

  // Property date must be >= criteria date
  return propertyDateObj >= criteriaDateObj;
};

/**
 * Example usage and test cases:
 * 
 * const properties = [
 *   { id: 1, type: "House", price: 500000, bedrooms: 3, ... },
 *   { id: 2, type: "Flat", price: 300000, bedrooms: 2, ... }
 * ];
 * 
 * // Filter by type only
 * const houses = filterProperties(properties, { propertyType: "House" });
 * 
 * // Filter by multiple criteria
 * const filtered = filterProperties(properties, {
 *   propertyType: "Flat",
 *   minPrice: 200000,
 *   maxPrice: 400000,
 *   minBedrooms: 2,
 *   maxBedrooms: 3
 * });
 * 
 * // Empty criteria returns all
 * const all = filterProperties(properties, {});
 */
