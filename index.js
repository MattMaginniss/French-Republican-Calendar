'use strict';
var functions = module.exports;
var format = require('date-fns/format');
var isBefore = require('date-fns/isBefore'); 
var dayDifference = require('date-fns/differenceInCalendarDays');
const endOfMonarchy = new Date(1792, 9, 22);

var calInfo = require('./data/info.js'); 

/**
 * Converts the Gregorian date to the French Republican Calendar Date. 
 * The primary function of the library.
 *
 * @param {Date} date The gregorian date to convert from.
 * @return {string} The full french republican date.
 */
functions.convertDate = function (date) {
    var republicanDays = dayDifference(date, endOfMonarchy);
    if (republicanDays < 0) {
        return false;
    }

    var republicanDays = dayDifference(date, endOfMonarchy);
    var republicanMonths = Math.floor(republicanDays / 30);
    var republicanYears = Math.floor(republicanMonths / 13);
    var republicanDaysinMonth = republicanDays % 30;
    
    return this.getMonthDayName(republicanMonths, republicanDaysinMonth) + ", An " + this.convertToRoman(republicanYears + 1);
}

/**
 * Format number to fit the format of a desired locale
 * @param {number} number the number to format
 * @param {string} locale the specified locale for formatting
 * @return {string} the formatted number
 */
functions.stringLocale = function (number, locale) {
    return number.toLocaleString(locale);
};

/**
 * Get the year number of the republican calendar.
 *
 * @param {number} gregorianYear The numerical gregorian year.
 * @return {string} The roman numeral representation of the gregorian year.
 */
functions.getYear = function (gregorianYear) {
    var republicanYear = gregorianYear - 1791;
    return this.convertToRoman(republicanYear);
}

/**
 * Gets the name of the month and the day within the Republican Calendar
 * 
 * @param {number} monthIndex the republican month number-1.
 * @param {number} dayIndex the republican day number of the month-1.
 * @return {string} The name of the month and day concatenated.
 */
functions.getMonthDayName = function (monthIndex, dayIndex) {
    var month = calInfo.monthInfo[monthIndex];
    var day = month.dayNames[dayIndex];
    return (dayIndex + 1) + ' ' + month.name;
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