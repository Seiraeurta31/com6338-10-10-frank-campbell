//const apiKey = 'c2d66421775a47b39aa2a5e2b0de6bbe'
var form = document.getElementById('search-form')
var ResultsOfAQ = document.getElementById('air-results')
var airTop = document.getElementById('airTop')
var storedLocation = localStorage.getItem('Location')
var lat = localStorage.getItem('LocationLat')
var lon = localStorage.getItem('LocationLon')
var searchPlaceholder = document.getElementById('allergySearch')

airTop.innerHTML = `Air Quality`
ResultsOfAQ.innerHTML =" "


//set new search buton and confirm if button id exists before adding event listner
var searchBtn = document.getElementById("searchBtn")
if(searchBtn){
    searchBtn.addEventListener("click", newLocation)
}

//set new search buton and confirm if button id exists before adding event listner
if (storedLocation) {
  storedLocation =
    storedLocation.charAt(0).toUpperCase() + storedLocation.slice(1)
  localStorage.setItem("Location", storedLocation)
}

//Call function to get Pollen info with stored lat/long data
getAirInfo(lat, lon)


async function newLocation(e){
  e.preventDefault() 
   
  //Take in user input with new search, format it, store it, then convert to new lat/long
  var newLocation = document.querySelector('input').value.trim() 
  newLocation = newLocation.charAt(0).toUpperCase() + newLocation.slice(1).toLowerCase()
  localStorage.setItem('Location', newLocation)
  storedLocation = localStorage.getItem('Location')
  
  await longLat(storedLocation)

  //Access new lat/long data saved to localStorage, then access pollen info for location
  lat = localStorage.getItem('LocationLat')
  lon = localStorage.getItem('LocationLon')
  
  //Get Air Quality information
  getAirInfo(lat, lon)

}

async function getAirInfo(lat, lon){

  //********reset info to get ready for other info?******
  searchPlaceholder.value = ""
  airTop.innerHTML = `Air Quality in ${storedLocation}`

  try{
    const res = await fetch(
      `https://api.breezometer.com/air-quality/v2/current-conditions?lat=${lat}&lon=${lon}&key=c2d66421775a47b39aa2a5e2b0de6bbe&features=breezometer_aqi,local_aqi,health_recommendations,sources_and_effects,pollutants_concentrations,pollutants_aqi_information`
    )
    if (res.status !== 200) throw new Error('Information not found')
    
    var dataAq = await res.json()
  }catch(err){
    ResultsOfAQ.innerHTML = err.message
  }

  ResultsOfAQ.innerHTML = 
  `<p>${`Air Quality Index: ${dataAq.data.indexes.baqi.aqi_display}`}</p>
    <p>${`Level: ${dataAq.data.indexes.baqi.category}`}</p>
     <p>${`Dominant Pollutant: ${dataAq.data.indexes.baqi.dominant_pollutant}`}</p>`

}
