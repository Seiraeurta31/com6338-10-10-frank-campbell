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
}


const displayData = (data) => {
    // city = ""
    // search.value = ''
    // localStorage.getItem('city', JSON.stringify(data));
  
    //show city

    const location2 = document.createElement('h2')
    const {
        name, 
        baqi: {aqi_display, color, category, dominant_pollutant}
    } = data
    location2.textContent = `${name}, ${country}`

}

const aqi_display = document.createElement("p")
const aqi_displayNow = aqi_display
aqi_display.textContent = `AQI: ${aqi_displayNow}`
airResultsDiv.appendChild(aqi_display)

const color = document.createElement('p')
const colorNow = color
color.textContent = `Level: ${colorNow}`
airResultsDiv.appendChild(color)

const category = document.createElement('p')
const categoryNow = category
category.textContent = `Quality: ${categoryNow}`
airResultsDiv.appendChild(category)

const dominant_pollutant = document.createElement('p')
const dominant_pollutantNow = dominant_pollutant
dominant_pollutant.textContent = `Dominant Pollutant: ${dominant_pollutantNow}`
airResultsDiv.appendChild(dominant_pollutant)





/*  form.addEventListener("submit", function (e) {
   e.preventDefault()
   const location = document.getElementById("air-search").value.trim()
   if (!location) {
     airResults.innerHTML = "<p>Please enter a location</p>"
     return
   }
   fetch(
     `ttps://api.breezometer.com/air-quality/v2/current-conditions?lat={latitude}&lon={longitude}&key=YOUR_API_KEY&features={Features_List}`
   )
     .then(function (res) {
       if (!res.ok) {
         throw new Error("Location not found")
       }
       return res.json()
     })
     .then(function (data) {
       console.log(data)
       airResults.innerHTML = ""               // Clear existing content
       locationName.textContent = location
       displayAirQualityData(data)
     })
     .catch(function (err) {
       airResults.innerHTML = err.message
     })
 })






  function broadcast(data) {
    airResults.innerHTML = ""
    var city = this.search.value.trim()
    var city = document.createElement('h2')
    city.textContent = data.name + ", " + data.sys.country
    airResults.appendChild(city)
}

var lat = data.coord.lat
var lon = data.coord.lon

async function fetchAirQualityData(lat, lon) {
  try {
    const response = await fetch(
      `${apiUrl}?lat=${lat}&lon=${lon}&key=${apiKey}`
    );
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching air quality data:", error)
    throw error
  }
}
*/

