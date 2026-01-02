import '../styles/index.css'
import { useState } from 'react'

/**
 * SearchForm Component - Controlled form for property search
 * All inputs are controlled by React state for predictable data flow
 */
function SearchForm() {
  // Controlled state for each form input
  const [propertyType, setPropertyType] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [minBedrooms, setMinBedrooms] = useState(1);
  const [maxBedrooms, setMaxBedrooms] = useState(5);
  const [dateAdded, setDateAdded] = useState('');
  const [postcodeArea, setPostcodeArea] = useState('');

  return (
    <div className="search-form">
      <h2>Search Properties</h2>
      
      <form>
        {/* Property Type - Dropdown for predefined options */}
        <div className="form-group">
          <label htmlFor="property-type">Property Type:</label>
          <select
            id="property-type"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            aria-label="Select property type"
          >
            <option value="">All Types</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
            <option value="Bungalow">Bungalow</option>
          </select>
        </div>

        {/* Price Range - Range sliders for intuitive selection */}
        <div className="form-group">
          <label htmlFor="min-price">
            Price Range: £{minPrice.toLocaleString()} - £{maxPrice.toLocaleString()}
          </label>
          <div className="range-inputs">
            <div>
              <label htmlFor="min-price">Min:</label>
              <input
                type="range"
                id="min-price"
                min="0"
                max="1000000"
                step="50000"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                aria-label="Minimum price"
              />
            </div>
            <div>
              <label htmlFor="max-price">Max:</label>
              <input
                type="range"
                id="max-price"
                min="0"
                max="1000000"
                step="50000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                aria-label="Maximum price"
              />
            </div>
          </div>
        </div>

        {/* Bedroom Range - Number inputs with constraints */}
        <div className="form-group">
          <label>Bedrooms:</label>
          <div className="number-inputs">
            <div>
              <label htmlFor="min-bedrooms">Min:</label>
              <input
                type="number"
                id="min-bedrooms"
                min="1"
                max="10"
                value={minBedrooms}
                onChange={(e) => setMinBedrooms(Number(e.target.value))}
                aria-label="Minimum bedrooms"
              />
            </div>
            <div>
              <label htmlFor="max-bedrooms">Max:</label>
              <input
                type="number"
                id="max-bedrooms"
                min="1"
                max="10"
                value={maxBedrooms}
                onChange={(e) => setMaxBedrooms(Number(e.target.value))}
                aria-label="Maximum bedrooms"
              />
            </div>
          </div>
        </div>

        {/* Date Added - Date picker for calendar selection */}
        <div className="form-group">
          <label htmlFor="date-added">Added After:</label>
          <input
            type="date"
            id="date-added"
            value={dateAdded}
            onChange={(e) => setDateAdded(e.target.value)}
            aria-label="Properties added after this date"
          />
        </div>

        {/* Postcode Area - Text input for flexible search */}
        <div className="form-group">
          <label htmlFor="postcode">Postcode Area:</label>
          <input
            type="text"
            id="postcode"
            placeholder="e.g., BR5, BR6"
            value={postcodeArea}
            onChange={(e) => setPostcodeArea(e.target.value.toUpperCase())}
            aria-label="Enter postcode area"
          />
        </div>

        {/* Debug: Show current form state */}
        <div style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0' }}>
          <h4>Current Search Criteria:</h4>
          <pre>{JSON.stringify({
            propertyType,
            priceRange: `£${minPrice.toLocaleString()} - £${maxPrice.toLocaleString()}`,
            bedrooms: `${minBedrooms} - ${maxBedrooms}`,
            dateAdded,
            postcodeArea
          }, null, 2)}</pre>
        </div>
      </form>
    </div>
  )
}

export default SearchForm
