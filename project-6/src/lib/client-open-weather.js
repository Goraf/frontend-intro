import { makeRequest } from "./request-api";
import { API_KEY } from "./owm-api-key";


const _serverAddress = "http://api.openweathermap.org/data/2.5/";

function cityForecast5SearchByName(searchedCity) {
  return new Promise((resolve) => {
    const url = _serverAddress + "forecast?q=" + searchedCity + "&units=metric" + "&APPID=" + API_KEY;
    makeRequest(url)
    .then((result) => {
      resolve(JSON.parse(result));
    })
    .catch((error) => {
      console.error("Failed", error);
      resolve(null);
    })
  });
}

export {cityForecast5SearchByName};
