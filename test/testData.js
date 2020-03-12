var expect = require('chai').expect;
var should = require('chai').should();

var data = require('../src/index.js');

describe('Data Checks', function () {
    it('First month = Vendémiaire', function () {
        data.getMonthName(0, 0).should.equal('Vendémiaire');
    });

    it('Last month = Fructidor', function () {
        data.getMonthName(11, 29).should.equal('Fructidor');
    });

    it('First month first day = Raisin', function () {
        data.getDayName(0, 0).should.equal('Raisin');
    });

    it('Last month last day = Panier', function () {
        data.getDayName(11, 29).should.equal('Panier');
    });
});

describe('Convert Date', function () {
    it('1776/07/04 is not valid date', function () {
        data.convertDate(new Date(1776, 07, 04)).should.equal(false);
    });

    it('The first date is Vendémiaire Raisin', function () {
        data.convertDate(new Date(1792, 8, 22)).should.equal("1 Vendémiaire, An I");
    });

    it('9th day is Vendémiaire Panais', function () {
        data.convertDate(new Date(1792, 8, 30)).should.equal("9 Vendémiaire, An I");
    });

    it('Last day of leap year is La Fête de la Révolution', function () {
        data.convertDate(new Date(1793, 8, 21)).should.equal("La Fête de la Révolution, An I");
    });
});

describe('Start Date', function () {
    it('First Republican Year = 22 Sept 1792', function () {
        data.getStartDate(data.getRepublicanYear(new Date(1793, 0, 1))).should.equal(new Date(1792, 8, 22).setUTCHours(0, 0, 0, 0));
    });
    it('Twelfth Republican Year = 24 Sept 1803', function () {
        data.getStartDate(data.getRepublicanYear(new Date(1803, 8, 29))).should.equal(new Date(1803, 8, 24).setUTCHours(0, 0, 0, 0));
    });
    it('Fourteenth Republican Year = 23 Sept 1805', function () {
        data.getStartDate(data.getRepublicanYear(new Date(1805, 8, 25))).should.equal(new Date(1805, 8, 23).setUTCHours(0, 0, 0, 0));
    });

})

describe('Get Republican Year', function () {
    it('First Republican Year', function () {
        data.getRepublicanYear(new Date(1793,1,1)).should.equal(1);
    });
    it('Twelfth Republican Year', function () {
        data.getRepublicanYear(new Date(1803,8, 24)).should.equal(12);
    });
});

describe('Roman Numeral Conversion', function () {
    it('1 = Roman Numeral: I', function () {
        data.convertToRoman(1).should.equal('I');
    });

    it('469 = Roman Numeral: CDLXIX', function () {
        data.convertToRoman(469).should.equal('CDLXIX');
    });

    it('999 = Roman Numeral: CMXCIX', function () {
        data.convertToRoman(999).should.equal('CMXCIX');
    });

    it('0 = Invalid Number', function () {
        data.convertToRoman(0).should.equal('Invalid Number');
    });


});
