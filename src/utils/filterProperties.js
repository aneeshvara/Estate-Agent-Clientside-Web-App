// Filter properties based on search criteria
export function filterProperties(properties, criteria) {
  return properties.filter(property => {
    // Check property type
    if (criteria.propertyType && property.type !== criteria.propertyType) {
      return false;
    }
    
    // Check price range
    if (criteria.priceRange) {
      if (criteria.priceRange === '1000000+') {
        if (property.price < 1000000) return false;
      } else {
        const [min, max] = criteria.priceRange.split('-').map(Number);
        if (property.price < min || property.price > max) return false;
      }
    }
    
    // Check bedrooms
    if (criteria.bedrooms) {
      const bedroomValue = criteria.bedrooms;
      if (bedroomValue === '5') {
        // 5+ bedrooms
        if (property.bedrooms < 5) return false;
      } else {
        if (property.bedrooms !== parseInt(bedroomValue)) return false;
      }
    }
    
    // Check postcode area
    if (criteria.postcodeArea && !property.location.toLowerCase().includes(criteria.postcodeArea.toLowerCase())) {
      return false;
    }
    
    return true;
  });
}
