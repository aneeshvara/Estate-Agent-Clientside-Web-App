// Filter properties based on search criteria
export function filterProperties(properties, criteria) {
  return properties.filter(property => {
    
    // Check property type
    if (criteria.propertyType && property.type !== criteria.propertyType) {
      return false;
    }
    
    // Check price range
    if (criteria.priceRange && Array.isArray(criteria.priceRange)) {
      const [min, max] = criteria.priceRange;
      if (property.price < min || property.price > max) return false;
    }
    
    // Check bedrooms
    if (criteria.bedrooms) {
      const bedroomValue = criteria.bedrooms;
      if (bedroomValue === '5') {
        if (property.bedrooms < 5) return false;
      } else {
        if (property.bedrooms !== parseInt(bedroomValue)) return false;
      }
    }
    
    // Check Postal Code
    if (criteria.postcodeArea && !property.location.toLowerCase().includes(criteria.postcodeArea.toLowerCase())) {
      return false;
    }
    
    // Check Date Added
    if (criteria.dateAdded) {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                     'July', 'August', 'September', 'October', 'November', 'December'];
      const propertyDate = new Date(property.added.year, months.indexOf(property.added.month), property.added.day);
      const filterDate = new Date(criteria.dateAdded);
      if (propertyDate < filterDate) return false;
    }
    
    return true;
  });
}
