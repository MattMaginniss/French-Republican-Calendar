var expect = require('chai').expect
var should = require('chai').should()

var date = require('../dist/index.js').calendar
var time = require('../dist/index.js').time

describe('Data Checks', function () {
    it('First month = Vendémiaire', function () {
        'Vendémiaire'.should.equal(date.getMonthName(0, 0))
    })

    it('Last month = Fructidor', function () {
        'Fructidor'.should.equal(date.getMonthName(11, 29))
    })

    it('First month first day = Raisin', function () {
        'Raisin'.should.equal(date.getDayName(0, 0))
    })

    it('Last month last day = Panier', function () {
        'Panier'.should.equal(date.getDayName(11, 29))
    })
})

describe('Convert Date', function () {
    it('1776/07/04 is not valid date', function () {
        "Before the revolution".should.equal(date.convertDate(new Date(1776, 7, 4)))
    })

    it('The first date is Vendémiaire Raisin', function () {
        "1 Vendémiaire, An I".should.equal(date.convertDate(new Date(1792, 8, 22)))
    })

    it('9th day is Vendémiaire Panais', function () {
        "9 Vendémiaire, An I".should.equal(date.convertDate(new Date(1792, 8, 30)))
    })

    it('Last day of leap year is La Fête de la Révolution', function () {
        "La Fête de la Révolution, An I".should.equal(date.convertDate(new Date(1793, 8, 21)))
    })
})

describe('Start Date', function () {
    it('First Republican Year = 22 Sept 1792', function () {
        expect(date.getStartDate(date.getRepublicanYear(new Date(1793, 0, 1)))).to.deep.equal(new Date(`1792-09-22T00:00:00.000+02:00`))
    })
    it('Twelfth Republican Year = 24 Sept 1803', function () {
        expect(date.getStartDate(date.getRepublicanYear(new Date(1803, 8, 29)))).to.deep.equal(new Date(`1803-09-24T00:00:00.000+02:00`))
    })
    it('Fourteenth Republican Year = 23 Sept 1805', function () {
        expect(date.getStartDate(date.getRepublicanYear(new Date(1805, 8, 25)))).to.deep.equal(new Date(`1805-09-23T00:00:00.000+02:00`))
    })

})

describe('Get Republican Year', function () {
    it('First Republican Year', function () {
        (1).should.equal(date.getRepublicanYear(new Date(1793,1,1)))
    })
    it('Twelfth Republican Year', function () {
        (12).should.equal(date.getRepublicanYear(new Date(1803,8, 24)))
    })
})

describe('Roman Numeral Conversion', function () {
    it('1 = Roman Numeral: I', function () {
        'I'.should.equal(date.convertToRoman(1))
    })

    it('469 = Roman Numeral: CDLXIX', function () {
        'CDLXIX'.should.equal(date.convertToRoman(469))
    })

    it('999 = Roman Numeral: CMXCIX', function () {
        'CMXCIX'.should.equal(date.convertToRoman(999))
    })

    it('0 = Invalid Number', function () {
        'Invalid Number'.should.equal(date.convertToRoman(0))
    })
})

describe("Decimal Time Conversion", function () {
    it('Midnight = 00:00:00', function () {
        '0:0:0'.should.equal(time.convertDateTime(new Date(1, 1, 1, 0, 0, 0)))
    }) 
    it('2:24:00 = 1:00:00', function () {
        '1:0:0'.should.equal(time.convertDateTime(new Date(1, 1, 1, 2, 24, 0, 0)))
    })
})

describe("Decimal Time Conversion from Pieces", function () {
    it('Midnight = 00:00:00', function () {
        '0:0:0'.should.equal(time.convertTime(0, 0, 0, 0))
    }) 
    it('2:24:00 = 1:00:00', function () {
        '1:0:0'.should.equal(time.convertTime(2, 24, 0, 0))
    })
    it('Noon = 5:00:00', function () {
        '5:0:0'.should.equal(time.convertTime(12, 0, 0, 0))
    })
    it('1 millisecond before midnight = 23:59:59.999', function () {
        time.convertTime(23, 59, 59, 999).should.equal('9:99:99')
    })
    it('Too many hours = Error', function () {
        expect(function () { time.convertTime(25, 0, 0) }).to.throw(Error)
    }) 
    it('Too few hours = Error', function () {
        expect(function () { time.convertTime(-1, 0, 0) }).to.throw(Error)
    }) 
    it('Too many minutes = Error', function () {
        expect(function () { time.convertTime(0, 60, 0) }).to.throw(Error)
    }) 
    it('Too few minutes = Error', function () {
        expect(function () { time.convertTime(0, -1, 0) }).to.throw(Error)
    }) 
    it('Too many seconds = Error', function () {
        expect(function () { time.convertTime(0, 0, 60) }).to.throw(Error)
    }) 
    it('Too few seconds = Error', function () {
        expect(function () { time.convertTime(0, 0, -1) }).to.throw(Error)
    }) 
})
