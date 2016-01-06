///<reference path="../typings/mocha/mocha.d.ts" />
///<reference path="../typings/chai/chai.d.ts" />
import chai = require("chai");
import bluebird = require("bluebird");

let expect = chai.expect;

import app = require("../src/app");

describe("Lidar loader tests", () => {
	it("Should load lidar data!", () => {

        let loader = new app.LidarLoader("./LIDAR-DTM-1M-SU49/su4090_DTM_1m.asc");

        let data = loader.Load();

        let width = data.then(d => d.length);
        let height = data.then(d => d[0].length);

        return bluebird.all([width, height])
                .then(values =>
                {
                    expect(values[0], "width").to.be.equal(1000);
                    expect(values[1], "height").to.be.equal(1000);
                });

	});
});