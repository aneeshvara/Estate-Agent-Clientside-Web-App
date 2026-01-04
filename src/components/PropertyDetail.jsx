import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import propertiesData from '../data/properties.json';
import '../styles/index.css';

function PropertyDetail() {
  const { id } = useParams();
  const property = propertiesData.properties.find(p => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

          <div className="detail-description">
            <h2>Description</h2>
            <p dangerouslySetInnerHTML={{ __html: property.description.replace(/<br>/g, '<br/><br/>') }}></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;
