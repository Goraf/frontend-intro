class WeatherApp {
  constructor() {
    this.cityEntriesContainer = document.getElementsByClassName("cities-table-body")[0];
    this.cityNameInput = document.getElementById("new-entry");

    const form = document.getElementById("add-form");
    form.addEventListener("submit", e => this.processInput(e));

    this.cityEntriesContainer.addEventListener("click", e => this.removeCityEntry(e));
  }

  addCityEntry(cityName = "unknown") {
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
    cellCityName.textContent = cityName;

    const cellTemperature = document.createElement("td");
    cellTemperature.classList.add(cellStyleClass);
    cellTemperature.classList.add("cities-table-body-cell_col-temperature");
    cellTemperature.textContent = "C";

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
        this.cityEntriesContainer.removeChild(cityEntry);
      }
    }
  }

  processInput(event) {
    event.preventDefault();

    const cityName = this.cityNameInput.value.trim();
    if (cityName) {
      this.addCityEntry(cityName);
    }
    else {
      window.alert("Input cannot be empty.")
    }

    this.cityNameInput.value = "";
  }
}

window.addEventListener("DOMContentLoaded", () => new WeatherApp());