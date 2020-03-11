'use strict';
var functions = module.exports;
var format = require('date-fns/format');
var dayDifference = require('date-fns/differenceInCalendarDays');
var differenceInYears = require('date-fns/differenceInYears');
const endOfMonarchy = new Date(1792, 8, 22); // 8 because it is a month index and not month number (September)
const startYear = 1791;

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
    var republicanYears = Math.floor(republicanMonths / 12);
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
 * @param {number} gregorianDate The gregorian date to determine what year the republican calendar is at.
 * @return {number} The numerical representation of the gregorian year.
 */
functions.getRepublicanYear = function (gregorianDate) {
    var republicanYear = differenceInYears(gregorianDate, endOfMonarchy);
    return republicanYear + 1;
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

functions.getStartDate = function (republicanYear) {
    var year = republicanYear % 14;
    if ([1, 2, 3, 5, 6, 7].includes(year)) {
        // 22 September
        return (new Date((startYear + republicanYear), 8, 22).setUTCHours(0, 0, 0, 0));
    } else if ([0, 4, 8, 9, 10, 11, 13].includes(year)) {
        // 23 September
        return (new Date((startYear + republicanYear), 8, 23).setUTCHours(0, 0, 0, 0));
    } else if (12 === year) {
        // 24 September
        return (new Date((startYear + republicanYear), 8, 24).setUTCHours(0, 0, 0, 0));
    }
}