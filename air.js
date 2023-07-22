const apiKey = 'c2d66421775a47b39aa2a5e2b0de6bbe'
var form = document.getElementById('search-form')
var airResults = document.getElementById('air-results')
var airHeadline = document.getElementById('airHeader1')
var storedLocation = localStorage.getItem('Location')

airResults.innerHTML = storedLocation
airHeadline.innerHTML = `Air Quality for ${storedLocation}`
 
var searchBtn = document.getElementById("searchBtn").addEventListener("click", newLocation)
latLongData(storedLocation)

async function latLongData (storedLocation){
    console.log("triggered")

    try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${storedLocation}&units=imperial&appid=c2d66421775a47b39aa2a5e2b0de6bbe`)
    if(res.status !== 200) throw new Error ('Location not found')
    const locationInfo = await res.json()
    console.log(locationInfo)

  } catch (err) {
    airResults.innerHTML = err.message
  }
}