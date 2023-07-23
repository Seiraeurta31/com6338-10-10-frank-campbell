
var form = document.getElementById('form')
var pollenBtn = document.getElementById("pollenButton").addEventListener("click", processInput)
var airQBtn = document.getElementById("airButton").addEventListener("click", processInput)

async function processInput (e){
    e.preventDefault() 
    var location = document.querySelector('input').value.trim() 
    if(!location) return

    localStorage.setItem('Location', location)
 
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

