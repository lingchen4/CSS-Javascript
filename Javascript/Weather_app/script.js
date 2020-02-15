let appId = "1819a8a1b6c3483eee9f58dd4699a0dc";
let units = "metric";
let searchMethod;

document.getElementById("searchInput").addEventListener("focus", () => {
  let weatherContainer = document.getElementById("weatherContainer");
  weatherContainer.style.visibility = "hidden";
});

document.getElementById("searchBtn").addEventListener("click", () => {
  let searchTerm = document.getElementById("searchInput").value;
  if (searchTerm) {
    searchWeather(searchTerm);
  }
});

function getSearchMethod(searchTerm) {
  if (searchTerm === 5 && Number.parseInt(searchTerm) + "" === searchTerm)
    searchMethod = "zip";
  else searchMethod = "q";
}

function searchWeather(searchTerm) {
  getSearchMethod(searchTerm);
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`
  )
    .then(result => {
      return result.json();
    })
    .then(result => {
      console.log(result);
      if (!result.name) {
        alert("City not Found");
      }
      init(result);
    });
}

function init(resultFromServer) {
  switch (resultFromServer.weather[0].main) {
    case "Clear":
      document.body.style.backgroundImage = "url(clear.jpg)";
      break;

    case "Clouds":
      document.body.style.backgroundImage = "url(cloudy.jpg)";
      break;

    case "Rain":
    case "Drizzle":
    case "Mist":
      document.body.style.backgroundImage = "url(rain.jpg)";
      break;

    case "Thudnerstorm":
      document.body.style.backgroundImage = "url(storm.jpg)";
      break;

    case "snow":
      document.body.style.backgroundImage = "url(snow.jpg)";
      break;

    default:
      break;
  }

  let weatherDescriptionHeader = document.getElementById(
    "weatherDecriptionHeader"
  );
  let termpratureElement = document.getElementById("temperature");
  let windSpeedElement = document.getElementById("windSpeed");
  let humidityElement = document.getElementById("humidity");
  let cityHeader = document.getElementById("cityHeader");
  let weatherIcon = document.getElementById("documentIconImg");

  weatherIcon.src =
    "http://openweathermap.org/img/w/" +
    resultFromServer.weather[0].icon +
    ".png";

  let resultDescription = resultFromServer.weather[0].description;
  weatherDescriptionHeader.innerText =
    resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

  termpratureElement.innerHTML =
    Math.floor(resultFromServer.main.temp) + "&#176C";
  windSpeedElement.innerHTML =
    "Winds at " + Math.floor(resultFromServer.wind.speed) + "m/s";
  cityHeader.innerHTML = resultFromServer.name;
  humidityElement.innerHTML =
    "Humidity Levels at " + resultFromServer.main.humidity + "%";

  setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
  let weatherContainer = document.getElementById("weatherContainer");
  let weatherContainerHeight = weatherContainer.clientHeight;
  let weatherContainerWidth = weatherContainer.clientWidth;

  weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`;
  weatherContainer.style.top = `calc(50% - ${weatherContainerHeight / 2}px)`;
  weatherContainer.style.visibility = "visible";
}
