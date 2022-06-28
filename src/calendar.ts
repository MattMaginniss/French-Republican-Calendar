'use strict'
var format = require('date-fns/format')
var dayDifference = require('date-fns/differenceInCalendarDays')
var differenceInYears = require('date-fns/differenceInYears')
const endOfMonarchy = new Date(1792, 8/*Sept*/, 22)
const startYear = 1791

var calInfo = require('./data/info') 

/**
 * Converts the Gregorian date to the French Republican Calendar Date. 
 * The primary function of the library.
 * @category Date
 *
 * @param {Date} date The gregorian date to convert from.
 * @return {string} The full french republican date.
 */
export function convertDate(date: Date): string {
    var republicanYear = getRepublicanYear(date)
    var gregorianStartDate = getStartDate(republicanYear)
    var republicanDays = dayDifference(date, gregorianStartDate)
    if (republicanDays < 0) {
        return "Before the revolution"
    }
    if(republicanDays >= 360) {
        return getDayName(12, (republicanDays-360)) + ", An " + convertToRoman(republicanYear)
    } else {
        var republicanMonths = Math.floor(republicanDays / 30)
        var republicanDaysinMonth = republicanDays % 30
        return (republicanDaysinMonth) + ' ' + getMonthName(republicanMonths) + ", An " + convertToRoman(republicanYear)
    }
}

/**
 * Get the year number of the republican calendar.
 * @category Date
 *
 * @param {Date} gregorianDate The gregorian date to determine what year the republican calendar is at.
 * @return {number} The numerical representation of the gregorian year.
 */
export function getRepublicanYear(gregorianDate: Date): number {
    var republicanYear = differenceInYears(gregorianDate, endOfMonarchy)
    return republicanYear + 1
}

/**
 * Gets the name of the month within the Republican Calendar
 * @category Date
 * 
 * @param {number} monthIndex the republican month number-1.
 * @return {string} The name of the month.
 */
export function getMonthName(monthIndex: number): string {
    var month = calInfo.monthInfo[monthIndex]
    return month.name
}

/**
 * Gets the name of the day within the Republican Calendar
 * @category Date
 * 
 * @param {number} monthIndex the republican month number - 1.
 * @param {number} dayIndex the republican day number of the month - 1.
 * @return {string} The name of the month and day concatenated.
 */
export function getDayName(monthIndex: number, dayIndex: number): string {
    var day = calInfo.monthInfo[monthIndex].dayNames[dayIndex]
    return day.name
}

/**
 * Converts number 1-3999 (inclusive) to a Roman Numeral for representing
 * the French Republican Calendar year.
 * @category Date
 *
 * @param {number} number The number to convert to roman numeral 
 * @return {string} The name of the month and day concatenated.
 */
export function convertToRoman(number: number): string {
    if (number <= 0 || number >= 4000) return "Invalid Number"
    var romanNumeral = ""
    for (var i = 0; i < calInfo.romanNumerals.length; i++) {
        while (number >= calInfo.romanNumerals[i][0]) {
            number -= calInfo.romanNumerals[i][0]
            romanNumeral += calInfo.romanNumerals[i][1]
        }
    }
    return romanNumeral
}

/**
 * Gets the gregorian start date based on what Republican year it is
 * @category Date
 *
 * @param {number} republicanYear the year of the republic to check for the start date of.
 * @returns {Date} Gregorian date to start the republican year. UTC+2 (France/CEST)
 */
export function getStartDate(republicanYear: number): Date {
    let year = republicanYear % 14
    if ([1, 2, 3, 5, 6, 7].includes(year)) {
        // 22 September
        return (new Date(`${startYear + republicanYear}-09-22T00:00:00.000+02:00`))
    } else if ([0, 4, 8, 9, 10, 11, 13].includes(year)) {
        // 23 September
        return (new Date(`${startYear + republicanYear}-09-23T00:00:00.000+02:00`))
    } else {
        // 24 September
        return (new Date(`${startYear + republicanYear}-09-24T00:00:00.000+02:00`))
    }
}