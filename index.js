
var form = document.getElementById('form')
var inputBox = document.getElementById('formTextBox')
var pollenBtn = document.getElementById("pollenButton")
var airQBtn = document.getElementById("airButton")
var instructions = document.getElementById('searchInstructions')

if(pollenBtn){
    pollenBtn.addEventListener("click", processInput)
}
if(airQBtn){
    airQBtn.addEventListener("click", processInput)
}

//Take in user info, format location and convert to lat long data
async function processInput (e){
    e.preventDefault() 
    var location = document.querySelector('input').value.trim() 
    if(!location) return

    //Format input
    location =location.charAt(0).toUpperCase() + location.slice(1).toLowerCase()
    localStorage.setItem('Location', location)
    
    try{
      //Attempt to get lat/lon data, returns true if error exists
      var error = await longLat(location)
     
      //Catch error if location not found
      if(error) throw new Error(err)

      //If lat.long data exists, switch to corosponding page
      if(this.id == "pollenButton"){
        window.location.href="pollen.html"
      }
      else{
          window.location.href="air.html"
      }
 
    }catch(err){
        instructions.innerHTML = "Location Not Found"
        form.locationSearch.value = "" 
        return
    }     
}           


//Get lat/long from user location input
async function longLat (storedLocation){

    // try to retrieve lat/long info using stored location
    try{
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${storedLocation},US&units=imperial&appid=08ace7633004d5ddf370678a8c052e90`
    )
    if(res.status !== 200) throw new Error(err)
    var locationInfo = await res.json()

    //Location found, no error exists
    localStorage.setItem('locationError', false)

     const {
       coord: { 
        lat,
        lon 
    }
     } = locationInfo

    //Store lat/long data to access on other pages
    localStorage.setItem('LocationLat', lat)
    localStorage.setItem('LocationLon', lon)

    } catch (err) {
      //Error exists. Set stored error value to true on other pages
      localStorage.setItem('locationError', true)
      locationError = localStorage.getItem('locationError')

      //Remove lat/long data to avoid using stored values in error on other pages
      localStorage.removeItem('LocationLat')
      localStorage.removeItem('LocationLon')
      return locationError // returns true
    }  
}