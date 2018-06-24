//

class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = "HttpError";
    this.response = response;
  }
}

const makeRequest = (requestUrl, method = "GET") => new Promise((resolve, reject) => {
  const request = new XMLHttpRequest();

  request.open(method, requestUrl);

  request.onload = () => {
    if (request.status === 200) {
      resolve(request.responseText);
    } else {
      reject(new HttpError(request));
    }
  };

  request.onerror = () => {
    reject(new HttpError(request));
  };

  request.send();
});

export { HttpError, makeRequest };
