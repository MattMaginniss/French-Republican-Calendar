var expect = require('chai').expect
var should = require('chai').should()

var date = require('../dist/index.js').cal
var time = require('../dist/index.js').time

describe('Data Checks', function () {
    it('First month = Vendémiaire', function () {
        date.getMonthName(0, 0).should.equal('Vendémiaire')
    })

    it('Last month = Fructidor', function () {
        date.getMonthName(11, 29).should.equal('Fructidor')
    })

    it('First month first day = Raisin', function () {
        date.getDayName(0, 0).should.equal('Raisin')
    })

    it('Last month last day = Panier', function () {
        date.getDayName(11, 29).should.equal('Panier')
    })
})

describe('Convert Date', function () {
    it('1776/07/04 is not valid date', function () {
        date.convertDate(new Date(1776, 7, 4)).should.equal("Before the revolution")
    })

    it('The first date is Vendémiaire Raisin', function () {
        date.convertDate(new Date(1792, 8, 22)).should.equal("1 Vendémiaire, An I")
    })

    it('9th day is Vendémiaire Panais', function () {
        date.convertDate(new Date(1792, 8, 30)).should.equal("9 Vendémiaire, An I")
    })

    it('Last day of leap year is La Fête de la Révolution', function () {
        date.convertDate(new Date(1793, 8, 21)).should.equal("La Fête de la Révolution, An I")
    })
    console.log(date.convertDate(new Date()))
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
        date.getRepublicanYear(new Date(1793,1,1)).should.equal(1)
    })
    it('Twelfth Republican Year', function () {
        date.getRepublicanYear(new Date(1803,8, 24)).should.equal(12)
    })
})

describe('Roman Numeral Conversion', function () {
    it('1 = Roman Numeral: I', function () {
        date.convertToRoman(1).should.equal('I')
    })

    it('469 = Roman Numeral: CDLXIX', function () {
        date.convertToRoman(469).should.equal('CDLXIX')
    })

    it('999 = Roman Numeral: CMXCIX', function () {
        date.convertToRoman(999).should.equal('CMXCIX')
    })

    it('0 = Invalid Number', function () {
        date.convertToRoman(0).should.equal('Invalid Number')
    })
})

describe("Decimal Time Conversion", function () {
    it('Midnight = 00:00:00', function () {
        time.convertTime(new Date(1, 1, 1, 0, 0, 0)).should.equal('0:0:0')
    }) 
    it('2:24:00 = 1:00:00', function () {
        time.convertTime(new Date(1, 1, 1, 2, 24, 0)).should.equal('1:0:0')
    })
    console.log(time.convertTime(new Date()))
})
