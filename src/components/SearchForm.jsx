import { useState } from 'react';
import PropertyResults from './PropertyResults';
import { TextField, Select, MenuItem, FormControl, InputLabel, Slider, Box, Typography } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import '../styles/index.css';

function SearchForm({ properties }) {
  // Search filter states
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1500000]); // Slider uses array [min, max]
  const [bedrooms, setBedrooms] = useState('');
  const [postcodeArea, setPostcodeArea] = useState('');
  const [dateAdded, setDateAdded] = useState(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Convert slider values to price range string for filtering
  const getPriceRangeString = () => {
    if (priceRange[0] === 0 && priceRange[1] === 1500000) return '';
    if (priceRange[1] === 1500000) return `${priceRange[0]}+`;
    return `${priceRange[0]}-${priceRange[1]}`;
  };

  // Combine all search criteria
  const searchCriteria = {
    propertyType,
    priceRange: getPriceRangeString(),
    bedrooms,
    postcodeArea,
    dateAdded: dateAdded ? dayjs(dateAdded).format('YYYY-MM-DD') : null,
    showFavoritesOnly
  };

  // Common styles for MUI inputs to ensure consistency
  const commonInputStyles = {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#e63946',
      },
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#e63946',
    },
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
              <FormControl fullWidth size="small" sx={commonInputStyles}>
                <InputLabel>Property Type</InputLabel>
                <Select 
                  value={propertyType} 
                  onChange={(e) => setPropertyType(e.target.value)}
                  label="Property Type"
                >
                  <MenuItem value="">All Types</MenuItem>
                  <MenuItem value="House">House</MenuItem>
                  <MenuItem value="Flat">Flat</MenuItem>
                  <MenuItem value="Bungalow">Bungalow</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="form-group">
              <FormControl fullWidth size="small" sx={commonInputStyles}>
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
                  sx={commonInputStyles}
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
                sx={commonInputStyles}
              />
            </div>
          </div>

          <div className="search-grid-row-2">
            <div className="form-group form-group-slider">
              <Typography gutterBottom sx={{ fontSize: '0.875rem', color: '#666', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
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
                sx={{ 
                  color: '#e63946',
                  '& .MuiSlider-thumb': {
                    '&:hover, &.Mui-focusVisible': {
                      boxShadow: '0 0 0 8px rgba(230, 57, 70, 0.16)',
                    },
                  },
                }}
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
