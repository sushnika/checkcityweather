const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const errorE1 = document.getElementById("error");
const weather = document.getElementById("weather");
document.getElementById("city").addEventListener("keydown", function () {
  if (event.key === "Enter") {
    document.getElementById("search").click();
  }
});

document.getElementById("search").addEventListener("click", function () {
  const city = document.getElementById("city").value.trim();
  if (city === "") {
    alert("please enter a valid city name");
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4a35caaa0f6b976aea60ccd6ae45977a`
  )
    .then(function (res) {
      if (!res.ok) {
        throw new Error("City Not Found: Enter a Valid City Name");
      }
      return res.json();
    })
    .then(function (data) {
      cityName.innerText = `City You Entered: ${data.name}`;
      const tempCelsius = data.main.temp - 273.15;
      temp.innerText = `Temperature: ${tempCelsius.toFixed(1)} °C`;
      weather.innerText = `Weather: ${data.weather[0].description}`;
      console.log(data);
    })
    .catch(function (error) {
      errorE1.innerText = error.message;
    });
});

document.getElementById("refresh-icon").addEventListener("click", function () {
  document.getElementById("city").value = "";
  cityName.innerText = "";
  temp.innerText = "";
  weather.innerText = "";
  errorE1.innerText = " ";
});
