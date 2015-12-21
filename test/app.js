///<reference path="../typings/mocha/mocha.d.ts" />
///<reference path="../typings/chai/chai.d.ts" />
var chai = require('chai');
var expect = chai.expect;
var app = require('../app');
describe('Example app tests', function () {
    it('Should say Hello from y!', function () {
        expect(app.GetMessage()).to.be.equal('Hello from y!');
    });
});
//# sourceMappingURL=app.js.map