import "./App.css";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import TopButtons from "./components/topButtons";
import Inputs from "./components/inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import getWeatherData from "./weather/weatherService";

function App() {
  const fetchWeather = async () => {
    const data = await getWeatherData("weather", { q: "London" });
    console.log(data);
  };

  // fetchWeather();

  return (
    <div
      className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl
     shadow-gray-400"
    >
      <TopButtons />
      <Inputs />

      <TimeAndLocation />
      <TemperatureAndDetails />

      <Forecast title="Hourly Forecast" />
      <Forecast title="Daily Forecast" />
    </div>
  );
}

export default App;
