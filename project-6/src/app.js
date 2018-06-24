import * as math from "./lib/math";
import * as storage from "./lib/storage";
import { cityForecast5SearchById, cityForecast5SearchByName as search } from "./lib/client-open-weather";
import { HttpError } from "./lib/request-api";

class WeatherApp {
  constructor() {
    this.data = {};
    [this.cityEntriesContainer] = document.getElementsByClassName("cities-table-body");
    this.cityNameInput = document.getElementById("new-entry");

    const form = document.getElementById("add-form");
    form.addEventListener("submit", e => this.processInput(e));

    this.cityEntriesContainer.addEventListener("click", e => this.removeCityEntry(e));
    this.initData();
  }

  initData() {
    this.data = storage.loadData("data");
    if (!this.data) {
      this.data = {
        cities: [],
      };
    } else if (this.data.cities.length) {
      const length = this.data.cities.length;
      for (let i = 0; i < length; i++) {
        const city = this.data.cities[i];
        this.addCityEntry(city);
      }
      this.updateColumnIDNumbers();
      console.info("initData: Data loaded.");
    } else {
      console.info("initData: List is empty. Nothing to load.");
    }

    this.requestWeatherData();
  }

  addCityEntry({ name = "unknown", avgTemp = "" }) {
    const rowStyleClass = "cities-table-body-row";
    const cellStyleClass = "cities-table-body-cell";

    const cityEntry = document.createElement("tr");
    cityEntry.classList.add(rowStyleClass);

    const cellID = document.createElement("td");
    cellID.classList.add(cellStyleClass);
    cellID.classList.add("cities-table-body-cell_col-ID");
    cellID.textContent = "X";

    const cellCityName = document.createElement("th");
    cellCityName.classList.add(cellStyleClass);
    cellCityName.classList.add("cities-table-body-cell_col-city-name");
    cellCityName.scope = "row";
    cellCityName.textContent = name;

    const cellTemperature = document.createElement("td");
    cellTemperature.classList.add(cellStyleClass);
    cellTemperature.classList.add("cities-table-body-cell_col-temperature");
    cellTemperature.textContent = `${avgTemp} ℃`;

    const cellButton = document.createElement("td");
    cellButton.classList.add(cellStyleClass);
    cellButton.classList.add("cities-table-body-cell_col-button");

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("button", "cities-table-body-cell__remove-button");
    removeBtn.textContent = "Remove";

    cellButton.appendChild(removeBtn);

    cityEntry.appendChild(cellID);
    cityEntry.appendChild(cellCityName);
    cityEntry.appendChild(cellTemperature);
    cityEntry.appendChild(cellButton);

    this.cityEntriesContainer.appendChild(cityEntry);
  }

  removeCityEntry(event) {
    if (event.target && event.target.matches(".cities-table-body-cell__remove-button")) {
      const cityEntry = event.target.closest(".cities-table-body-row");
      const cityName = cityEntry.querySelector(".cities-table-body-cell_col-city-name").textContent;

      const isConfirmed = window.confirm(`Do you really want to delete: ${cityName}\nOperation cannot be undone.`);
      if (isConfirmed) {
        const position = this.data.cities.findIndex(x => x.name === cityName);
        this.data.cities.splice(position, 1);
        storage.saveData("data", this.data);
        this.cityEntriesContainer.removeChild(cityEntry);
        this.updateColumnIDNumbers();
      }
    }
  }

  updateColumnIDNumbers() {
    const cells = document.querySelectorAll(".cities-table-body .cities-table-body-cell_col-ID");
    for (let i = 0, j = cells.length; i < j; i++) {
      cells[i].textContent = i + 1;
    }
  }

  processInput(event) {
    event.preventDefault();

    const cityName = this.cityNameInput.value.trim();
    if (!cityName) {
      window.alert("Input cannot be empty.");
      this.cityNameInput.value = "";
      return;
    }

    search(cityName).then((response) => {
      const weatherInfo = JSON.parse(response);

      const index = this.data.cities.findIndex(x => x.id === weatherInfo.city.id);
      const isUnique = (index === -1);
      if (!isUnique) {
        window.alert(`The city is already on the list. Look at position ${index + 1}.`);
      } else {
        // deep clone object
        const city = JSON.parse(JSON.stringify(weatherInfo.city));

        const parameters = this.calculateWeatherParameters(weatherInfo.list);
        Object.assign(city, parameters);

        this.data.cities.push(city);
        storage.saveData("data", this.data);
        this.addCityEntry(city);
        this.updateColumnIDNumbers();
      }

      this.cityNameInput.value = "";
    }).catch((err) => {
      if (err instanceof HttpError) {
        switch (err.response.status) {
          case 0:
            window.alert("Network error. Check your Internet settings/connection or try again later.");
            break;

          case 404:
            window.alert("No such city found. Check provided name and try again.");
            break;

          default:
            window.alert("Problem with server. Try again later.");
            break;
        }
      } else {
        console.error(err);
      }
    });
  }

  calculateWeatherParameters(weatherData) {
    const weatherParameters = {};
    const temperatures = [];

    for (let i = 0, j = weatherData.length; i < j; i++) {
      const measurementDate = new Date(weatherData[i].dt * 1000);
      const hourOfData = measurementDate.getUTCHours();
      const isDaytime = (hourOfData >= 8) && (hourOfData <= 19);
      if (isDaytime) {
        const temp = weatherData[i].main.temp;
        if ((typeof temp === "number") && !Number.isNaN(temp)) {
          temperatures.push(temp);
        }
      }
    }
    const averageTemp = math.averageFromArrayFixed(temperatures);
    weatherParameters.avgTemp = averageTemp ? averageTemp : "";

    return weatherParameters;
  }

  requestWeatherData() {
    Promise.all(this.data.cities.map((city) => {
      return cityForecast5SearchById(city.id);
    })).then((arrayOfResponses) => {
      arrayOfResponses.forEach((response, index) => {
        try {
          const weatherInfo = JSON.parse(response);
          const parameters = this.calculateWeatherParameters(weatherInfo.list);

          this.data.cities[index].avgTemp = parameters.avgTemp;
        } catch (error) {
          console.error(error);
        }
      });
      storage.saveData("data", this.data);
    });
  }
}

window.addEventListener("DOMContentLoaded", () => new WeatherApp());
