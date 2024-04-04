import "./currentWeather.css";
import React, { useState, useEffect } from "react";
function CurrentWeather({ data }) {
  const [C, setC] = useState(0);
  const [feelsLikeC, setFeelsLikeC] = useState(0);

  useEffect(() => {
    if (data && data.main && data.main.temp) {
      const celsiusTemp = Math.round(data.main.temp - 273.15);
      setC(celsiusTemp);
      const feelsLikeCelsius = Math.round(data.main.feels_like - 273.15);
      setFeelsLikeC(feelsLikeCelsius);
    }
  }, [data]);

  return (
    <div className="weather-container">
      <div className="top">
        <p className="city">{data.city}</p>
        <p className="weather-description">{data.weather[0].description}</p>
        <img
          alt="weather"
          className="weather-icon"
          src={`weather-icons/${data.weather[0].icon}.png`}
        />
      </div>
      <div className="bottom">
        <p className="temp">{C}°C</p>
        <div className="details">
          <div className="param-row">
            <span className="param-label">Details:</span>
          </div>
          <div className="param-row">
            <span className="param-label">Feels Like: </span>
            <span className="param-value">{feelsLikeC}°C</span>
          </div>
          <div className="param-row">
            <span className="param-label">Wind: </span>
            <span className="param-value">{data.wind.speed} m/s</span>
          </div>
          <div className="param-row">
            <span className="param-label">Humidity: </span>
            <span className="param-value">{data.main.humidity}%</span>
          </div>
          <div className="param-row">
            <span className="param-label">Pressure: </span>
            <span className="param-value">{data.main.pressure}hpa</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
