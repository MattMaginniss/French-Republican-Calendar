var expect = require('chai').expect;
var should = require('chai').should();

var data = require('../index.js');

describe('Data Checks', function () {
    it('First month first day = Vendémiaire Raisin', function () {
        data.getMonthDayName(0,0).should.equal('Vendémiaire Raisin');
    });

    it('Last month last day = Fructidor Panier', function () {
        data.getMonthDayName(11, 29).should.equal('Fructidor Panier');
    });
});

describe('Year Checks', function () {
    it('First Republican Year', function () {
        data.getYear(1792).should.equal("I");
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
});

describe('Convert Date', function () {
    it('1776/07/04 is not valid date', function () {
        data.convertDate(new Date(1776, 07, 04)).should.equal(false);
    });

    it('The first date is a valid date', function () {
        data.convertDate(new Date(1792, 9, 22)).should.equal("This is a possible date.");
    });

    it('Now is valid date', function () {
        data.convertDate(new Date()).should.equal("This is a possible date.");
    });
});