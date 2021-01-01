const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')
// const ejs = require('ejs');

const app = express();

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// setup ejs engine and views location
app.set('view engine', 'ejs');
app.set('views', viewsPath);
// ejs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('/', (req, res) =>{
    res.render('index',{
        title: 'My Weather App',
        name: 'Klever Su'
    })    
})


app.get('/about', (req, res) =>{
    res.render('about',{
        title: 'About Me',
        name: 'Klever Su'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        helpText: "You need help, we are here",
        title: 'Help',
        name: 'Klever Su'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'You must enter a location...'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({error: error})
        }
        forecast(latitude, longitude, (error, forecastData) =>{
            if(error){
                return res.send({ error})
            }
            res.send({
                forecast: forecastData,
                address: req.query.address,
                location
            })
        })
    })

    // res.send({
    //     forecast: 'its sunny',
    //     address: req.query.address
    //     // country: 'colombia'
    // })
});

app.get('/products', (req, res) =>{
    console.log(req.query)
    res.send({
        products:[]
    })
})


app.get('/help/*', (req, res) =>{
    res.render('404', {
        title:'Help Article not found',
        errorMessage:'Please try a different article',
        name: 'Klever Su'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: 'Page Not found',
        errorMessage:'try again',
        name: 'klever Su'
    })
})




app.listen(4000, (req, res) =>{
    console.log('server is running on port 4000')
})