let now = new Date();
let date = now.getDate();
let year = now.getFullYear();
let hour = now.getHours();
let minutes = now.getMinutes();

let days = ["Sunday", 
  "Monday", 
  "Tuesday", 
  "Wednesday", 
  "Thursday", 
  "Friday", 
  "Saturday"]
let day = days[now.getDay()];

let months = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]
let month = months[now.getMonth()];

let todayDate = document.querySelector("#date");
todayDate.innerHTML = `${day} ${date} ${month}, ${year} ${hour}:${minutes}`;


let apiKey = "0b0ec56c90b41bb11f010b0e7cfeb75c";
let apiCity = "Brisbane";
let apiMetric = "metric";
let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q="
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${apiCity}&appid=${apiKey}&units=${apiMetric}`;

axios.get(`${apiUrl}`).then(showTemperature);

function showTemperature(response) {
  console.log(response);
  let city = response.data.name;
  let temperature = `${Math.round(response.data.main.temp)}°C`;
  let condition = response.data.weather[0].main;
  let lowTemp= `${Math.round(response.data.main.temp_min)}°C`;
  let highTemp= `${Math.round(response.data.main.temp_max)}°C`;
  let feelsLike= `Feels like: ${Math.round(response.data.main.feels_like)}°C`;
  let humidity= `Humidity: ${Math.round(response.data.main.humidity)}%`;

  document.querySelector("#chosenCity").innerHTML = city;
document.querySelector("#current-temperature").innerHTML = temperature;
document.querySelector("#condition").innerHTML = condition;
document.querySelector("#low-temperature").innerHTML = lowTemp;
document.querySelector("#high-temperature").innerHTML = highTemp;
document.querySelector("#FeelsLike").innerHTML = feelsLike;
document.querySelector("#humidity").innerHTML = humidity;
}


function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let apiCity = searchInput.value;
  console.log(searchInput.value);
  let apiKey = "0b0ec56c90b41bb11f010b0e7cfeb75c";
  let apiMetric = "metric";
let apiUrl = `${apiEndpoint}${apiCity}&appid=${apiKey}&units=${apiMetric}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

let form= document.querySelector("form");
form.addEventListener("submit", search);

function retrievePosition(position) {
  let latitude = (position.coords.latitude);
  let longitude = (position.coords.longitude);
  let apiKey = "0b0ec56c90b41bb11f010b0e7cfeb75c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}


function getWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}


let currentWeather = document.querySelector("#getWeatherButton");
currentWeather.addEventListener("click",getWeather);