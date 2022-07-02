/**
 @module Time
*/

'use strict'
const secToRepSec = 1.157407407407407
var timezoneDate = require('date-fns-tz/formatInTimeZone')

/**
 * Converts a Date object's time to a republican time string 
 * @category Time
 *
 * @param date The date/time to convert to decimal time
 * @returns {string} The time converted from a Date object to decimal time
 */
export function convertDateTime(date: Date): string {
    let decMs = (date.getHours() * 3600000) + (date.getMinutes() * 60000) + (date.getSeconds() * 1000) + date.getMilliseconds()
    let repMs = Math.round(decMs * secToRepSec)
    let repSec = Math.floor(repMs / 1000) % 100
    let repMin = Math.floor(repMs / 100000 % 100)
    let repHour = Math.floor(repMs / 10000000)
    return (`${repHour}:${repMin}:${repSec}`)
}

/**
 * Converts a set of hours, minutes and seconds to a republican time string
 * @category Time
 * 
 * @param hours Number of hours to convert
 * @param minutes Number of minutes to convert
 * @param seconds Number of seconds to convert
 * @returns {string} The time converted from a Date object to decimal time
 */
export function convertTime(hours: number, minutes: number, seconds: number, ms: number): string {
    if (!(hours >= 0 && hours < 24) || !(minutes >= 0 && minutes < 60) || !(seconds >= 0 && seconds < 60) || !(ms >= 0 && ms < 1000)) {
        throw new Error("Invalid time parameters. Hours must be less than 24, Minutes/Seconds must be less than 60, Milliseconds must be less than 1000")
    }
    let decMs = (hours * 3600000) + (minutes * 60000) + (seconds * 1000) + ms
    let repMs = Math.round(decMs * secToRepSec)
    let repSec = Math.floor(repMs / 1000) % 100
    let repMin = Math.floor(repMs / 100000) % 100
    let repHour = Math.floor(repMs / 10000000)
    return (`${repHour}:${repMin}:${repSec}`)
}


    var frcHours = Math.floor(frcSec / 10000)
    frcSec = frcSec % 10000
    var frcMins = Math.floor(frcSec / 100)
    frcSec = frcSec % 100
    return (`${frcHours}:${frcMins}:${frcSec}`)
}
