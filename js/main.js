// --------------------------------------------------------Today's Card Variables-------------------------------------------------------------
let today = document.getElementById("today"),
    todayDate = document.getElementById("todayDate"),
    todayDegree = document.getElementById("todayDegree"),
    todayIcon = document.getElementById("todayIcon"),
    searchBar = document.getElementById("search-bar"),
    wind = document.getElementById("wind"),
    zlocation = document.getElementById("location"),
    description = document.getElementById("today-description"),
    humidty = document.getElementById("humidty"),
    compass = document.getElementById("compass");
    

 //------------------------------------------------------------Next Days Variables------------------------------------------------------------
let nextDay = document.getElementsByClassName("nextDay"),
nextDayIcon = document.getElementsByClassName("nextDayIcon"),
nextDayDescription = document.getElementsByClassName("nextDay-description"),
maxDegree = document.getElementsByClassName("maxDegree"),
minDegree = document.getElementsByClassName("minDegree"),
apiResponse,
dataResponse,
monthName = 
['January','February','March','April','May','June','July','Augest','September','October','Novmber','December'],
   days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
];




  //----------------------------------------------------------------- Data from API--------------------------------------------------
async function getWeatherData(currentCity='alexandria'){
  apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentCity}&days=3`)
  dataResponse= await apiResponse.json()
  console.log(dataResponse)
  todayWeather();
  nextDayWeather()
}
getWeatherData();



function todayWeather(){

 let date =new Date();
 console.log(date)
 today.innerHTML= days[date.getDay()];
 todayDate.innerHTML = `${date.getDate()} ${ monthName[date.getMonth()]}`;
 zlocation.innerHTML =  dataResponse.location.name;
 todayDegree.innerHTML = dataResponse.current.temp_c;
 todayIcon.setAttribute("src",`https:${dataResponse.current.condition.icon}`)
 description.innerHTML = dataResponse.current.condition.text;
 humidty.innerHTML = dataResponse.current.humidity;
 wind.innerHTML = dataResponse.current.wind_kph;
 compass.innerHTML =dataResponse.current.wind_dir;

}

function nextDayWeather(){
  for( let i=0; i<nextDay.length;i++){
    nextDay[i].innerHTML= days[new Date(dataResponse.forecast.forecastday[i+1].date).getDay()];
   nextDayIcon[i].setAttribute('src',`https:${dataResponse.forecast.forecastday[i+1].day.condition.icon}`)
   maxDegree[i].innerHTML = dataResponse.forecast.forecastday[i+1].day.maxtemp_c;
   minDegree[i].innerHTML =dataResponse.forecast.forecastday[i+1].day.mintemp_c;
   nextDayDescription[i].innerHTML =dataResponse.forecast.forecastday[i+1].day.condition.text;
  }
}
searchBar.addEventListener("keyup",function(){
  currentCity= searchBar.value;
 console.log( currentCity);
getWeatherData(currentCity);
})


