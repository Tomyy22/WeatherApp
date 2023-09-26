const result = document.querySelector('.result');
const form = document.querySelector('.get-weather')
const nameCity = document.querySelector('#city')
const nameCountry = document.querySelector('#country')
const toggle = document.querySelector(".toggle");

toggle.addEventListener("click", (e) => {
    const html = document.querySelector("html");
    html.classList.toggle("dark");
  
    if (html.classList.contains("dark")) {
      e.target.innerHTML = "Light mode";
    } else {
      e.target.innerHTML = "Dark mode";
    }
  }); 


 form.addEventListener('submit', (e) => {
     e.preventDefault();

     if(nameCity.value ==="" || nameCountry.value ===""){
        showError('Ambos campos son obligatorios');
        return;
     }

     callAPI(nameCity.value, nameCountry.value)
})

function callAPI(city, country){
    const apiId = '93cfe5049c56cd767444fd72437694a6';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`

    fetch(url)
        .then(data => {
            return data.json()
        })
        .then(dataJSON =>{
            if(dataJSON.cod == '404'){
                showError('Ciudad no encontrada');
            }
            else{
                clearHTML();
                showWeather(dataJSON);
            }
            console.log(dataJSON);
        })
        .catch(error =>{
            console.log(error);
        })
}

function showWeather(data){
    const {name, main:{feels_like,humidity,temp, temp_min,temp_max}, weather:[arr]}= data;

    const degrees = kelvinToCelsius(temp);
    const minDegrees = kelvinToCelsius(temp_min);
    const maxDegrees = kelvinToCelsius(temp_max);
    const feelsDegress = kelvinToCelsius(feels_like);

    const content = document.createElement('div');
    content.innerHTML = `
        <h5>Clima en ${name}</h5>
        <h2>${degrees}°</h2>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="info-weather">
        <p>Max: ${maxDegrees}°</p>
        <p>Min: ${minDegrees}°</p>
        <p>Sensacion Termica: ${feelsDegress}°</p>
        <p>Humedad: ${humidity}%</p>
    `;

    result.appendChild(content);
}

function showError(message){
    console.log(message);
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(()=>{
        alert.remove();
    },2000);
}

function kelvinToCelsius(temp){
    return parseInt(temp - 273.15);
}

function clearHTML(){
    result.innerHTML = ``;
}

