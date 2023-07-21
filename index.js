//.......Start Main Page........
var form = document.getElementById('form')

console.log(pollenInfo)

form.onsubmit = function(e){
    var dataEl = document.querySelector('input').value
    //e.preventDefault()
    var userInput = document.getElementById("form-textBox").value
    localStorage.setItem('user_input', userInput)
    return false
}


var location = localStorage.getItem('user_input')
pollenInfo.innerHTML = location


//.......End Main Page........






//.......Start Pollen Page........
// var result = document.getElementsByClassName('pollen-results')
// result.innerHTML = localStorage.getItem("userInput")


//.......End Pollen Page........






//.......Start Air Quality Page........




//.......End Air Quality Page........