import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { isFavorite as checkFavorite, toggleFavorite as toggleFav } from '../functions/favorites';
import propertiesData from '../data/properties.json';
import '../styles/index.css';

function PropertyDetail() {
  const { id } = useParams();
  const property = propertiesData.properties.find(p => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [isFavorite, setIsFavorite] = useState(false);

  // Load favorite status from localStorage
  useEffect(() => {
    setIsFavorite(checkFavorite(id));
  }, [id]);

  if (!property) {
    return <div>Property not found</div>;
  }

  // Switch to selected image in gallery
  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleToggleFavorite = () => {
    toggleFav(id);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="property-detail">
      <Link to="/" className="back-link">← Back to Search</Link>
      
      <div className="detail-content">
        <div className="detail-header">
          <h1 className="detail-price">£{property.price.toLocaleString()}</h1>
          <button className="favorite-button-detail" onClick={handleToggleFavorite}>
            <img 
              src="/heart.svg" 
              alt="Favorite"
              className={isFavorite ? 'heart-icon favorited' : 'heart-icon'}
            />
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
        
        <div className="detail-image-gallery">
          <div className="main-image">
            <img 
              src={`/${property.picture}/${property.images[currentImageIndex]}`}
              alt={property.type}
            />
            <span className="detail-badge">{property.type}</span>
          </div>
          
          <div className="thumbnail-strip">
            {property.images.map((image, index) => (
              <div
                key={index}
                className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => handleThumbnailClick(index)}
              >
                <img 
                  src={`/${property.picture}/${image}`}
                  alt={`Thumbnail ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="detail-info">
          <p className="detail-location">📍 {property.location}</p>

          <div className="detail-features">
            <div className="feature">
              <strong>Bedrooms:</strong> {property.bedrooms}
            </div>
            <div className="feature">
              <strong>Tenure:</strong> {property.tenure}
            </div>
            <div className="feature">
              <strong>Added:</strong> {property.added.month} {property.added.day}, {property.added.year}
            </div>
          </div>

          <div className="tabs-container">
            <div className="tabs-header">
              <button 
                className={activeTab === 'description' ? 'tab-button active' : 'tab-button'}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button 
                className={activeTab === 'floorplan' ? 'tab-button active' : 'tab-button'}
                onClick={() => setActiveTab('floorplan')}
              >
                Floor Plan
              </button>
              <button 
                className={activeTab === 'map' ? 'tab-button active' : 'tab-button'}
                onClick={() => setActiveTab('map')}
              >
                Map
              </button>
            </div>

            <div className="tabs-content">
              {activeTab === 'description' && (
                <div className="tab-panel">
                  {property.description.split('<br>').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              )}

              {activeTab === 'floorplan' && (
                <div className="tab-panel">
                  <img 
                    // src={`/${property.picture}/${property.floorplan}`}
                    src={'/floorplan.jpg'}
                    alt="Floor Plan"
                    className="floorplan-image"
                  />
                </div>
              )}

              {activeTab === 'map' && (
                <div className="tab-panel">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2485.7447363707985!2d-1.5381637!3d53.79327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48795c17c0a94417%3A0x917b39ae2fbb583a!2sRegents%20Quay%2C%206%20Bowman%20Ln%2C%20Hunslet%2C%20Leeds%20LS10%201HF%2C%20UK!5e0!3m2!1sen!2suk!4v1234567890"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;
