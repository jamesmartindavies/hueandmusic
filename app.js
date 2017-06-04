//Using moment for time  management
var moment = require ('moment');

//The app will first need to get the status of the hue light. For now I'm mocking this as I don't have a bridge
var lightStatus = true;
console.log("The light status is "+lightStatus);
var playing = false;
// Using node here to get the current date parameters that may be of use in the rest of the script
// var now = moment();
// var hour = moment().format("HH");
// var minute = moment().format("mm");
// var day = moment().day();
// var week = moment().week();
// var month = moment().month();

// console.log("The time is "+hour+" "+minute+" and the day of the week is number "+ day +". The week number is "+week+" and the month number is "+month);

// A generic function to parse times
function parseTime(time){
    var parsedTime = moment(time, ["HH:mm"]);
    return parsedTime
};

// Some thresholds that will need to be migrated to a database - using these for Development
var start = parseTime("06:00");
var end = parseTime("10:00");

// All of this needs to be wrapped in an if to check if the lightstatus is true 

if (lightStatus === true && playing === false){

// Now the code to decide what to do based on time. 

var between = moment().isBetween(start, end);
    console.log("The time is between the thresholds = "+ between);

if (between === true) {
    console.log("Bang on!");
    var playing = true;
    console.log("music is playing = "+ playing);
    exec('~/play.sh');
}
else {
    console.log("nope");
    var playing = false;
    console.log("music is playing = "+ playing);
};

}
else {
    console.log("Light is off or music is already playing");
};