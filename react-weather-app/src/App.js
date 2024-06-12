import "./App.css";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import TopButtons from "./components/topButtons";
import Inputs from "./components/inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./weather/weatherService";
import { useState, useEffect, useCallback } from "react";

const App = () => {
  const [query, setQuery] = useState({ q: "Illinois" });
  const [units, setUnits] = useState("imperial");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const getWeather = (async () => {
    const data = await getFormattedWeatherData({ ...query, units });
    setWeather(data);
    setLoading(false);
    console.log("data received in app.js", data);
  });

  useEffect(() => {
    getWeather();
  }, [query, units]);

  // getWeather();

  return (
    <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">
      <TopButtons setQuery={setQuery} />
      <Inputs setUnits={setUnits} />

      {loading ? (
        <div>Loading...</div>
      ) : weather ? ((
          <>
            <TimeAndLocation weather={weather} />
            <TemperatureAndDetails weather={weather} />
            <Forecast title="Hourly Forecast" data={weather.hourly} />
            <Forecast title="Daily Forecast" data={weather.daily} />
          </>
        )
      ) : (
        <div>No weather data available</div>
      )}
    </div>
  );
};

export default App;
