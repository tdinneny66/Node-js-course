const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const path = require('path')

const express = require('express')
const hbs = require('hbs')

const app = express()

//Define Paths for app config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
console.log(partialsPath)

//Set up handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory to server
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Tom Dinneny',
        footerText: 'Created by Tom Dinneny'

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Tom Dinneny',
        footerText: 'Created by Tom Dinneny'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'What can I help you with?',
        name: 'Tom Dinneny',
        footerText: 'Created by Tom Dinneny'
    })
})

app.get('/help/*', (req, res) => {
    res.render('notfound', {
        errorMsg: 'Help module not found',
        footerText: 'Created by Tom Dinneny'
    })
})

app.get('/weather', (req, res) => {
    location = req.query.address
    if (!location) {
        return res.send({ 
            error:'Cool in the shade! But you must provide an address'
        })
    }

    geocode(location, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
            } 
        
        forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                    }
                
                return res.send({
                        address: location,
                        forecast: forecastData
                        })    
                    })
        })
})      

//     res.send({
//         forecast:'Cool in the shade!',
//         address: req.query.address
//     })
// })


app.get('*', (req, res) => {
    res.render('notfound', {
        errorMsg: '404 Not Found',
        footerText: 'Created by Tom Dinneny'
    })
})

// app.get('/help', (req, res) => {
//     res.send('What can I help you with?')
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>That is what I\'m taking about!</h1>')
// })



app.listen(3000, () => {
    console.log('Server listening on port 3000')
})
