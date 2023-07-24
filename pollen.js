
var form = document.getElementById('search-form')
var pollenResults = document.getElementById('pollen-results')
var pollenHeadline = document.getElementById('pollenHeader1')
var storedLocation = localStorage.getItem('Location')
var searchPlaceholder = document.getElementById('allergySearch')
var lat = localStorage.getItem('LocationLat')
var lon = localStorage.getItem('LocationLon')


//set new search buton and confirm if button id exists before adding event listner
var searchBtn = document.getElementById("searchBtn")
if(searchBtn){
    searchBtn.addEventListener("click", newLocation)
}

//Format user input to proper capitalization
if(storedLocation){
    storedLocation = storedLocation.charAt(0).toUpperCase() + storedLocation.slice(1).toLowerCase()
    localStorage.setItem('Location', storedLocation)
    console.log ("if location exists triggered")
    
}


//Call function to get Pollen info with stored lat/long data
getPollenInfo(lat, lon)

//Sets new search location into storage and calls on function to get lat lon from new location
async function newLocation(e){
    e.preventDefault() 
    console.log("new location triggered")
    
    //Take in user input with new search, format it, store it, then convert to new lat/long
    var newLocation = document.querySelector('input').value.trim() 
    newLocation = newLocation.charAt(0).toUpperCase() + newLocation.slice(1).toLowerCase()
    localStorage.setItem('Location', newLocation)
    storedLocation = localStorage.getItem('Location')
    // storedLocation = storedLocation.charAt(0).toUpperCase() + storedLocation.slice(1).toLowerCase()
    
    await longLat(storedLocation)

    //Access new lat/long data saved to localStorage, then access pollen info for location
    lat = localStorage.getItem('LocationLat')
    lon = localStorage.getItem('LocationLon')
    
    getPollenInfo(lat, lon)
}


async function getPollenInfo(lat, lon){

    //Empty results to prepare for new info, update headline with new location
    // pollenResults.innerHTML =""
    searchPlaceholder.value = ""
    pollenHeadline.innerHTML = `Local Pollen Levels for ${storedLocation}`
    
    //Use longitude latitude values to access pollen API information
    try{
        const res = await fetch(`https://api.breezometer.com/pollen/v2/forecast/daily?lat=${lat}&lon=${lon}&days=1&key=c2d66421775a47b39aa2a5e2b0de6bbe&features=types_information,plants_information`)
        if(res.status !== 200) throw new Error('Information not found')
        
        var pollenData = await res.json() 
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
