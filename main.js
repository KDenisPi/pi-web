// Pi-Robot Web interface.
// Main module
//
// Author Denis Kudia
// Date: 28 Feb 2020
//

var express = require('express');
var _ = require('underscore')
var util = require('util')
var logger = require('./logger')
var weather = require('./weather')

var app = express()
var log = new logger.Logger("debug")
var wth = new weather.Weather(log)

app.use(express.static('StaticWeb'));
app.set('view engine', 'hbs')

function weather_page_default(req, res){
  console.log('weather_page_default [' + req.originalUrl + ']')
  return wth.page_default(req, res);
}

function weather_page_status(req, res){
  console.log('weather_page_status [' + req.originalUrl + ']')
  return wth.page_status(req, res);
}

//TODO: change to /weather/
app.get(['/default.html','/'], weather_page_default)
app.get('/status.html', weather_page_status)

//
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

