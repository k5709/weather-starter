import "./App.css";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import TopButtons from "./components/topButtons";
import Inputs from "./components/inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./weather/weatherService";
import { useState, useEffect } from "react";

const App = () => {
  const [query, setQuery] = useState({ q: "Illinois" });
  const [units, setUnits] = useState("imperial");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  // const getWeather = async () => {
  //   const data = await getFormattedWeatherData({ ...query, units });
  //   setWeather(data);
  //   setLoading(false);
  //   console.log(data);
  // };

  // useEffect(() => {
  //   getWeather();
  // }, [query, units]);

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getFormattedWeatherData({ ...query, units });
      setWeather(data);
      setLoading(false);
      console.log("data received in WeatherDisplay", data);
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-600 to blue-700";
    const threshHold = units === "imperial" ? 60 : 80;
    if (weather.temp <= threshHold) return "from-cyan-600 to blue-700";
    return "from-yellow-600 to-orange-700";
  };

  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <TopButtons setQuery={setQuery} />
      <Inputs setUnits={setUnits} setQuery={setQuery} />

      {loading ? (
        <div>Loading...</div>
      ) : weather ? (
        <>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
          <Forecast title="Hourly Forecast" data={weather.hourly} />
          <Forecast title="Daily Forecast" data={weather.daily} />
          <div
            className="weather-overview"
            role="region"
            aria-labelledby="weather-overview-heading"
          >
            <h2 id="weather-overview-heading" className="sr-only">
              Weather Overview
            </h2>
            <p className="text-white font-medium">{weather.weather_overview}</p>
          </div>
        </>
      ) : (
        <div>No weather data available</div>
      )}
    </div>
  );
};

export default App;
