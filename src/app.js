const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Defining paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Handlebars engine and views path
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Serving static files
app.use(express.static(publicPath))

//Routes
app.get('', (req,res) => {
    res.render('index',{
        title : 'NodeJS Weather App',
        name : 'Arfat Sarole' 
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title : 'About Me',
        name : 'Arfat Sarole' 
    })
})
app.get('/help', (req,res) => {
    res.render('help',{
        title : 'Help',
        message: 'This is a help message.',
        name : 'Arfat Sarole' 
    })
})

app.get('/example', (req,res) => {
    res.send('Hello Express !')
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address query.'
        })
    }
    geocode( req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        } 
        forecast( latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            } 
            res.send({
                forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide a search query.'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: 'Help Error 404',
        name: 'Arfat Sarole',
        error: 'Help page not found'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title: 'Error 404',
        name: 'Arfat Sarole',
        error: '404 page not found'
    })
})


//Running express server
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})