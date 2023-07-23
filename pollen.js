
var form = document.getElementById('search-form')
var pollenResults = document.getElementById('pollen-results')
var pollenHeadline = document.getElementById('pollenHeader1')
var storedLocation = localStorage.getItem('Location')

//pollenResults.innerHTML = storedLocation
pollenHeadline.innerHTML = `Local Pollen Levels`
pollenResults.innerHTML =" "

var searchBtn = document.getElementById("searchBtn").addEventListener("click", newLocation)

if (storedLocation) {
    storedLocation =
      storedLocation.charAt(0).toUpperCase() + storedLocation.slice(1).toLowerCase()
    localStorage.setItem("Location", storedLocation)
  }

latLongData(storedLocation)

//Retrieves lat and long data from map API
async function latLongData (storedLocation){
    console.log("function triggered")
    try{
        //input user location input to recieve location info
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${storedLocation},US&units=imperial&appid=08ace7633004d5ddf370678a8c052e90`)
        if(res.status !== 200) throw new Error('Location not found')
        pollenHeadline.innerHTML = `Pollen Levels in ${storedLocation}`
        var locationInfo = await res.json() 
        //console.log(locationInfo) //verify info in console
    
        const {
            coord: {
                lat,
                lon
            }
        } = locationInfo

        getPollenInfo(lat,lon)  
    
    } catch(err){
        pollenHeadline.innerHTML = err.message
        return
    } 
}


//Sets new location into storage and calls on function to get lat lon from new location
async function newLocation(){
    var location = document.querySelector('input').value.trim() 
    localStorage.setItem('Location', location)
    latLongData(storedLocation)
}


async function getPollenInfo(lat, lon){
    //use longitude latitude values to access pollen API information
    try{
        const res = await fetch(`https://api.breezometer.com/pollen/v2/forecast/daily?lat=${lat}&lon=${lon}&days=1&key=d8f9dcc96f87425a8e375f4f7ae2c788&features=types_information,plants_information`)
        if(res.status !== 200) throw new Error('Information not found')
        var pollenData = await res.json() 
        console.log(pollenData) //verify info in console
    } catch(err){
        pollenResults.innerHTML = err.message
    } 

    var grassValue = "Not in season"
    var weedValue = "Not in season"
    var treeValue = "Not in season"

    if(pollenData.data[0].types.grass.data_available){
        grassValue = pollenData.data[0].types.grass.index.category
    }
    if(pollenData.data[0].types.tree.data_available){
        treeValue = pollenData.data[0].types.tree.index.category
    }
    if(pollenData.data[0].types.weed.data_available){
        weedValue = pollenData.data[0].types.weed.index.category
    }

    pollenResults.innerHTML = 
    `<p>${`Grass: ${grassValue}`}</p>
    <p>${`Weed: ${weedValue}`}</p>
    <p>${`Tree: ${treeValue}`}</p>`

}
