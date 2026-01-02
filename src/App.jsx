import './styles/App.css'
import { useState, useEffect } from 'react';
import { useProperties } from './hooks/useProperties';
import SearchForm from './components/SearchForm';
import { filterProperties } from './utils/propertyFilters';

function App() {
  // Use custom hook to load property data
  const { properties, loading, error } = useProperties();
  
  // State to store filtered results
  const [filteredProperties, setFilteredProperties] = useState([]);
  
  // Initialize filtered properties when data loads
  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);
  
  /**
   * Handle search criteria changes from SearchForm
   * This callback is passed down to SearchForm and called whenever criteria change
   * 
   * @param {Object} criteria - Search criteria object from SearchForm
   */
  const handleSearch = (criteria) => {
    console.log('Search criteria received:', criteria);
    
    // Apply filter function (pure, no side effects)
    const results = filterProperties(properties, criteria);
    
    console.log(`Filtered from ${properties.length} to ${results.length} properties`);
    
    // Update state with filtered results
    setFilteredProperties(results);
  };

  // Handle loading state
  if (loading) {
    return <div>Loading properties...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error loading properties: {error.message}</div>;
  }

  return (
    <>
      <h1>Property Data Import Test</h1>
      
      {/* Search Form - pass handler as prop */}
      <SearchForm onSearch={handleSearch} />
      
      {/* Temporary list to confirm data flow */}
      <div>
        <h2>Property Titles</h2>
        <p>Showing {filteredProperties.length} of {properties.length} properties</p>
        <ul>
          {filteredProperties.map((property) => (
            <li key={property.id}>
              {property.type} - {property.location} - £{property.price.toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
