const searchBtn = document.querySelector(".hero__button");
const searchInput = document.querySelector(".hero__textbox");

const cityElement = document.querySelector(".current__city");
const tempElement = document.querySelector(".current__temp");

async function getWeather(city) {
  try {
    let query = city.trim();

    
    let geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=ar&format=json`
    );

    let geoData = await geoRes.json();

    
    if (!geoData.results || geoData.results.length === 0) {
      geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`
      );

      geoData = await geoRes.json();
    }

    if (!geoData.results || geoData.results.length === 0) {
      alert("المدينة غير موجودة");
      return;
    }

    const place = geoData.results[0];

    cityElement.textContent = `${place.name}, ${place.country}`;

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m`
    );

    const weatherData = await weatherRes.json();

    tempElement.textContent =
      Math.round(weatherData.current.temperature_2m) + "°";

  } catch (error) {
    console.error(error);
    alert("خطأ بالاتصال بالإنترنت أو API");
  }
}


searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const city = searchInput.value.trim();
  if (city) getWeather(city);
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    const city = searchInput.value.trim();
    if (city) getWeather(city);
  }
});
 
function getWeatherIcon(code) {
  if (code === 0) return "images/icon-sunny.webp"; // صافي
  if (code >= 1 && code <= 3) return "images/icon-partly-cloudy.webp"; // غائم جزئي
  if (code >= 45 && code <= 48) return "images/icon-overcast.webp"; // ضباب
  if (code >= 51 && code <= 67) return "images/icon-rain.webp"; // مطر
  if (code >= 71 && code <= 77) return "images/icon-snow.webp"; // ثلج
  if (code >= 80 && code <= 82) return "images/icon-rain.webp"; // زخات مطر
  return "images/icon-partly-cloudy.webp"; // افتراضي
} 

async function getWeather(city) {
  const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

  if (weatherData.current_weather.weathercode >= 51 &&
    weatherData.current_weather.weathercode <= 82) {
  alert("🌧️ احتمال مطر اليوم، خذ احتياطك!");
}
  const geoRes = await fetch(geoURL);
  const geoData = await geoRes.json();

  const lat = geoData.results[0].latitude;
  const lon = geoData.results[0].longitude;

  const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

  const weatherRes = await fetch(weatherURL);
  const weatherData = await weatherRes.json();

  const temp = weatherData.current_weather.temperature;
  const code = weatherData.current_weather.weathercode;

  document.querySelector(".current__city").textContent = city;
  document.querySelector(".current__temp").textContent = temp + "°";

  // 🔥 تغيير الأيقونة حسب الطقس
  const icon = getWeatherIcon(code);
  document.querySelector(".current__icon").src = icon;
}

setInterval(updateTime, 1000);
updateTime();


async function getWeather(city) {
  const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

  const geoRes = await fetch(geoURL);
  const geoData = await geoRes.json();

  const lat = geoData.results[0].latitude;
  const lon = geoData.results[0].longitude;

  const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

  const weatherRes = await fetch(weatherURL);
  const weatherData = await weatherRes.json();

  document.querySelector(".current__city").textContent = city;
  document.querySelector(".current__temp").textContent =
    weatherData.current_weather.temperature + "°";
}

const form = document.querySelector(".hero__search");
const input = document.querySelector(".hero__textbox");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather(input.value);
});

function setThemeByTime() {
  const hour = new Date().getHours();
  const body = document.body;

  if (hour >= 6 && hour < 18) {
    body.classList.add("day");
    body.classList.remove("night");
  } else {
    body.classList.add("night");
    body.classList.remove("day");
  }
}

setThemeByTime();
const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");

function setThemeByTime() {
  const hour = new Date().getHours();
  const body = document.body;

  if (hour >= 6 && hour < 18) {
    body.classList.add("day");
    body.classList.remove("night");

    sun.style.display = "block";
    moon.style.display = "none";
  } else {
    body.classList.add("night");
    body.classList.remove("day");

    sun.style.display = "none";
    moon.style.display = "block";
  }
}

setThemeByTime();
setInterval(setThemeByTime, 60 * 60 * 1000);

function createRain() {
  const rainContainer = document.querySelector(".rain");

  for (let i = 0; i < 50; i++) {
    const drop = document.createElement("div");
    drop.classList.add("drop");

    drop.style.left = Math.random() * 100 + "vw";
    drop.style.animationDuration = 0.5 + Math.random() * 1.5 + "s";
    drop.style.opacity = Math.random();

    rainContainer.appendChild(drop);
  }
}

createRain();

function getUserLocation() {
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    const res = await fetch(url);
    const data = await res.json();

    document.querySelector(".current__temp").textContent =
      data.current_weather.temperature + "°";
  });
}

getUserLocation();