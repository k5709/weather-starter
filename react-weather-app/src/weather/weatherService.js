import { DateTime } from "luxon";
const API_KEY = "9c6423df83578665e7f7f9da70cdc6ed";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// const getWeatherData = async (infoType, searchParams) => {
//   const url = new URL(BASE_URL + "/" + infoType);
//   url.search = new URLSearchParams({ ...searchParams, appId: API_KEY });

//   try {
//     const res = await fetch(url);
//     if (!res.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error("There was a problem with the fetch operation:", error);
//   }
// };
//
const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  console.log(url);
  return fetch(url).then((res) => res.json());
};
//
const iconUrlFromCode = (icon) =>
  `http://openweathermap.org/img/wn/${icon}01d@2x.png`;
//
const formatToLocalTime = (
  secs,
  offset,
  format = "cccc, dd, LLL, yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);
//
const formatCurrent = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;

  const { main: details, icon } = weather[0];
  const formattedLocalTime = formatToLocalTime(dt, timezone);

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    timezone,
    country,
    sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"),
    sunset: formatToLocalTime(sunset, timezone, "hh:mm a"),
    details,
    icon: iconUrlFromCode(icon),
    formattedLocalTime,
    speed,
  };
};
//
const formatForecastWeather = async (secs, offset, data) => {
  //hourly
  const hourly = await data
    .filter((f) => f.dt > secs)
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "hh:mm a"),
      icon: iconUrlFromCode(f.weather[0].icon),
      data: f.dt_txt,
    }))
    .slice(0, 5);

  //daily
  const daily = data
    .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "ccc"),
      icon: iconUrlFromCode(f.weather[0].icon),
      data: f.dt_txt,
    }))
    .slice(0, 5);

  return { hourly, daily };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrent);

  const { dt, lat, lon, timezone } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("forecast", {
    lat,
    lon,
    units: searchParams.units,
  }).then((d) => formatForecastWeather(dt, timezone, d.list));

  return { ...formattedCurrentWeather, formattedForecastWeather };
};

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };
