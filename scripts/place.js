// place.js - Script for WDD 131 Place Page (Madagascar)

document.addEventListener("DOMContentLoaded", () => {
    // 1. Current Year and Last Modified Date in Footer
    const currentYearEl = document.getElementById("currentyear");
    const lastModifiedEl = document.getElementById("lastModified");

    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    if (lastModifiedEl) {
        lastModifiedEl.textContent = `Last Modified: ${document.lastModified}`;
    }

    // 2. Wind Chill Calculation
    // Static values representing local weather conditions
    const temperature = 8; // In °C
    const windSpeed = 10;  // In km/h

    const tempEl = document.getElementById("temperature");
    const windEl = document.getElementById("wind-speed");
    const windChillEl = document.getElementById("wind-chill");

    // Populate the static values in DOM (ensuring matching data)
    if (tempEl) tempEl.textContent = temperature;
    if (windEl) windEl.textContent = windSpeed;

    // One-line arrow function returning the wind chill factor in Celsius
    const calculateWindChill = (temp, speed) =>
        13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16);

    // Evaluate conditions for viable calculations
    // Metric: temp <= 10 °C and wind speed > 4.8 km/h
    if (temperature <= 10 && windSpeed > 4.8) {
        const windChillValue = calculateWindChill(temperature, windSpeed);
        if (windChillEl) {
            windChillEl.textContent = `${windChillValue.toFixed(1)} °C`;
        }
    } else {
        if (windChillEl) {
            windChillEl.textContent = "N/A";
        }
    }
});
