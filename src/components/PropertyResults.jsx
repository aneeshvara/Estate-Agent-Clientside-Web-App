import PropertyCard from './PropertyCard';
import '../styles/index.css';

function PropertyResults({ properties, criteria }) {
  // Filter properties based on search criteria passed from SearchForm
  const filteredProperties = properties.filter(property => {
    // Check property type
    if (criteria.propertyType && property.type !== criteria.propertyType) {
      return false;
    }
    
    // Check price range
    if (property.price < criteria.minPrice || property.price > criteria.maxPrice) {
      return false;
    }
    
    // Check bedroom range
    if (property.bedrooms < criteria.minBedrooms || property.bedrooms > criteria.maxBedrooms) {
      return false;
    }
    
    // Check postcode area
    if (criteria.postcodeArea && !property.location.toLowerCase().includes(criteria.postcodeArea.toLowerCase())) {
      return false;
    }
    
    return true;
  });

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
