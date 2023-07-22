
var pollenResults = document.getElementById('pollen-results')
var pollenHeadline = document.getElementById('pollenHeader1')
var storedLocation = localStorage.getItem('Location')
pollenResults.innerHTML = storedLocation
pollenHeadline.innerHTML = `Local Pollen Levels for ${storedLocation}`


