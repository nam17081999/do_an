// Jav
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            $.ajax({
                method: "get",
                url: `https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&lang=vi&units=metric&exclude=alerts&appid=c1cfab6cee8d1e339c7b4186e7131d99`,
            }).then((data) => {
                showCalendar(data.daily);
            });
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
getLocation();

function showCalendar(data) {
    const dom = document.querySelectorAll(".accordion-item");
    let arrDom = [...dom];
    const options = {
        weekday: "short",
        month: "short",
        day: "numeric",
    };
    const timeCurrent = Date.now();
    arrDom.forEach((item, index) => {
        item.querySelector(
            ".accordion-button"
        ).innerHTML = `<img src="http://openweathermap.org/img/wn/${
        data[index].weather[0].icon}@2x.png"  alt="${data[index].weather[0].main}">${new Date(
        timeCurrent + index * 86400000
      ).toLocaleDateString("en", options)
      }</span>`;
        item.querySelector(
            ".temp"
        ).innerHTML = `<div><span class="weather-label">↑ Temp: </span>${data[index].temp.max}°C</div>
      <div><span class="weather-label">↓ Temp: </span>${data[index].temp.min}°C</div>`;
        item.querySelector(
            ".humidity"
        ).innerHTML = `<div><span class="weather-label">Humidity: </span>${data[index].humidity}%</div>`;
        item.querySelector(
            ".uvi"
        ).innerHTML = `<div><span class="weather-label">UV: </span>${data[index].uvi}</div>`;
    });
}

// ]]>