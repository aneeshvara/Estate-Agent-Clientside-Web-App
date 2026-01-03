import { useParams, Link } from 'react-router-dom';
import propertiesData from '../data/properties.json';
import '../styles/index.css';

function PropertyDetail() {
  const { id } = useParams();
  const property = propertiesData.properties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="property-detail">
        <h2>Property not found</h2>
        <Link to="/">Back to Search</Link>
      </div>
    );
  }

  return (
    <div className="property-detail">
      <Link to="/" className="back-link">← Back to Search</Link>
      
      <div className="detail-content">
        <div className="detail-image">
          <img 
            src={`/${property.picture}`} 
            alt={property.type}
            onError={(e) => e.target.src = 'https://via.placeholder.com/600x400?text=Property'}
          />
          <span className="detail-badge">{property.type}</span>
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
