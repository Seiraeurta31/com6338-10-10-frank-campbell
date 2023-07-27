//const apiKey = 'c2d66421775a47b39aa2a5e2b0de6bbe'
var form = document.getElementById('search-form')
var ResultsOfAQ = document.getElementById('air-results')
var airTop = document.getElementById('airTop')
var storedLocation = localStorage.getItem('Location')
var lat = localStorage.getItem('LocationLat')
var lon = localStorage.getItem('LocationLon')
var searchPlaceholder = document.getElementById('allergySearch')

//Set default values for results display, clear any previous content
airTop.innerHTML = ""
ResultsOfAQ.innerHTML =""

//Set new search buton and confirm if button id exists before adding event listner
var searchBtn = document.getElementById("searchBtn")
if(searchBtn){
  searchBtn.addEventListener("click", newLocation)   // When the button is clicked, the newLocation function will be called
}

//Format user input from main into proper capitalization
if (storedLocation) {
  storedLocation =
    storedLocation.charAt(0).toUpperCase() + storedLocation.slice(1)     // Capitalize the first letter of the location and store it back in storedLocation
  localStorage.setItem("Location", storedLocation)
}

//Fetch and display the air quality information with stored lat/long data
getAirInfo(lat, lon)


//Set new search location into storage and call on function to get lat lon from new location. It is called when the user submits a new location search.
async function newLocation(e){
  e.preventDefault()    //Prevent the default form submission behavior, to avoid page from reloading

  //When new search is entered, format it, store it, then convert to new lat/long
  var newLocation = document.querySelector("input").value.trim()
  newLocation =
    newLocation.charAt(0).toUpperCase() + newLocation.slice(1).toLowerCase()

  localStorage.setItem("Location", newLocation)     // Store new location in the browser's local storage, update stored location
  storedLocation = localStorage.getItem("Location")    // Retrieve the updated location from local storage. add to stored location

  //Retrieve lat/long data from index.js
  var error = await longLat(storedLocation)

  if (error) {
    airTop.innerHTML = "Location Not Found"
    ResultsOfAQ.innerHTML = ""       // Set an empty string, cleare previous results displayed
    searchPlaceholder.value = ""
    return
  }

  //Access new lat/long data saved to localStorage, then access AQ info for location
  lat = localStorage.getItem("LocationLat")
  lon = localStorage.getItem("LocationLon")

  //Get Air Quality information for the new location
  getAirInfo(lat, lon)
}

  // Fetch AQ info based on provoded lat and lon
async function getAirInfo(lat, lon){
  //Reset input field to empty, clear the input after a search
  searchPlaceholder.value = ""

  // Fetch air quality information from the BreezoMeter API
  try {
    const res = await fetch(
      `https://api.breezometer.com/air-quality/v2/current-conditions?lat=${lat}&lon=${lon}&key=c2d66421775a47b39aa2a5e2b0de6bbe&features=breezometer_aqi,local_aqi,health_recommendations,sources_and_effects,pollutants_concentrations,pollutants_aqi_information`
    )

    //Error thrown if invalid
    if (res.status !== 200) throw new Error("Information not found")
    var dataAq = await res.json()

    //Display data 
    airTop.innerHTML = `Air Quality Levels in ${storedLocation}`

    ResultsOfAQ.innerHTML = 
      `<p>${`Air Quality Index: ${dataAq.data.indexes.baqi.aqi_display}`}</p>
       <p>${`Level: ${dataAq.data.indexes.baqi.category}`}</p>
       <p>${`Dominant Pollutant: ${dataAq.data.indexes.baqi.dominant_pollutant}`}</p>`
  } 
  catch (err) {
    ResultsOfAQ.innerHTML = ""
    airTop.innerHTML = "Location Not Found"
    return
  }

}