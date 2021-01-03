const year = document.getElementById('year')
const date = new Date();

year.innerHTML = date.getFullYear();



// reading form

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('messageOne')
const messageTwo = document.getElementById('messageTwo')

messageOne.textContent = 'Loading .....'
messageTwo.textContent = '';

weatherForm.addEventListener('submit', (e) =>{
    const location = search.value

    e.preventDefault()
    console.log('testing')
    fetching(location)
    console.log(location)

})


const fetching = (location)=>{
    fetch(`/weather?address=${location}`)
        .then(res =>{
            return res.json()
        })
        .then(data =>{
            if(data.error){
              messageOne.textContent = data.error
            }else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast.message                
            }        
    })
}
