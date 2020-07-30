const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'nandh'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Nandh'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Nandh'
    });
});

app.get('/weather', (req, res) => {
if(!req.query.address){
    return res.send({
        error: "you must provide address"
    })
}

geoCode(req.query.address, (error, {lat, long, location}={})=>{
    if(error){
        return res.send({
            error
        })
    }
    forecast(lat, long, (error, forecastData) => {
        if(error){
            res.send({
                error
            })
        }
        res.send({
            forecast: forecastData,
            location: location,
            address: req.query.address
        });
    });
      })
});

app.get('help/*', (req, res) => {
    res.render('404', {
        name: 'nandh',
        title: '404',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        name: 'nandh',
        title: '404',
        errorMessage: 'Page not found'
    });
});

app.listen(3000, () => {
    console.log('listening at port 3000');
});