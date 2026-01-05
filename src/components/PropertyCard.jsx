import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/index.css';

function PropertyCard({ property }) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Load favorite status from localStorage on mount
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(property.id));
  }, [property.id]);

  // Toggle favorite status and update localStorage
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
            src={`/${property.picture}/${property.images[0]}`}
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
                src="/heart.svg" 
                alt="Favorite"
                className={isFavorite ? 'heart-icon favorited' : 'heart-icon'}
              />
            </button>
          </div>
          
          <div className="property-info">
            <span>{property.location}</span>
            <span>
              <img src="/bedroom.svg" alt="" className="info-icon" />
              {property.bedrooms} Bedrooms
            </span>
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
