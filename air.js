//const apiKey = 'c2d66421775a47b39aa2a5e2b0de6bbe'
var form = document.getElementById('search-form')
var ResultsOfAQ = document.getElementById('air-results')
var airTop = document.getElementById('airTop')
var storedLocation = localStorage.getItem('Location')

airTop.innerHTML = `Air Quality`
ResultsOfAQ.innerHTML =" "

var searchBtn = document.getElementById("searchBtn").addEventListener("click", newLocation)

if (storedLocation) {
  storedLocation =
    storedLocation.charAt(0).toUpperCase() + storedLocation.slice(1)
  localStorage.setItem("Location", storedLocation)
}


longLat(storedLocation)

async function longLat (storedLocation){
    try{
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${storedLocation},US&units=imperial&appid=08ace7633004d5ddf370678a8c052e90`
    )
    if(res.status !== 200) throw new Error('Location not found')
    airTop.innerHTML = `Air Quality in ${storedLocation}`
    var locationInfo = await res.json()

     const {
       coord: { 
        lat,
        lon 
    }
     } = locationInfo

     getAirInfo(lat, lon)

  } catch (err) {
    airTop.innerHTML = err.message
    return
  }
}

async function newLocation(){
  var location = document.querySelector('input').value.trim()
  
  localStorage.setItem('Location', location)
 
}

async function getAirInfo(lat, lon){
  try{
    const res = await fetch(
      `https://api.breezometer.com/air-quality/v2/current-conditions?lat=${lat}&lon=${lon}&key=c2d66421775a47b39aa2a5e2b0de6bbe&features=breezometer_aqi,local_aqi,health_recommendations,sources_and_effects,pollutants_concentrations,pollutants_aqi_information`
    )
    if (res.status !== 200) throw new Error('Information not found')
    var dataAq = await res.json()
    

  ResultsOfAQ.innerHTML = 
  `<p>${`Air Quality Index: ${dataAq.data.indexes.baqi.aqi_display}`}</p>
    <p>${`Level: ${dataAq.data.indexes.baqi.category}`}</p>
     <p>${`Dominant Pollutant: ${dataAq.data.indexes.baqi.dominant_pollutant}`}</p>`

  }
catch(err){
    ResultsOfAQ.innerHTML = err.message
  }
}
