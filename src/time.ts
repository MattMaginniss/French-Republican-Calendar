/**
 @module Time
*/

'use strict'
const secToRepSec = 1.157407407407407
/**
 * Converts a Date object's time to a republican time string 
 * @category Time
 *
 * @param date The date/time to convert to decimal time
 * @returns {string} The time converted from a Date object to decimal time
 */
export function convertDateTime(date: Date): string {
    let decMins = (date.getHours() * 60) + date.getMinutes()
    let decSec = (decMins * 60) + date.getSeconds()
    let frcSec = Math.round(decSec * secToRepSec)

    let frcHours = Math.floor(frcSec / 10000)
    frcSec = frcSec % 10000
    let frcMins = Math.floor(frcSec / 100)
    frcSec = frcSec % 100
    return (`${frcHours}:${frcMins}:${frcSec}`)
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
export function convertTime(hours: number, minutes: number, seconds: number): string {
    if (!(hours >= 0 && hours < 24) || !(minutes >= 0 && minutes < 60) || !(seconds >= 0 && seconds < 60)) {
        throw new Error("Invalid time parameters. Hours must be less than 24 and Minutes/Seconds must be less than 60")
    }
    var decMins = (hours * 60) + minutes
    var decSec = (decMins * 60) + seconds
    var frcSec = Math.round(decSec * secToRepSec)

    var frcHours = Math.floor(frcSec / 10000)
    frcSec = frcSec % 10000
    var frcMins = Math.floor(frcSec / 100)
    frcSec = frcSec % 100
    return (`${frcHours}:${frcMins}:${frcSec}`)
}
