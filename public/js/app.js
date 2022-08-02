const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const paragraph = document.querySelector('#paragraph')
const message1 = document.querySelector('#message-1')
const message1_1 = document.querySelector('#message-1_1')
const message2 = document.querySelector('#message-2')
const message3 = document.querySelector('#message-3')




weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value
    console.log(location)
    message1.textContent = "LOADING"
    message2.textContent = ""
    fetch(`/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        
        if(data.error)
        {
            console.log(data.error)
            message1.textContent = data.error
            
        }
        else{
            console.log(data)
            // paragraph.textContent = 'Local time '+ data.time
            message1.textContent = `Weather in ${data.address}:`
            message1_1.textContent = `Localtime ${data.time}`
            message2.textContent = `${data.weather} with a temperature of ${data.temperature}`
            message3.textContent = `Real sensation ${data.feelslike}`
        }
    })
        })

})

