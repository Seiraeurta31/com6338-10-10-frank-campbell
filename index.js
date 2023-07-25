
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


//take in user info, format location and convert to lat long data
async function processInput (e){
    console.log("button triggered")
    localStorage.setItem('locationError', false)
    e.preventDefault() 
    var location = document.querySelector('input').value.trim() 
    if(!location) return

    location =location.charAt(0).toUpperCase() + location.slice(1).toLowerCase()
    localStorage.setItem('Location', location)
    
    try{
      //get lat/lon data from user input
      var error = await longLat(location)
      console.log("returned to lat lon")
      console.log ("error " + error)
      if(error) throw new Error(err)
      //catch error if location not found
      
      console.log("pages triggered")
      if(this.id == "pollenButton"){
        console.log("pages triggered")
        //switches to pollen page
        window.location.href="pollen.html"
      }
      else{
          //switches to air quality page
          window.location.href="air.html"
      }

    }catch(err){
      console.log("error caught2")
      if(error){
        instructions.innerHTML = "Location Not Found"
        form.locationSearch.value = "" 
        return
    }
      
}           
    console.log("error status " + error)
  
}


//get lat long from user location input
async function longLat (storedLocation){
  console.log("lat/long triggered")
  console.log("storedLocation : " + storedLocation)
  localStorage.setItem('locationError', false)

    try{
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${storedLocation},US&units=imperial&appid=08ace7633004d5ddf370678a8c052e90`
    )
    console.log(res.status)
    if(res.status !== 200) throw new Error(err)
    var locationInfo = await res.json()
    
     const {
       coord: { 
        lat,
        lon 
    }
     } = locationInfo

    //  getAirInfo(lat, lon)

    console.log("index lat long : " + lat + ", " + lon)
    localStorage.setItem('LocationLat', lat)
    localStorage.setItem('LocationLon', lon)
    console.log ("index saved new lat long " + lat + ", " + lon)

    console.log(lat + ", " + lon)

    } catch (err) {
      console.log("error caught1")
      localStorage.setItem('locationError', true)
      locationError = localStorage.getItem('locationError')
      console.log("location error " + locationError)
      return locationError
    }  
}

