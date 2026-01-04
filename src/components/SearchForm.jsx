import { useState } from 'react';
import PropertyResults from './PropertyResults';
import '../styles/index.css';

function SearchForm({ properties }) {
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [postcodeArea, setPostcodeArea] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const searchCriteria = {
    propertyType,
    priceRange,
    bedrooms,
    postcodeArea,
    showFavoritesOnly
  };

  return (
    <>
      <div className="hero-section">
        <div className="hero-content">
          <h1>Find Your Dream Home</h1>
          <p>Search properties for sale and to rent in the UK</p>
        </div>
      </div>
      
      <div className="search-form">
        <div className="search-header">
            <h2>Search Properties</h2>
            <button 
              className={`favorites-toggle ${showFavoritesOnly ? 'active' : ''}`}
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            >
              {showFavoritesOnly ? 'Show All' : 'Favorites Only'}
            </button>
          </div>
          
          <div className="search-grid">
            <div className="form-group">
              <label>Property Type</label>
              <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                <option value="">All Types</option>
                <option value="House">House</option>
                <option value="Flat">Flat</option>
                <option value="Bungalow">Bungalow</option>
              </select>
            </div>

            <div className="form-group">
              <label>Price Range</label>
              <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                <option value="">Any Price</option>
                <option value="0-250000">Under £250,000</option>
                <option value="250000-500000">£250,000 - £500,000</option>
                <option value="500000-750000">£500,000 - £750,000</option>
                <option value="750000-1000000">£750,000 - £1,000,000</option>
                <option value="1000000+">Over £1,000,000</option>
              </select>
            </div>

            <div className="form-group">
              <label>Bedrooms</label>
              <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
                <option value="">Any</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5+</option>
              </select>
            </div>

            <div className="form-group">
              <label>Postcode Area</label>
              <input
                type="text"
                placeholder="e.g., BR5, BR6"
                value={postcodeArea}
                onChange={(e) => setPostcodeArea(e.target.value)}
              />
            </div>
          </div>
        </div>

      {/* Pass properties and search criteria to PropertyResults */}
      <PropertyResults properties={properties} criteria={searchCriteria} />
    </>
  );
}

export default SearchForm;
