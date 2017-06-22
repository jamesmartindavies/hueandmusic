//Using moment for time  management & http for API requests
var moment = require('moment');
var http = require('http');
var request = require('request');
var Hue = require('philips-hue');
var hue = new Hue();


// The app will first need to get the status of the hue light.For now I 'm mocking this as I don'
// t have a bridge
// A generic function to parse times
function parseTime(time) {
    var parsedTime = moment(time, ["HH:mm"]);
    return parsedTime
};

var start = parseTime("06:00");
var end = parseTime("22:00");

var lightsurl = 'http://192.168.0.2/api/newdeveloper/lights/';
var groupsurl = 'http://192.168.0.2/api/newdeveloper/groups/';
var lightnumber = null;
var lightstatus = null;

function getLights(groupid) {
    group = groupsurl + groupid;
    request.get({
        url: group,
        json: true,
        headers: { 'User-Agent': 'request' }
    }, (err, res, data) => {
        if (err) {
            console.log('Error:', err);
        } else if (res.statusCode !== 200) {
            console.log('Status:', res.statusCode);
        } else {
            // data is already parsed as JSON:
            var lightnumber = data.lights;
            console.log("the returned light number is " + lightnumber);
        };
    })
};



function getLightStatus(lightid) {
    lights = lightsurl + lightid;
    console.log("the lights url is " + lights)
    request.get({
        url: lights,
        json: true,
        headers: { 'User-Agent': 'request' }
    }, (err, res, data) => {
        if (err) {
            console.log('Error:', err);
        } else if (res.statusCode !== 200) {
            console.log('Status:', res.statusCode);
        } else {
            // data is already parsed as JSON:
            var lightstatus = data.state.on;
            console.log("the returned light status is " + lightstatus);
        };
    })
};


checkLightStatus = function() {
    getLights(1);
    console.log("loglightnumber " + lightnumber)
    getLightStatus(lightnumber);
    if (lightstatus === true) {
        console.log("light is on");
    } else {
        console.log("light is off");
    }
};

checkLightStatus();