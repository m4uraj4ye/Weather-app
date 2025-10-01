async function fetchWeather() {
    /* creating links between html and js elements */
    let searchInput = document.getElementById("search").value;
    const weatherDataSection = document.getElementById("weather-data");
    weatherDataSection.style.display = "block";
    weatherDataSection.style ="color: white";
    /* creating api variable, change box below to valid api key */
    const apiKey = "";

    /* alerts user of invalid input */
    if (searchInput == "") {
        weatherDataSection.innerHTML = `
        <div>
            <h2> Empty Input!</h2>
            <p> Please try again with a valid <u> city name </u>.</p>
        </div>
        `;
        return;
    }

    async function getLonAndLat() {
    /* this function gets location long/latitude coordinates from searchInput */
        const countryCode = 44;
        const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.replace(" ", "%20")},${countryCode}&limit=1&appid=${apiKey}`;
        const response = await fetch(geocodeURL);
    /* logs if there is a bad response */
        if (!response.ok) {
            console.log("Bad response! ", response.status);
            return;
        }
    /*data object for geocodes */
        const data = await response.json();
    /* if API call unsuccessful the data/JSON element will be empty and will alert user of invalid input */
        if (data.length == 0) {
            console.log("Something went wrong here");
            weatherDataSection.innerHTML = `
            <div>
            <h2> Invalid Input: "${searchInput}"</h2>
            <p>Please try again with a valid <u> city name</u>.</p>
            </div>
            `;
            return;
    /*if successful data will be stored in first element of JSON/data element */
        } else {
            return data[0];
        }
        }
    

    async function getWeatherData(lon, lat) {
    /* this function gets weather data for the coordinates found with previous function */
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const response = await fetch(weatherURL);
    /* logs an error message if problem fetching data */   
        if (!response.ok) {
            console.log("Bad response! ", response.status);
            return;
        }
    /* data object for the current weather data */
        const data = await response.json();

    /* displays weather info data from function to html page */
    weatherDataSection.style.display ="flex";
    weatherDataSection.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width="100" />
    <div>
    <h2>${data.name}</h2>
    <p><strong>Temperature:</strong> ${Math.round(data.main.temp - 273.15)}&deg;C</p>
    <p><strong>Description:</strong> ${data.weather[0].description}</p>
    </div>
    `;
    }
/* resetting search value to blank after function called */
    document.getElementById("search").value = "";
/* variable holding long/latitude data from getLonAndLat() function */
    const geocodeData = await getLonAndLat();
/* use getWeatherData function to pass on the lon and lat properties in geocodeData variable */
    getWeatherData(geocodeData.lon, geocodeData.lat);

}

/* async function coatQuery(fetchWeather) {
        const response = await fetchWeather();
        if (!response.ok) {
            console.error("Error:", error);
            return;
        } 
        const data = response.json();

        const coatQuerySection = document.getElementById("coat-query");
        coatQuerySection.style.display = "block";
        coatQuerySection.style ="color: white";
        coatQuerySection.innerHTMl = "<h3> Will you need a jacket today? </h3>";
        if (data.main.temp - 273.15 < 13) {
            coatQuerySection.innerHTML = `
            <h4> Very likely! </h4>`;
        } else if (data.main.temp - 273.15 >= 13 && data.main.temp - 273.15 < 17) {
            coatQuerySection.innerHTML = `
            <h4> Likely! </h4>`;  
        } else if (data.main.temp - 273.15 >=17 && data.main.temp - 273.15 <= 20) {
            coatQuerySection.innerHTML = `
            <h4> Unlikely! </h4>`;
        } else {
            coatQuerySection.innerHTMl = `
            <h4> Very unlikely! </h4>`;    
        }
    }
*/