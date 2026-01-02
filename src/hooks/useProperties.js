import { useState, useEffect } from 'react';
import propertiesData from '../data/properties.json';

/**
 * Custom hook to load and manage property data
 * 
 * This hook encapsulates the data access logic, separating concerns
 * and making it easier to modify the data source later (e.g., API fetch)
 * 
 * @returns {Object} - { properties: Array, loading: boolean, error: Error|null }
 */
export const useProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate async data loading to match future API integration pattern
    const loadProperties = () => {
      try {
        // Access the properties array from the JSON structure
        const data = propertiesData.properties;
        
        if (!data || !Array.isArray(data)) {
          throw new Error('Invalid data format');
        }
        
        setProperties(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    loadProperties();
  }, []); // Empty dependency array - load once on mount

  return { properties, loading, error };
};
