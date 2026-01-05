import { BrowserRouter, Routes, Route } from 'react-router-dom';
import propertiesData from './data/properties.json';
import SearchForm from './components/SearchForm';
import PropertyDetail from './components/PropertyDetail';

function App() {
  // Load all properties from JSON data
  const allProperties = propertiesData.properties;

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<SearchForm properties={allProperties} />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
