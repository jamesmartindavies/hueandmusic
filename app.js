//Using moment for time  management & http for API requests
var moment = require('moment');
var http = require('http');
var request = require('request');

//The app will first need to get the status of the hue light. For now I'm mocking this as I don't have a bridge
// // A generic function to parse times
function parseTime(time) {
    var parsedTime = moment(time, ["HH:mm"]);
    return parsedTime
};
var start = parseTime("06:00");
var end = parseTime("22:00");

var lightsurl = 'http://192.168.0.2/api/newdeveloper/lights/';
var groupsurl = 'http://192.168.0.2/api/newdeveloper/groups/';

var functiontest = function getLights() {
    group = groupsurl + 1;
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
            var lightnumber = JSON.parse(data.lights);
            request.get({
                url: lightsurl + lightnumber,
                json: true,
                headers: { 'User-Agent': 'request' }
            }, (err, res, data) => {
                if (err) {
                    console.log('Error:', err);
                } else if (res.statusCode !== 200) {
                    console.log('Status:', res.statusCode);
                } else {
                    // data is already parsed as JSON:
                    var lightstatus = JSON.parse(data.state.on);
                    console.log("The light status is " + lightstatus);
                    var between = moment().isBetween(start, end);
                    console.log("The time is between the thresholds = " + between);
                    if (between === true && lightstatus === true) {
                        var playing = true;
                        console.log("music is playing = " + playing);
                        // exec('~/play.sh');
                    } else {
                        var playing = false;
                        console.log("music is playing = " + playing);
                    };
                }
            });
        }
    });
};



var dataarray = functiontest();



// function getLightStatus(light) {
//     url = hueurl + light;
//     request.get({
//         url: url,
//         json: true,
//         headers: { 'User-Agent': 'request' }
//     }, (err, res, data) => {
//         if (err) {
//             console.log('Error:', err);
//         } else if (res.statusCode !== 200) {
//             console.log('Status:', res.statusCode);
//         } else {
//             // data is already parsed as JSON:
//             console.log("test here " + data.state.on);
//         }
//     });

// };
// // TODO - figure out how to validate the playing variable. 



// // Some thresholds that will need to be migrated to a database - using these for Development
// var start = parseTime("06:00");
// var end = parseTime("10:00");

// // All of this needs to be wrapped in an if to check if the lightstatus is true 
// var reqlightStatus = getLightStatus(1);
// console.log("the light status is " + reqlightStatus);

// if (reqlightStatus === true) {

//     // Now the code to decide what to do based on time. 



// } else {
//     console.log("Light is off or music is already playing");
// };