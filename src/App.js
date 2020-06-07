import React from "react";
import Autocomplete from './components/containers/Autocomplete';
import dataService from './services/getDataService';
import ResultSection from "./components/presentational/ResultSection";
import './App.css';

const App = () => {
  const [weather, setWeather] = React.useState({});
  const getDataFromServer = (value) => {
    dataService.getData(value).then(data => setWeather(data));
  }
  return (
    <div className="main-container">
        <Autocomplete onSubmit={getDataFromServer} />    
        <div className="result-section" >
          {JSON.stringify(weather) !== '{}' && <ResultSection weather={weather} />}
        </div>
    </div>

  )
}

export default App;
