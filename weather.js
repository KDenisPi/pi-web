// Pi-Robot Web interface.
// Weather module
//
// Author Denis Kudia
// Date: 28 Feb 2020
//

const express = require('express');
var logger = require('./logger')
var http = require('http')

function Weather(log_obj) {
    //Measurement values
    this.temperature = 0.0;
    this.humidity = 0.0;
    this.pressure = 0.0;
    this.luximity = 0;
    this.co2 = 0;
    this.tvoc = 0;

    this.log = log_obj;

    this.timer = setInterval(this.measurement_update, 5000, this);

    //Genaral information
    this.ip = "127.0.0.1";
    this.uptime = "0 days 0 hours 0 minutes";
}

Weather.prototype.measurement_update = function(owner){
    console.log("Request data");

    http.get({
        hostname: 'localhost',
        port: 3002,
        path: '/measurement.html',
        agent: false  // Create a new agent just for this one request
      }, (res) => {

        console.log('content-type: ' + res.headers['content-type']);
        console.log('content-length: ' + res.headers['content-length']);
        console.log('status code: ' + res.statusCode);

        if(res.statusCode == 200){
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
              try {
                const result = JSON.parse(rawData);
                console.log(result);

                console.log('measurement_update Temperature: ' + owner.temperature);
                owner.temperature = result.temperature;
                owner.humidity = result.humidity;
                owner.pressure = result.pressure;
                owner.luximity = result.luximity;
                owner.co2 = result.co2;
                owner.tvoc = result.tvoc;

                console.log('measurement_update Temperature: ' + owner.temperature);

              } catch (e) {
                console.error(e.message);
              }
            });
        }

    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    });
}

Weather.prototype.measurement = function(){
    console.log('measurement Temperature: ' + this.temperature);
    return({ temperature: this.temperature, humidity: this.humidity, pressure: this.pressure, luximity: this.luximity, co2: this.co2, tvoc: this.tvoc});
}

Weather.prototype.general = function(){
    return({ ip: this.ip, uptime: this.uptime});
}

//
// Weather. Default page.
//
Weather.prototype.page_default = function(req, res){
    this.log.llog(req.originalUrl + " Weather. default.html");

    //get measurement
    let measurement = this.measurement();
    res.render('weather/default.hbs', measurement);
}

//
// Weather. Status page
//
Weather.prototype.page_status = function(req, res){
    this.log.llog(req.originalUrl + " Weather. status.html");

    //get measurement
    let general = this.general();
    res.render('weather/status.hbs', general);
}


  module.exports.Weather = Weather;