const path = require('path')
const express = require('express')
const hbs = require ('hbs')
const weaterService = require('./utils/weatherInfo')

const app = express()
const port = process.env.PORT || 3000
//Paths for Express config
const publicDirectoryPath=path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")


//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('',(req,res) =>{
    res.render('index',{
        title:"Weather App ",
        name: "Harold"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Header title"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About "
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
       return res.send({
        error: 'You must providde an address term'
       })
    }
    const city = req.query.address
    weaterService.currentWeater(city,(error,{currentTempeature,currentWeater,feelslike,weatherIco,localTime}={}) =>{
        if(error){
            return res.send({error})
        }
        res.send({
            address: city,
            temperature: `${currentTempeature}°C`,
            weather: currentWeater,
            feelslike: `${feelslike}°C`,
            ico:  weatherIco,
            time: localTime
            
        })
    })
    
})

app.get('*',(req,res)=>{
    res.send("My 404 page")
})

app.listen(port, () =>{
    console.log('Server running on port '+ port)
})