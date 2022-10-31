let now = new Date();
 let tueElement = document.querySelector("#tue");
 let tue = tueElement.innerHTML;
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let month = months[now.getMonth()];

tueElement.innerHTML = `${day}, ${month} ${date}, ${hours}:${minutes}, ${year}`;

function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
return days[day];

}

function displayForecast(response) {
  console.log(response);
    let forecast = response.data.daily;
let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class="row">`;
forecast.forEach(function(forecastDay, index) {

  if (index < 6) {
forecastHTML = 

forecastHTML +
  `
  <div class="col-2">
    <div class="weather-forecast-date">${formatDay (forecastDay.dt)}</div>
    <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
    alt="" 
    width="50" />
    <div class="weather-forecast-temp">
      <span class="weather-forcast-temp-max"> 
      ${Math.round(
        forecastDay.temp.max
        )}° </span>
      <span class="weather-forcast-temp-min">
       ${Math.round(
        forecastDay.temp.min
        )}° </span>
    </div>
  </div>
`;
       }

});

forecastHTML = forecastHTML+ `</div>`;
forecastElement.innerHTML = forecastHTML;

}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "6d68aadfacdd4f5163bc273049a0cf2d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = 11;
}




function searchCity(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");



  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = Math.round(response.data.wind.speed);
 iconElement.setAttribute(
   "src",
   `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
 );

  iconElement.setAttribute("alt", response.data.weather[0].description);

getForecast(response.data.coord);

}

let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  let city = document.querySelector("#scare-input").value;
  handleCity(city);
}

function handleCity(city) {
  let apiKey = "e049244c47b06da6db12af4f0ec42242";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(searchCity);
}

handleCity("Sleepy Hollow");


let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);


let celsuisLink = document.querySelector("#celsius-link");
celsuisLink.addEventListener("click", convertToCelsuis);
