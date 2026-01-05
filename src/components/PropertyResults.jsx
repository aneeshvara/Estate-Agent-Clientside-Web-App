import PropertyCard from './PropertyCard';
import '../styles/index.css';

function PropertyResults({ properties, criteria }) {

  // Filtering properties
  let filteredProperties = properties.filter(property => {

    // Type
    if (criteria.propertyType && property.type !== criteria.propertyType) {
      return false;
    }
    
    // Price
    if (criteria.priceRange) {
      if (criteria.priceRange === '1000000+') {
        if (property.price < 1000000) return false;
      } else {
        const [min, max] = criteria.priceRange.split('-').map(Number);
        if (property.price < min || property.price > max) return false;
      }
    }
    
    // Bedrooms
    if (criteria.bedrooms) {
      const bedroomValue = criteria.bedrooms;
      if (bedroomValue === '5') {
        if (property.bedrooms < 5) return false;
      } else {
        if (property.bedrooms !== parseInt(bedroomValue)) return false;
      }
    }
    
    // Postal Code
    if (criteria.postcodeArea && !property.location.toLowerCase().includes(criteria.postcodeArea.toLowerCase())) {
      return false;
    }
    
    // Date Added
    if (criteria.dateAdded) {
      const propertyDate = new Date(property.added.year, getMonthIndex(property.added.month), property.added.day);
      const filterDate = new Date(criteria.dateAdded);
      if (propertyDate < filterDate) return false;
    }
    
    return true;
  });

  // Helper function to convert month name to index
  function getMonthIndex(monthName) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return months.indexOf(monthName);
  }

  if (criteria.showFavoritesOnly) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    filteredProperties = filteredProperties.filter(property => 
      favorites.includes(property.id)
    );
  }

  return (
    <div className="property-results">
      <div className="results-header">
        <h2>Property Listings</h2>
        <p>Showing {filteredProperties.length} of {properties.length} properties</p>
      </div>

      {filteredProperties.length === 0 ? (
        <div className="no-results">
          <h3>No properties found</h3>
          <p>Try adjusting your search criteria.</p>
        </div>
      ) : (
        <div className="property-grid">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PropertyResults;
