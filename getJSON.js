function getJSON (url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => resolve(JSON.parse(xhr.responseText));
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
};
  
function getJSON2 (url) {
  return fetch(url)
        .then(function(response) {
          return response.json();

        })
        .catch(function(error) {
          return error;
        });
}

var getAstros = getJSON('http://api.open-notify.org/astros.json');   
var getAstros2 = getJSON2('http://api.open-notify.org/astros.json');