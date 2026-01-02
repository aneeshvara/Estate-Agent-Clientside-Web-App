import './styles/App.css'
import { useProperties } from './hooks/useProperties';
import SearchForm from './components/SearchForm';

function App() {
  // Use custom hook to load property data
  const { properties, loading, error } = useProperties();

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
      
      {/* Search Form */}
      <SearchForm />
      
      {/* Temporary list to confirm data flow */}
      <div>
        <h2>Property Titles ({properties.length} total)</h2>
        <ul>
          {properties.map((property) => (
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
