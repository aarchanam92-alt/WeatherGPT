// ===============================
// WeatherGPT - script.js
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    // ---------- WEATHER ALERT ----------
    function updateWeatherAlert() {
        const alertBox = document.querySelector(".alert");

        if (!alertBox) return;

        const pageText = document.body.innerText.toLowerCase();

        // Find rain percentage from the displayed weather information
        const rainMatch = pageText.match(/rain:\s*(\d+)%/);
        const rainChance = rainMatch ? parseInt(rainMatch[1]) : 0;

        let alertMessage = "";

        if (rainChance >= 70) {
            alertMessage = "🌧️ Heavy rain is expected. Please carry an umbrella and stay safe.";
        } 
        else if (rainChance >= 40) {
            alertMessage = "🌦️ Moderate chance of rain. Keep an umbrella with you.";
        } 
        else if (rainChance >= 20) {
            alertMessage = "☁️ There is a small chance of rain today.";
        } 
        else {
            alertMessage = "☀️ No severe weather alert currently.";
        }

        alertBox.innerHTML = `
            <h3>⚠️ Weather Alerts</h3>
            <p>${alertMessage}</p>
        `;
    }


    // ---------- ASK WEATHERGPT ----------
    function setupWeatherGPT() {

        const chatbot = document.querySelector(".chatbot");

        if (!chatbot) return;

        const input = chatbot.querySelector("input");
        const button = chatbot.querySelector("button");

        if (!input || !button) return;

        // Create answer area if it does not already exist
        let answer = chatbot.querySelector(".chatbot-answer");

        if (!answer) {
            answer = document.createElement("p");
            answer.className = "chatbot-answer";
            answer.style.marginTop = "15px";
            answer.style.fontWeight = "bold";
            chatbot.appendChild(answer);
        }

        button.addEventListener("click", function () {

            const question = input.value.trim().toLowerCase();

            if (question === "") {
                answer.textContent = "Please enter a weather question.";
                return;
            }

            const pageText = document.body.innerText;

            // Get city
            const cityMatch = pageText.match(/📍\s*([A-Za-z\s]+)/);
            const city = cityMatch ? cityMatch[1].trim() : "this location";

            // Get temperature
            const tempMatch = pageText.match(/(\d+)°C/);
            const temperature = tempMatch ? tempMatch[1] : "the current";

            // Get rain percentage
            const rainMatch = pageText.match(/Rain:\s*(\d+)%/i);
            const rain = rainMatch ? rainMatch[1] : "unknown";

            if (
                question.includes("rain") ||
                question.includes("raining")
            ) {
                answer.textContent =
                    `🌧️ The current rain probability for ${city} is ${rain}%.`;
            }

            else if (
                question.includes("temperature") ||
                question.includes("hot") ||
                question.includes("degree")
            ) {
                answer.textContent =
                    `🌡️ The current temperature in ${city} is ${temperature}°C.`;
            }

            else if (
                question.includes("weather")
            ) {
                answer.textContent =
                    `🌤️ The current temperature in ${city} is ${temperature}°C with the weather information shown above.`;
            }

            else if (
                question.includes("umbrella")
            ) {
                if (parseInt(rain) >= 30) {
                    answer.textContent =
                        "☔ It may be useful to carry an umbrella because there is a chance of rain.";
                } else {
                    answer.textContent =
                        "☀️ An umbrella may not be necessary based on the current rain probability.";
                }
            }

            else {
                answer.textContent =
                    "🤖 I can answer questions about temperature, rain, weather and umbrella requirements.";
            }
        });
    }


    // Run functions
    updateWeatherAlert();
    setupWeatherGPT();

});
