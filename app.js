"use strict";
var bluebird = require("bluebird");
var fspromise = require("fs-promise");
var Logger = (function () {
    function Logger() {
        var logModule = require("log");
        this.log = new logModule("info");
    }
    Logger.prototype.info = function (str) {
        this.log.info(str);
    };
    return Logger;
})();
var log = new Logger();
function GetMessage() {
    return "Hello from y!";
}
exports.GetMessage = GetMessage;
var LidarLoader = (function () {
    function LidarLoader(filename) {
        this.filename = filename;
        this.NROWS_FIELD = "nrows";
    }
    LidarLoader.prototype.Load = function () {
        var _this = this;
        var result = fspromise.readFile(this.filename)
            .then(function (contents) { return _this.Parse(contents.toString()); });
        return bluebird.cast(result);
    };
    LidarLoader.prototype.Parse = function (contents) {
        // console.log("Parse: " + contents);
        var lines = contents.split("\n");
        log.info("Lines: " + lines.length);
        var props = {};
        for (var i = 0; i < 6; i++) {
            var parts = lines[i].split(/ +/);
            var key = parts[0];
            var value = parts[1];
            props[key] = value;
        }
        log.info(props);
        var nrows = parseFloat(props[this.NROWS_FIELD]);
        var result = new Array(nrows);
        for (var i = 0; i < nrows; i++) {
            result[i] = lines[i + 6].split(" ").map(function (str) { return parseFloat(str); });
        }
        return result;
    };
    return LidarLoader;
})();
log.info(GetMessage());
var lidar = new LidarLoader("./LIDAR-DTM-1M-SU49/su4090_DTM_1m.asc");
lidar.Load()
    .then(function (props) {
    log.info(props.length);
    log.info("Loaded data");
})
    .done();
//# sourceMappingURL=app.js.map