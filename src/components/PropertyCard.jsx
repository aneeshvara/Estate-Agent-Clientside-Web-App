import { Link } from 'react-router-dom';
import '../styles/index.css';

function PropertyCard({ property }) {
  const shortDescription = property.description.substring(0, 150).replace(/<[^>]*>/g, '');

  return (
    <Link to={`/property/${property.id}`} className="property-card-link">
      <div className="property-card">
        <div className="property-image">
          <img 
            src={`/src/assets/${property.picture}/${property.images[0]}`}
            alt={property.type}
          />
          <span className="property-type-badge">{property.type}</span>
        </div>
        
        <div className="property-details">
          <h3 className="property-price">£{property.price.toLocaleString()}</h3>
          <p className="property-location">📍 {property.location}</p>
          
          <div className="property-info">
            <span>🛏️ {property.bedrooms} Bedrooms</span>
            <span>📄 {property.tenure}</span>
          </div>
          
          <p className="property-description">{shortDescription}...</p>
          
          <p className="property-date">
            Added: {property.added.month} {property.added.day}, {property.added.year}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default PropertyCard;
