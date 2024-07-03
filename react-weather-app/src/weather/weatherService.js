import { DateTime } from "luxon";
const API_KEY =
  process.env.REACT_APP_API_KEY1 || process.env.REACT_APP_API_KEY2;
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const OVERVIEW_URL =
  "https://api.openweathermap.org/data/3.0/onecall/overview?";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  console.log(url);
  return fetch(url).then((res) => res.json());
};
//
const getWeatherOverview = (lat, lon) => {
  const url = new URL(OVERVIEW_URL);
  url.search = new URLSearchParams({ lat, lon, appid: API_KEY });
  console.log(url);
  return fetch(url).then((res) => res.json());
};
//
const iconUrlFromCode = (icon) =>
  `http://openweathermap.org/img/wn/${icon}@2x.png`;
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
    weather_overview: weather.weather_overview,
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
  ).then(async (currentData) => {
    const overviewData = await getWeatherOverview(
      currentData.coord.lat,
      currentData.coord.lon
    );
    return formatCurrent(currentData, overviewData);
  });

  // https://api.openweathermap.org/data/2.5/forecast?lat=40.0003&lon=-89.2504&units=imperial&appid=9c6423df83578665e7f7f9da70cdc6ed

  const { dt, lat, lon, timezone } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("forecast", {
    lat,
    lon,
    units: searchParams.units,
  }).then((d) => formatForecastWeather(dt, timezone, d.list));

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };
