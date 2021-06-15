console.log("Javascript loaded!")


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#Message-1')
const messageTwo = document.querySelector('#Message-2')
console.log(messageTwo)

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''
    const location = search.value
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        } else {
                messageOne.textContent = data.forecast
                messageTwo.textContent = data.address
            }
        })
    })
})