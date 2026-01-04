import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/index.css';

function PropertyCard({ property }) {
  const shortDescription = property.description.substring(0, 150).replace(/<[^>]*>/g, '');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(property.id));
  }, [property.id]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (favorites.includes(property.id)) {
      const updated = favorites.filter(id => id !== property.id);
      localStorage.setItem('favorites', JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      favorites.push(property.id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

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
          <div className="details-header">
            <h3 className="property-price">£{property.price.toLocaleString()}</h3>
            <button 
              className="favorite-button"
              onClick={toggleFavorite}
            >
              <img 
                src="/src/assets/heart.svg" 
                alt="Favorite"
                className={isFavorite ? 'heart-icon favorited' : 'heart-icon'}
              />
            </button>
          </div>
          <p className="property-location">📍 {property.location} </p>
          
          <div className="property-info">
            <span>🛏️ {property.bedrooms} Bedrooms</span>
            <span>📄 {property.tenure}</span>
          </div>
                    
          <p className="property-date">
            Added: {property.added.month} {property.added.day}, {property.added.year}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default PropertyCard;
