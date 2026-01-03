import '../styles/index.css';

function PropertyCard({ property }) {
  // Clean description: remove HTML tags and truncate
  const shortDescription = property.description.substring(0, 150).replace(/<[^>]*>/g, '');

  return (
    <div className="property-card">
      <div className="property-image">
        <img 
          src={property.picture} 
          alt={property.type}
          onError={(e) => e.target.src = 'https://via.placeholder.com/300x200?text=Property'}
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
  );
}

export default PropertyCard;
