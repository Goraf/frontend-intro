function averageFromArray(array) {
  if (!array.length) {
    return null;
  }

  let nominator = 0;
  for (let i = 0; i < array.length; i++) {
    nominator += array[i];
  }

  return nominator/array.length;
}

function averageFromArrayFixed(array, digits = 1) {
  if (!array.length) {
    return null;
  }

  return averageFromArray(array).toFixed(digits);
}

export {averageFromArray, averageFromArrayFixed};
