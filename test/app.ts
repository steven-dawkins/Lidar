///<reference path="../typings/mocha/mocha.d.ts" />
///<reference path="../typings/chai/chai.d.ts" />
import chai = require("chai");
let expect = chai.expect;

import app = require("../src/app");

describe("Example app tests", () => {
	it("Should say Hello from y!", () => {
		expect(app.GetMessage()).to.be.equal("Hello from y!");
	});
});