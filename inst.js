const submitBtn1=document.getElementById('submitBtn1')
const City=document.getElementById('city')
const resultsSection=document.getElementById('resultsSection')
const resultsSectionCity=document.getElementById('resultsSectionCity')
const errorParagraph = document.getElementById("error")
const resultsSection2 = document.getElementById("resultsSection2")

const PROXY_URL = "https://cors-anywhere.herokuapp.com"
const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5"
const API_KEY = "7fc8999a9dbd721d06a3a9aa09c5b2d0"

//const displayWeather = weatherData => {
    //resultsSection2.innerHTML = JSON.stringify(weatherData, null, 2)
    //var myObj = JSON.parse(weatherData, null, 2)
    //resultsSection2.innerHTML = myObj.dt;

//}

const displayError = error => {
  errorParagraph.innerHTML = error
}







const submitCity = function(event){
    // prevents form from reloading
    event.preventDefault()
    //clean ups results
    //resultsTable.innerHTML =""
   
    //console.log(event, event.target)
   //console.log(input.value)
  
  //populates results again
  const weatherValue = City.value
  resultsSectionCity.innerHTML=weatherValue;
  resultsSection2.innerHTML="";
/*
  const ColResult = document.createElement("h3")
  ColResult.setAttribute("id","resultsSectionCity")
  ColResult.innerHTML = weatherValue
  //resultsSection.replaceWith(ColResult)
  resultsSectionCity.replaceWith(ColResult)
  */

  fetch(`${PROXY_URL}/${BASE_WEATHER_URL}/weather?q=${weatherValue}&appid=${API_KEY}`, {
    method: "GET",
  })
    .then(response => {
      if (!response.ok) {
        return response.json().then(({ message }) => {
          throw new Error(message || response.status);
        })
      }
      return response.json()
    })
    .then(json => {
      console.log(json)
      var datetimeSunrise = new Date(1000 * json.sys.sunrise);
      var hourSunrise = datetimeSunrise.getHours();
      var minuteSunrise = datetimeSunrise.getMinutes();
      var datetimeSunset = new Date(1000 * json.sys.sunset);
      var hourSunset = datetimeSunset.getHours();
      var minuteSunset = datetimeSunset.getMinutes();

      resultsSection2.innerHTML = "Wind speed:<font color=\"red\"> " +json.wind.speed + "</font>"+
      "<br>" +"General:<font color=\"red\"> "+json.weather[0].main + "</font>"+
      "<br>" +"Description:<font color=\"red\"> "+json.weather[0].description+ "</font>"+
      "<br>" +"Temperature:<font color=\"red\"> " +(json.main.temp-273.15).toFixed(2)+ "C</font>"+
      "<br>" +"Feels_like:<font color=\"red\"> " +(json.main.feels_like-273.15).toFixed(2)+ "C</font>"+
      "<br>" +"Min:<font color=\"red\"> " +(json.main.temp_min-273.15).toFixed(2)+ "C</font>"+
      "<br>" +"Max:<font color=\"red\"> " +(json.main.temp_max-273.15).toFixed(2)+ "C</font>"+
      "<br>" +"Sunrise:<font color=\"red\"> " +hourSunrise+":"+minuteSunrise +"</font>"+
      "<br>" +"Sunset:<font color=\"red\"> " +hourSunset+":"+minuteSunset +"</font>";

      
    })
    .catch(error => {
      console.log("Something went wrong: ", error)
      displayError(error.message)
    })


    }

    submitBtn1.onclick = submitCity
