$(function() {
    var socket = io("namtuoc.herokuapp.com")
    socket.on('connected', (msg) => {
        console.log("connected")
    });
    socket.on('sensor', (msg) => {
        document.getElementById("cambien").innerHTML = msg.message;
    });
    socket.on('nd_khach', (msg) => {
        // document.getElementById("nd_khach").innerHTML = msg.message;
        let data = msg.message.split(",")
        console.log(data[0])
        console.log(data[1])
        document.getElementById("da_khach").innerHTML = data[1];
        document.getElementById("ndp_khach").innerHTML = data[0];
    });
    socket.on('nd_ngu', (msg) => {
        // document.getElementById("nd_ngu").innerHTML = msg.message;
        let data = msg.message.split(",")
        console.log(data[0])
        console.log(data[1])
        document.getElementById("da_ngu").innerHTML = data[1];
        document.getElementById("ndp_ngu").innerHTML = data[0];
    });

    function ten(e) {
        socket.emit('arduino', {})
        console.log("nhan")
    }
    function denkhach(e) {
        socket.emit('den_khach', {})
        console.log("nhan_den_khach")
    }
    function quatkhach(e) {
        socket.emit('quat_khach', {})
        console.log("nhan_den_khach")
    }
    function hutmui(e) {
        socket.emit('hut_mui', {})
        console.log("nhan_den_khach")
    }
    // function denkhach(e) {
    //     socket.emit('den_khach', {})
    //     console.log("nhan_den_khach")
    // }
    // function denkhach(e) {
    //     socket.emit('den_khach', {})
    //     console.log("nhan_den_khach")
    // }

    $('.den_khach').on("change", denkhach)
    socket.on('den_khach', (msg) => {
        console.log($('.den_khach'))
        $('.den_khach')[0].checked = !!(msg.message - 0)
    });
    $('#quat_khach').on("change", quatkhach)
    socket.on('quat_khach', (msg) => {
        console.log($('#quat_khach'))
        $('#quat_khach')[0].checked = !!(msg.message - 0)
    });
    $('#hut_mui').on("change", hutmui)
    socket.on('hut_mui', (msg) => {
        console.log($('#hut_mui'))
        $('#hut_mui')[0].checked = !!(msg.message - 0)
    });
});

// Jav
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            $.ajax({
                method: "get",
                url: `https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&lang=vi&units=metric&exclude=alerts&appid=d02ad85bc955b07b0adad6de67f6be7e`,
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
        month: "numeric",
        day: "numeric",
    };
    const timeCurrent = Date.now();
    arrDom.forEach((item, index) => {
        item.querySelector(
            ".accordion-button"
        ).innerHTML = `<img src="http://openweathermap.org/img/wn/${data[index].weather[0].icon}@2x.png"  alt="${data[index].weather[0].main}">${new Date(
            timeCurrent + index * 86400000
        ).toLocaleDateString("vi", options)
            }</span>`;
        item.querySelector(
            ".temp"
        ).innerHTML = `<div><span class="weather-label">Max: </span>${data[index].temp.max}°C</div>
      <div><span class="weather-label">Min: </span>${data[index].temp.min}°C</div>`;
        item.querySelector(
            ".humidity"
        ).innerHTML = `<div><span class="weather-label">Độ Ẩm: </span>${data[index].humidity}%</div>`;
        item.querySelector(
            ".uvi"
        ).innerHTML = `<div><span class="weather-label">UV: </span>${data[index].uvi}</div>`;
    });
}

const tabs = document.querySelector(".wrapper");
const tabButton = document.querySelectorAll(".tab-button");
const contents = document.querySelectorAll(".content");

tabs.onclick = (e) => {
    // console.log(e.target)
    const id = e.target.dataset.id;
    if (id) {
        tabButton.forEach((btn) => {
            btn.classList.remove("active");
        });
        e.target.classList.add("active");

        contents.forEach((content) => {
            content.classList.remove("active");
        });
        const element = document.getElementById(id);
        element.classList.add("active");
    }
};

const tabs2 = document.querySelector(".wrapper2");
const tabButton2 = document.querySelectorAll(".tab-button2");
const contents2 = document.querySelectorAll(".content2");

tabs2.onclick = (e) => {
    // console.log(e.target)
    const id = e.target.dataset.id;
    if (id) {
        tabButton2.forEach((btn) => {
            btn.classList.remove("active");
        });
        e.target.classList.add("active");

        contents2.forEach((content) => {
            content.classList.remove("active");
        });
        const element = document.getElementById(id);
        element.classList.add("active");
    }
};

