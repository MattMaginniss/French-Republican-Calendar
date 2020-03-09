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
