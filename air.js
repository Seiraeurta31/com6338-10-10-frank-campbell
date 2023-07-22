const apiKey = 'c2d66421775a47b39aa2a5e2b0de6bbe'

var form = document.getElementById('search-form')
var airResults = document.getElementById('air-results')
var airHeadline = document.getElementById('airHeader1')
var storedLocation = localStorage.getItem('Location')

airResults.innerHTML = storedLocation
airHeadline.innerHTML = `Air Quality`


//var searchInput = document.getElementById("air-search")
//const locationName = document.getElementById("locationName")
// const resultsContainer = document.querySelector(".allergy-results")
//const storedLocation = localStorage.getItem('Location')

// Event listener for form submission

//const form = document.querySelector('.search-form')
//form.addEventListener('submit', processInput)

// Call function to check if location is stored in local storage and display data
//getLatLonFromStorage()
 
var searchBtn = document.getElementById("searchBtn").addEventListener("click", newLocation)


async function newLocation() {
  var location = document.getElementById("air-search").value.trim()
  if (!location) return
  
  localStorage.setItem('Location', location)
  await latLongData(location)
}

async function latLongData (storedLocation){
    console.log("triggered")

    try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${storedLocation}&units=imperial&appid=c2d66421775a47b39aa2a5e2b0de6bbe`)
    if(res.status !== 200) throw new Error ('Location not found')
    airHeadline.innerHTML = `Air Quality for ${storedLocation}`
    const locationInfo = await res.json()
    console.log(locationInfo)

  } catch (err) {
    airResults.innerHTML = err.message
  }
}


/*
async function formatLocationInfo(locationInfo){
    const lat = ""
    const long = ""
// const lat = locationInfo.coord.lat
  // const long = locationInfo.coord.lon

   localStorage.setItem('LocationLat', lat)
    localStorage.setItem('LocationLong', long)
   
}

// Function to retrieve latitude and longitude from local storage
function getLatLonFromStorage() {
  const lat = localStorage.getItem('LocationLat')
  const lon = localStorage.getItem('LocationLong')
  const location = localStorage.getItem('Location')

  if (lat && lon && location) {
    searchInput.value = location
    processInput()
  }
}

//const storedLocation = localStorage.getItem('Location')

// Event listener for form submission

//const form = document.querySelector('.search-form')
//form.addEventListener('submit', processInput)

// Call function to check if location is stored in local storage and display data
//getLatLonFromStorage()



/* // Function to fetch air quality data based on location
async function fetchAirQualityData(location) {}

localStorage.setItem("airQualityData", JSON.stringify(values));

// Function to handle the form submission
function handleFormSubmit(event) {
  event.preventDefault();
  const location = locationInput.value.trim();
}

// Function to load previous search data from local storage
function loadPreviousSearchData() {
  const location = localStorage.getItem("location");
}

// Load previous search data on page load
document.addEventListener();

// Attach the form submission event listener  ??
form.addEventListener("submit", handleFormSubmit);
