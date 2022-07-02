/**
 @module Time
*/

'use strict'
const secToRepSec = 1.157407407407407
var timezoneDate = require('date-fns-tz/formatInTimeZone')

/**
 * Converts a Date object's time to a republican time string 
 * @category Time
 * @function
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
 * @function
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

/**
 * Gets the current republican time based on the input timezone
 * @category Time
 * @function
 *
 * @param timezone IANA time zone name or offset string (ex. America/Los_Angeles, Europe/Berlin, Etc/GMT+2)
 *                  If nothing is provided. The timezone of the user will be used.
 * @returns Converted time from current time in the specified timezone to Republican Time
 */
export function getCurrentRepublicanTime(timezone?: string) {
    if (timezone === undefined) {
        timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    }
    let date = ''
    try {
        date = timezoneDate(new Date(), timezone, "yyyy-MM-dd'\T'HH:mm:ss.SSSXXX")
    } catch (error) {
        return "Invaild Timezone, please either use an IANA time zone name or offset string"
    }
    let time = date.split('T')[1]
    return convertTime(parseInt(time.split(':')[0]), parseInt(time.split(':')[1]), parseInt(time.split(':')[2].split('.')[0]), parseInt(time.split(':')[2].split('.')[1]))
}
