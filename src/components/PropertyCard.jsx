import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isFavorite as checkFavorite, toggleFavorite as toggleFav } from '../functions/favorites';
import '../styles/index.css';

function PropertyCard({ property }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(checkFavorite(property.id));
  }, [property.id]);

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    toggleFav(property.id);
    setIsFavorite(!isFavorite);
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
              onClick={handleToggleFavorite}
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
