import { useState } from 'react';
import PropertyResults from './PropertyResults';
import '../styles/index.css';

function SearchForm({ properties }) {
  // Form input states
  const [propertyType, setPropertyType] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [minBedrooms, setMinBedrooms] = useState(1);
  const [maxBedrooms, setMaxBedrooms] = useState(5);
  const [postcodeArea, setPostcodeArea] = useState('');

  // Build search criteria object to pass to PropertyResults
  const searchCriteria = {
    propertyType,
    minPrice,
    maxPrice,
    minBedrooms,
    maxBedrooms,
    postcodeArea
  };

  return (
    <>
      <div className="search-form">
        <h2>Search Properties</h2>
        
        <div className="form-group">
          <label>Property Type:</label>
          <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
            <option value="">All Types</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
            <option value="Bungalow">Bungalow</option>
          </select>
        </div>

        <div className="form-group">
          <label>Price Range: £{minPrice.toLocaleString()} - £{maxPrice.toLocaleString()}</label>
          <div className="range-inputs">
            <div>
              <label>Min: </label>
              <input
                type="range"
                min="0"
                max="1000000"
                step="50000"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Max: </label>
              <input
                type="range"
                min="0"
                max="1000000"
                step="50000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Bedrooms:</label>
          <div className="number-inputs">
            <div>
              <label>Min: </label>
              <input
                type="number"
                min="1"
                max="10"
                value={minBedrooms}
                onChange={(e) => setMinBedrooms(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Max: </label>
              <input
                type="number"
                min="1"
                max="10"
                value={maxBedrooms}
                onChange={(e) => setMaxBedrooms(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Postcode Area:</label>
          <input
            type="text"
            placeholder="e.g., BR5, BR6"
            value={postcodeArea}
            onChange={(e) => setPostcodeArea(e.target.value)}
          />
        </div>
      </div>

      {/* Pass properties and search criteria to PropertyResults */}
      <PropertyResults properties={properties} criteria={searchCriteria} />
    </>
  );
}

export default SearchForm;
