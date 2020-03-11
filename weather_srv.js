// Pi-Robot Web interface emulate.
//
// Author Denis Kudia
// Date: 10 Mar 2020
//

var express = require('express');
var _ = require('underscore')
var util = require('util')

var app = express()

app.get('/measurement.html', function(req, res){
    console.log('----> Request detected')
    let result = '{ \"temperature\": 1.1, \"humidity\": 2.2, \"pressure\": 3.3, \"luximity\": 4.4, \"co2\": 5.5, \"tvoc\": 6.6 }';
    res.set('Content-Type', 'application/json');
    res.send(result);
})


//
app.listen(3002, function () {
    console.log('Example app listening on port 3002!')
})
