
var form = document.getElementById('form')
var inputBox = document.getElementById('formTextBox')
var pollenBtn = document.getElementById("pollenButton").addEventListener("click", processInput)
var airQBtn = document.getElementById("airButton").addEventListener("click", processInput)

var instructions = document.getElementById('searchInstructions')


async function processInput (e){
    e.preventDefault() 
    var location = document.querySelector('input').value.trim() 
    if(!location) return

    location =location.charAt(0).toUpperCase() + location.slice(1).toLowerCase()
    localStorage.setItem('Location', location)
    
 
    try{
        //input user location input to recieve location info
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location},US&units=imperial&appid=08ace7633004d5ddf370678a8c052e90`)
        if(res.status !== 200) throw new Error('Location not found')
    } catch(err){
        instructions.innerHTML = err.message
        form.locationSearch.value = "" 
        return
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

