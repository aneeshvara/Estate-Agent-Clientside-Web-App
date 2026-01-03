import './styles/App.css';
import propertiesData from './data/properties.json';
import SearchForm from './components/SearchForm';

function App() {
  const allProperties = propertiesData.properties;

  return (
    <div className="app">
      <h1>Property Search</h1>
      <SearchForm properties={allProperties} />
    </div>
  );
}

export default App;
