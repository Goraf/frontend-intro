// Provides function to save and load from localStorage

function loadData(key) {
  if (typeof key !== "string") {
    console.warn("loadData: wrong type of parameter");
    return;
  }

  const item = localStorage.getItem(key)
  if (!item) {
    console.info("loadData: Key \"" + key + "\" does not exist in localStorage. Nothing to load.");
    return;
  }
  else {
    return JSON.parse(item);
  }
}

function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export {loadData, saveData};
