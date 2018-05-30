import * as storage from "./lib/storage";
import * as math from "./lib/math";
import { cityForecast5SearchByName as search } from "./lib/client-open-weather";

class WeatherApp {
  constructor() {
    this.data = {};
    this.cityEntriesContainer = document.getElementsByClassName("cities-table-body")[0];
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
        cities: []
      };
    }
    else if (this.data.cities.length) {
      let length = this.data.cities.length;
      for (let i = 0; i < length; i++) {
        const city = this.data.cities[i];
        this.addCityEntry(city);
      }
      this.updateColumnIDNumbers();
      console.info("initData: Data loaded.");
    }
    else {
      console.info("initData: List is empty. Nothing to load.");
    }
  }

  addCityEntry({name = "unknown", avgTemp = ""}) {
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
    cellTemperature.textContent = avgTemp + " ℃";

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

  removeCityEntry (event) {
    if (event.target && event.target.matches(".cities-table-body-cell__remove-button")) {
      const cityEntry = event.target.closest(".cities-table-body-row");
      const cityName = cityEntry.querySelector(".cities-table-body-cell_col-city-name").textContent;

      const isConfirmed = confirm("Do you really want to delete: " + cityName +
                                  "\nOperation cannot be undone.");
      if (isConfirmed) {
        const position = this.data.cities.findIndex(x => x.name === cityName);
        this.data.cities.splice(position, 1);
        storage.saveData("data", this.data);
        this.cityEntriesContainer.removeChild(cityEntry);
        this.updateColumnIDNumbers();
      }
    }
  }

  updateColumnIDNumbers () {
    const cells = document.querySelectorAll(".cities-table-body .cities-table-body-cell_col-ID");
    for (let i = 0, j = cells.length; i < j; i++) {
      cells[i].textContent = i + 1;
    }
  }

  processInput(event) {
    event.preventDefault();

    const cityName = this.cityNameInput.value.trim();
    if (cityName) {
      const isUnique = this.data.cities.findIndex(x => x.name === cityName);
      if (!isUnique) {
        alert("The city is already on the list.");
        return;
      }

      search(cityName).then(weatherInfo => {
        if (!weatherInfo) {
          alert("Couldn't find/add the city. Check its name or your internet connection.");
          throw new Error("Connection/request error");
        }
        // deep clone object
        const city = JSON.parse(JSON.stringify(weatherInfo.city));

        let temperatures = [];
        const list = weatherInfo.list;
        for (let i = 0, j = list.length; i < j; i++) {
          const measurementDate = new Date(list[i].dt * 1000);
          const hourOfData = measurementDate.getUTCHours();
          const isDaytime = ((hourOfData >= 8) && (hourOfData <= 19));
          if (isDaytime) {
            let temp = list[i].main.temp;
            if ((typeof temp === "number") && (!Number.isNaN(temp))) {
              temperatures.push(temp);
            }
          }
        }
        const averageTemp = math.averageFromArrayFixed(temperatures);

        city.avgTemp = averageTemp ? averageTemp : "";
        return city;
      }).then((city) => {
        this.data.cities.push(city);
        storage.saveData("data", this.data);
        this.addCityEntry(city);
        this.updateColumnIDNumbers();
      }).catch((error) => {
        console.error(error);
      })
    }
    else {
      window.alert("Input cannot be empty.")
    }

    this.cityNameInput.value = "";
  }
}

window.addEventListener("DOMContentLoaded", () => new WeatherApp());