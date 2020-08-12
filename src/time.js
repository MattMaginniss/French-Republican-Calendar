'use strict';
var functions = module.exports;
const secToRepSec = 1.157407407407407;

functions.convertTime = function(date) {
    var decMins = (date.getHours() * 60) + date.getMinutes(); // Gets number of decimal minutes.
    var decSec = (decMins * 60) + date.getSeconds(); // Gets number of decimal seconds.
    var frcSec = Math.round(decSec * secToRepSec);

    var frcHours = frcSec / 10000;
    frcSec = frcSec % 10000;
    var frcMins = frcSec / 100;
    var frcSecs = frcSec % 100;
    return (`Time: ${frcHours}:${frcMins}:${frcSecs}`);
}
