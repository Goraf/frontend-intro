import { makeRequest } from "./request-api";
import { API_KEY } from "./owm-api-key";


const _serverAddress = "http://api.openweathermap.org/data/2.5/";

function cityForecast5SearchByName(searchedCity) {
  const url = `${_serverAddress}forecast?q=${searchedCity}&units=metric&APPID=${API_KEY}`;

  return makeRequest(url);
}

function cityForecast5SearchById(cityId) {
  const url = `${_serverAddress}forecast?id=${cityId}&units=metric&APPID=${API_KEY}`;

  return makeRequest(url);
}

export { cityForecast5SearchByName, cityForecast5SearchById };
