'use strict';
var functions = module.exports;
var format = require('date-fns/format');
var isBefore = require('date-fns/isBefore'); 

var calInfo = require('./data/info.js'); 

/**
 * Converts the Gregorian date to the French Republican Calendar Date. 
 * The primary function of the library.
 *
 * @param {Date} date The gregorian date to convert from.
 * @return {string} The full french republican date.
 */
functions.convertDate = function (date) {
   
}


/**
 * Converts number 1-3999 (inclusive) to a Roman Numeral for representing
 * the French Republican Calendar year.
 *
 * @param {number} number The republican 
 * @return {string} The name of the month and day concatenated.
 */
functions.convertToRoman = function (number) {
    if (number <= 0 || number >= 4000) return "Invalid Number";
    var romanNumeral = "";
    for (var i = 0; i < calInfo.romanNumerals.length; i++) {
        while (number >= calInfo.romanNumerals[i][0]) {
            number -= calInfo.romanNumerals[i][0];
            romanNumeral += calInfo.romanNumerals[i][1];
        }
    }
    return romanNumeral;
}