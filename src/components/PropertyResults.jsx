import PropertyCard from './PropertyCard';
import { filterProperties } from '../functions/filterProperties';
import { getFavorites } from '../functions/favorites';
import '../styles/index.css';

function PropertyResults({ properties, criteria }) {
  let filteredProperties = filterProperties(properties, criteria);

  if (criteria.showFavoritesOnly) {
    const favorites = getFavorites();
    filteredProperties = filteredProperties.filter(property => favorites.includes(property.id));
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
