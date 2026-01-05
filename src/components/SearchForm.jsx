import { useState } from 'react';
import PropertyResults from './PropertyResults';
import { TextField, Select, MenuItem, FormControl, InputLabel, Slider, Typography } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import '../styles/index.css';

function SearchForm({ properties }) {

  // Search filter states
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1500000]);
  const [bedrooms, setBedrooms] = useState('');
  const [postcodeArea, setPostcodeArea] = useState('');
  const [dateAdded, setDateAdded] = useState(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Combine all search criteria
  const searchCriteria = {
    propertyType,
    priceRange,
    bedrooms,
    postcodeArea,
    dateAdded: dateAdded ? dayjs(dateAdded).format('YYYY-MM-DD') : null,
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
          
          <div className="search-grid-row-1">
            <div className="form-group">
              <FormControl fullWidth size="small">
                <InputLabel>Property Type</InputLabel>
                <Select 
                  value={propertyType} 
                  onChange={(e) => setPropertyType(e.target.value)}
                  label="Property Type"
                >
                  <MenuItem value="">All Types</MenuItem>
                  <MenuItem value="House">House</MenuItem>
                  <MenuItem value="Apartment">Apartment</MenuItem>
                  <MenuItem value="Condo">Condo</MenuItem>
                  <MenuItem value="Bungalow">Bungalow</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="form-group">
              <FormControl fullWidth size="small">
                <InputLabel>Bedrooms</InputLabel>
                <Select 
                  value={bedrooms} 
                  onChange={(e) => setBedrooms(e.target.value)}
                  label="Bedrooms"
                >
                  <MenuItem value="">Any</MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5+</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="form-group">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date Added (After)"
                  value={dateAdded}
                  onChange={(newValue) => setDateAdded(newValue)}
                  slotProps={{ 
                    textField: { 
                      size: 'small', 
                      fullWidth: true,
                      placeholder: 'Filter by date'
                    } 
                  }}
                />
              </LocalizationProvider>
            </div>

            <div className="form-group">
              <TextField
                label="Postcode Area"
                value={postcodeArea}
                onChange={(e) => setPostcodeArea(e.target.value)}
                size="small"
                fullWidth
              />
            </div>
          </div>

          <div className="search-grid-row-2">
            <div className="form-group form-group-slider">
              <Typography gutterBottom className="slider-label">
                Price Range: £{priceRange[0].toLocaleString()} - £{priceRange[1].toLocaleString()}
              </Typography>
              <Slider
                value={priceRange}
                onChange={(e, newValue) => setPriceRange(newValue)}
                min={0}
                max={1500000}
                step={50000}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `£${value.toLocaleString()}`}
              />
            </div>
          </div>
        </div>

      <PropertyResults properties={properties} criteria={searchCriteria} />
    </>
  );
}

export default SearchForm;
