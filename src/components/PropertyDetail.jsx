import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import propertiesData from '../data/properties.json';
import '../styles/index.css';

function PropertyDetail() {
  const { id } = useParams();
  const property = propertiesData.properties.find(p => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  if (!property) {
    return <div>Property not found</div>;
  }

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="property-detail">
      <Link to="/" className="back-link">← Back to Search</Link>
      
      <div className="detail-content">
        <div className="detail-image-gallery">
          <div className="main-image">
            <img 
              src={`/src/assets/${property.picture}/${property.images[currentImageIndex]}`}
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
                  src={`/src/assets/${property.picture}/${image}`}
                  alt={`Thumbnail ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="detail-info">
          <h1 className="detail-price">£{property.price.toLocaleString()}</h1>
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
                  <p dangerouslySetInnerHTML={{ __html: property.description.replace(/<br>/g, '<br/><br/>') }}></p>
                </div>
              )}

              {activeTab === 'floorplan' && (
                <div className="tab-panel">
                  <img 
                    // src={`/src/assets/${property.picture}/${property.floorplan}`}
                    src={'/src/assets/floorplan.jpg'}
                    alt="Floor Plan"
                    className="floorplan-image"
                  />
                </div>
              )}

              {activeTab === 'map' && (
                <div className="tab-panel">
                  <a 
                    href={`https://www.google.com/maps/place/Regents+Quay,+6+Bowman+Ln,+Hunslet,+Leeds+LS10+1HF,+UK/@53.79327,-1.5359887,17z/data=!3m1!4b1!4m6!3m5!1s0x48795c17c0a94417:0x917b39ae2fbb583a!8m2!3d53.79327!4d-1.5359887!16s%2Fg%2F1v29bjm9?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img 
                      // src={`/src/assets/${property.picture}/${property.mapImage}`}
                      src={'/src/assets/map.jpg'}
                      alt="Location Map"
                      className="map-image"
                    />
                  </a>
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
