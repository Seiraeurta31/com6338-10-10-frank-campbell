//.......Start Main Page........

var form = document.getElementById('form')
var pollenBtn = document.getElementById("pollenButton").addEventListener("click", processInput)
var airQBtn = document.getElementById("airButton").addEventListener("click", processInput)

async function processInput (e){
    e.preventDefault() 
    var location = document.querySelector('input').value.trim() 
    if(!location) return

    localStorage.setItem('Location', location)
    
    try{
        //input user location input to recieve location info
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=08ace7633004d5ddf370678a8c052e90`)
        const locationInfo = await res.json() 
        console.log(locationInfo) //verify info in console

        //format data for lat long data
        formatLocationInfo(locationInfo)

    } catch(err){
        form.locationSearch.value = ""
    } 

    //validates user button choice
    if(this.id == "pollenButton"){
        //switches to pollen page
        window.location.href="pollen.html"
    }
    else{
        //switches to air quality page
        window.location.href="air.html"
    }
}

//format and retrieves lat and long from json data
async function formatLocationInfo(locationInfo){
    //***enter code HERE to isolate lat and long values from location data */
    const lat = ""
    const long = ""

    //store location in local storage
    localStorage.setItem('LocationLat', lat)
    localStorage.setItem('LocationLong', long)
   
}


//.......End Main Page........



//.......Start Pollen Page........




//.......End Pollen Page........






//.......Start Air Quality Page........




//.......End Air Quality Page........