let today_name = document.getElementById("today_name");
let day_number_today = document.getElementById("day_number_today");
let month_number_today = document.getElementById("month_number_today");
let country_name = document.getElementById("country_name");
let today_temp = document.getElementById("today_temp");
let today_img = document.getElementById("today_img");
let today_condition = document.getElementById("today_condition");
let humidity = document.getElementById("humidity");
let windy = document.getElementById("windy");
let compass = document.getElementById("compass");
// tomorrow data
let next_day = document.getElementsByClassName("next_day");
let tomorrow_img = document.getElementsByClassName("tomorrow_img");
let next_temp = document.getElementsByClassName("next_temp");
let next_min_temp = document.getElementsByClassName("next_min_temp");
let next_condition = document.getElementsByClassName("next_condition");
//search

let search = document.getElementById("search");

async function getData(cityName) {
  let weatherResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=e3668626d6194bc2921145155240402&q=${cityName}&days=3`
  );
  let weatherData = await weatherResponse.json();
  return weatherData;
}
//data today
function displayData(data) {
  let dateToday = new Date();
  today_name.innerHTML = dateToday.toLocaleDateString("en-us", {
    weekday: "long",
  });
  day_number_today.innerHTML = dateToday.getDate();
  month_number_today.innerHTML = dateToday.toLocaleDateString("en-us", {
    month: "long",
  });

  country_name.innerHTML = data.location.name;
  today_temp.innerHTML = data.current.temp_c;
  today_condition.innerHTML = data.current.condition.text;
  today_img.setAttribute("src", data.current.condition.icon);
  humidity.innerHTML = data.current.humidity;
  windy.innerHTML = data.current.wind_kph;
  compass.innerHTML = data.current.wind_dir;
}
function displayNextData(data) {
  let forcast = data.forecast.forecastday;
  for (var i = 0; i < next_day.length; i++) {
    let nextDate = new Date(forcast[i + 1].date);
    next_day[i].innerHTML = nextDate.toLocaleDateString("en-us", {
      weekday: "long",
    });

    next_temp[i].innerHTML = forcast[i + 1].day.maxtemp_c;
    next_min_temp[i].innerHTML = forcast[i + 1].day.mintemp_c;
    next_condition[i].innerHTML = forcast[i + 1].day.condition.text;
    tomorrow_img[i].setAttribute("src", forcast[i + 1].day.condition.icon);
  }
}

async function startApp(city = "Tanta") {
  let weatherData = await getData(city);
  if (!weatherData.error) {
    displayData(weatherData);
    displayNextData(weatherData);
  }
}
startApp();
search.addEventListener("input", function () {
  startApp(search.value);
});
