const searchLocationInput = document.getElementById("searchLocationInput")

// today
const dayName = document.getElementById("dayName");
const dayNumber = document.getElementById("dayNumber");
const todayMonthOfCity = document.getElementById("todayMonthOfCity");

const todayLocation = document.getElementById("todayLocation");
const todayTemp = document.getElementById("todayTemp");
const todayConditionImg = document.getElementById("todayConditionImg");
const todayText = document.getElementById("todayText");

const todayHumidity = document.getElementById("todayHumidity");
const todayWind = document.getElementById("todayWind");
const todayWindDirection = document.getElementById("todayWindDirection");

// tomorrow
const nextDayName = document.getElementById("nextDayName");

const nextConditionImg = document.getElementById("nextConditionImg");
const nextMaxTemp = document.getElementById("nextMaxTemp");
const nextMinTemp = document.getElementById("nextMinTemp");
const nextConditionText = document.getElementById("nextConditionText");


// after tomorrow
const afterNextDayName = document.getElementById("afterNextDayName");

const afterNextConditionImg = document.getElementById("afterNextConditionImg");
const afterNextMaxTemp = document.getElementById("afterNextMaxTemp");
const afterNextMinTemp = document.getElementById("afterNextMinTemp");
const afterNextConditionText = document.getElementById("afterNextConditionText");

document.querySelector("form").addEventListener("click" , (e) => {
    e.preventDefault()
})

searchLocationInput.addEventListener("input" , (e) => {
    let currentValue = e.target.value ;
console.log(currentValue)
    getWeatherData(currentValue) ;
})


navigator.geolocation.getCurrentPosition( (position)=> {
    console.log(position.coords)

    let myLatitude = position.coords.latitude
    let myLongitude = position.coords.longitude

    getWeatherData (`${myLatitude},${myLongitude}`)
})


async function getWeatherData (query) {
    let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=935df76ae91f470da67221403241412&q=${query}&days=3&aqi=no&alerts=no`)
    let data =await res.json()

    console.log(data)

    displayWeatherData (data)
    displayTomorrowData(data)
    displayAfterTomorrowData(data)
}

function displayWeatherData (data) {
    let todayDate = data.current.last_updated;
    console.log(todayDate);

    let myDataName = new Date(todayDate);
    console.log (myDataName);

    dayName.innerHTML = myDataName.toLocaleString("en-us" , {weekday: "long"});

    dayNumber.innerHTML = myDataName.toLocaleDateString("en-us" , {day : "2-digit"})

    todayMonthOfCity.innerHTML = myDataName.toLocaleDateString("en-us" , {month : "long"})

    
    todayLocation.innerHTML = data.location.name ;

    todayTemp.innerHTML = data.current.temp_c ;

    let todayImag = `https:${data.current.condition.icon}`;
    todayConditionImg.setAttribute("src" , todayImag);

    todayText.innerHTML = data.current.condition.text;

    todayHumidity.innerHTML = `${data.current.humidity}%`;
    todayWind.innerHTML = `${data.current.wind_kph}km/h` ;
    todayWindDirection.innerHTML = data.current.wind_dir ;
    
}


function displayTomorrowData (data) {
    let tomorrowDate = data.forecast.forecastday[1] ;
    console.log(tomorrowDate) ;

    let myTommorrowDate = new Date(tomorrowDate.date) ;
 
    nextDayName.innerHTML = myTommorrowDate.toLocaleString("en-us", {weekday : "long"});
    
    let tomorrowImg = `https:${tomorrowDate.day.condition.icon}`;
    nextConditionImg.setAttribute("src" , tomorrowImg) ;

    nextMaxTemp.innerHTML = tomorrowDate.day.maxtemp_c ;
    nextMinTemp.innerHTML = tomorrowDate.day.mintemp_c ;

    nextConditionText.innerHTML = tomorrowDate.day.condition.text

}

function displayAfterTomorrowData (data) {
   let afterTomarrowData = data.forecast.forecastday[2] ;
   console.log(afterTomarrowData)

   let myAfterTomarrowData = new Date (afterTomarrowData.date) ;
   afterNextDayName.innerHTML = myAfterTomarrowData.toLocaleString("en-us" , {weekday : "long"}) ;

   let afterTomarrowImage = `http:${afterTomarrowData.day.condition.icon}`;
   afterNextConditionImg.setAttribute("src" , afterTomarrowImage) ;

   afterNextMaxTemp.innerHTML = afterTomarrowData.day.maxtemp_c ;
   afterNextMinTemp.innerHTML = afterTomarrowData.day.mintemp_c ;

   afterNextConditionText.innerHTML = afterTomarrowData.day.condition.text ;

}




