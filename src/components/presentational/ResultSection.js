import React from "react";

const ResultSection = ({ weather }) => {
  return (
    <div className="result-section__container">
      {weather.error !== '' ? <p className="error"> {weather.error} </p> :
        <React.Fragment>
          <img id="icon" src={'http://openweathermap.org/img/wn/' + weather.icon + '@2x.png'} alt='' />
          <div className="weather-data__container">
            <p>Влажность: {weather.humidity}</p>
            <p>Давление: {weather.pressure}</p>
            <p>Температура: {weather.temp}</p>
            <p>Скорость ветра: {weather.wind_speed}</p>
          </div>
        </React.Fragment>
      }
    </div>
  )
}

export default ResultSection;