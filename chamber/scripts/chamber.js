const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = `Last Modified: ${lastModified}`;

// Menu toggle
const menuButton = document.getElementById("menu-button");
const nav = document.getElementById("main-nav");

menuButton.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuButton.textContent = nav.classList.contains("open") ? "✕" : "☰";
});

// Weather API
const weatherContainer = document.getElementById("weather-info");
const apiKey = "09022e0b7336d84182dc510592e5ca5e"; // OpenWeatherMap API key
const city = "Lima,PE";
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

async function getWeather() {
  try {
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(weatherUrl),
      fetch(forecastUrl)
    ]);

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error("Weather data unavailable");
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    const temp = Math.round(currentData.main.temp);
    const description = currentData.weather[0].description;

    // Get next 3 days forecast (approx every 8 entries = 1 day)
    const forecastDays = [];
    for (let i = 8; i < forecastData.list.length && forecastDays.length < 3; i += 8) {
      const day = forecastData.list[i];
      const date = new Date(day.dt * 1000);
      forecastDays.push({
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        temp: Math.round(day.main.temp)
      });
    }

    weatherContainer.innerHTML = `
      <p><strong>Current:</strong> ${temp}°C, ${description}</p>
      <div class="forecast">
        <h3>3-Day Forecast</h3>
        ${forecastDays.map(d => `<p>${d.day}: ${d.temp}°C</p>`).join("")}
      </div>
    `;
  } catch (error) {
    weatherContainer.innerHTML = `<p>Weather information is currently unavailable.</p>`;
    console.error(error);
  }
}

// Company Spotlight
const spotlightContainer = document.getElementById("spotlight-container");

async function getSpotlight() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Members data not found");
    const members = await response.json();

    // Filter gold (3) and silver (2)
    const qualified = members.filter(m => m.membership >= 2);

    // Shuffle and pick 2-3
    const shuffled = qualified.sort(() => 0.5 - Math.random());
    const count = Math.min(3, Math.max(2, Math.floor(Math.random() * 2) + 2));
    const selected = shuffled.slice(0, count);

    spotlightContainer.innerHTML = selected.map(member => `
      <article class="spotlight-card">
        <img src="images/${member.image}" alt="${member.name} logo">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p><a href="${member.website}" target="_blank">${member.website}</a></p>
        <p>Membership: ${member.membership === 3 ? "Gold" : "Silver"}</p>
      </article>
    `).join("");
  } catch (error) {
    spotlightContainer.innerHTML = `<p>Spotlight information is currently unavailable.</p>`;
    console.error(error);
  }
}

// Load data
getWeather();
getSpotlight();