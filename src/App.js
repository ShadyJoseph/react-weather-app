import "./App.css";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/currentWeather";
import Forecast from "./components/forecast/forecast";
import { useState } from "react";
import Loader from "./components/loader/Loader"; // Import the Loader component

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Add state for loading indicator

  const handleOnSearchChange = (searchData) => {
    setIsLoading(true); // Set loading state to true when fetching data
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e854073d29420bbfb65ca09a51492a4e`
    );
    const currentWeatherForecast = fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e854073d29420bbfb65ca09a51492a4e`
    );

    Promise.all([currentWeatherFetch, currentWeatherForecast])
      .then(async (responses) => {
        const weatherResponse = await responses[0].json();
        const forecastResponse = await responses[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
        setIsLoading(false); // Set loading state to false when data is fetched
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false); // Set loading state to false in case of error
      });
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {/* Conditional rendering of loader */}
      {isLoading && <Loader />}
      {/* Conditional rendering of CurrentWeather component */}
      {!isLoading && currentWeather && <CurrentWeather data={currentWeather} />}
      {/* Conditional rendering of Forecast component */}
      {!isLoading && forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
