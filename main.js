let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
let apiKeyandUnit = "&appid=61d1f78dd5a9cb798af531c91d631d0d&units=metric";

let searchBox = document.querySelector(".search input");
let searchBtn = document.querySelector(".search button");
let weatherIcon = document.querySelector(".weather-icon");
let card = document.querySelector(".card");
let visibility = document.querySelectorAll(".visibility-hidden");
let invalidName = document.querySelector(".error");

this.onload = function () {
  card.style.height = "70px";
};

searchBtn.addEventListener("click", () => {
  getWeather(searchBox.value);
  card.style.height = "400px";
  visibility.forEach((element) => {
    element.style.visibility = "visible";
  });
  invalidName.style.display = "none";
});


async function getWeather(city) {
  try {
    let response = await fetch(apiUrl + city + apiKeyandUnit);
    let weatherData = await response.json();

    console.log(weatherData);

    document.querySelector(".city").innerHTML = weatherData.name;
    document.querySelector(".temprature").innerHTML =
      Math.round(weatherData.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML =
      Math.round(weatherData.main.humidity) + "%";
    document.querySelector(".wind").innerHTML =
      weatherData.wind.speed + " km/hr";

    if (weatherData.weather[0].main === "Clear") {
      weatherIcon.src = "/assets/sun (1).png";
    } else if (weatherData.weather[0].main === "Clouds") {
      weatherIcon.src = "/assets/cloudy-day.png";
    } else if (weatherData.weather[0].main === "Thunderstorm") {
      weatherIcon.src = "/assets/storm.png";
    } else if (weatherData.weather[0].main === "Rain") {
      weatherIcon.src = "/assets/rain.png";
    } else if (weatherData.weather[0].main === "Snow") {
      weatherIcon.src = "/assets/snowing (1).png";
    } else if (
      weatherData.weather[0].main === "Mist" ||
      weatherData.weather[0].main === "Fog"
    ) {
      weatherIcon.src = "/assets/foggy-day.png";
    }
  } catch (error) {
    invalidName.style.display = "block";
    card.style.height = "70px";
    visibility.forEach((element) => {
      element.style.visibility = "hidden";
    });
  }
}
