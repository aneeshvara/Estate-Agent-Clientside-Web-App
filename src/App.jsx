import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import propertiesData from './data/properties.json';
import SearchForm from './components/SearchForm';
import PropertyDetail from './components/PropertyDetail';

function App() {
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
