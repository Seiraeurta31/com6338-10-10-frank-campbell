const apiKey = 'c2d66421775a47b39aa2a5e2b0de6bbe'
var form = document.getElementById('search-form')
var airResults = document.getElementById('air-results')
var airHeadline = document.getElementById('airHeader1')
var storedLocation = localStorage.getItem('Location')
var airResultsDiv = document.getElementById("air-results_div");

if (storedLocation) {
  storedLocation =
    storedLocation.charAt(0).toUpperCase() + storedLocation.slice(1)
  localStorage.setItem("Location", storedLocation)
}

airResults.innerHTML = storedLocation
airHeadline.innerHTML = `Air Quality for ${storedLocation}`

var searchBtn = document.getElementById("searchBtn").addEventListener("click", newLocation)

async function latLongData (storedLocation){
    try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${storedLocation}&units=imperial&appid=c2d66421775a47b39aa2a5e2b0de6bbe`)
    if(res.status !== 200) throw new Error ('Location not found')
    const locationInfo = await res.json()
    console.log(locationInfo)

  } catch (err) {
    airResults.innerHTML = err.message
  }



const displayData = (data) => {

    const location2 = document.createElement('h2')
    const {
        name, 
        country,
        baqi: {aqi_display, color, category, dominant_pollutant}
    } = data
    location2.textContent = `${name}, ${country}`
    airResultsDiv.appendChild(location2)

}

const createAndAppend = (tagName, text) => {
    const element = document.createElement(tagName)
    element.textContent = text
    airResultsDiv.appendChild(element)
  }

  createAndAppend("p", `AQI: ${aqi_display}`)
  createAndAppend("p", `Level: ${color}`)
  createAndAppend("p", `Quality: ${category}`)
  createAndAppend("p", `Dominant Pollutant: ${dominant_pollutant}`)
}

