console.log('STATIC JS LOADED !')

const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const dataOne = document.querySelector('#dataOne')
const dataTwo = document.querySelector('#dataTwo')
const dataThree = document.querySelector('#dataThree')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchInput.value

    messageOne.textContent = 'Please wait...'
    dataOne.textContent = ''
    dataTwo.textContent = ''
    dataThree.textContent = ''

    fetch(`/weather?address=${location}`)
    .then((response) => {
        response.json()
        .then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                dataOne.textContent = ''
                dataTwo.textContent = ''
                dataThree.textContent = ''
            } else {
                messageOne.textContent = data.location

                dataOne.textContent = data.forecastData[0]
                dataTwo.textContent = data.forecastData[1]
                dataThree.textContent = data.forecastData[2]
            }
        })
    })
    console.log('Testing');
})