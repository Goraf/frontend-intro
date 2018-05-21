// 

const makeRequest = (requestUrl, method = "GET") => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open(method, requestUrl);

    request.onload = () => {
      if (request.status == 200) {
        resolve(request.responseText);
      }
      else {
        const errorMsg = "Status: " + request.status + " " + "Response: " + request.statusText;
        reject(Error(errorMsg));
      }
    };

    request.onerror = () => {
      reject(Error("Network error."));
    };

    request.send();
  });
}

export {makeRequest};
