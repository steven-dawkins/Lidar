var bluebird = require("bluebird");
var fspromise = require("fs-promise");
function GetMessage() {
    return "Hello from y!";
}
exports.GetMessage = GetMessage;
var LidarLoader = (function () {
    function LidarLoader(filename) {
        this.filename = filename;
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
        console.log("Lines: " + lines.length);
        var props = {};
        for (var i = 0; i < 6; i++) {
            var parts = lines[i].split(/ +/);
            var key = parts[0];
            var value = parts[1];
            props[key] = value;
        }
        console.log(props);
        var nrows = parseFloat(props["nrows"]);
        var ncols = parseFloat(props["ncols"]);
        var result = new Array(nrows);
        for (var i = 0; i < nrows; i++) {
            result[i] = lines[i + 6].split(" ").map(function (str) { return parseFloat(str); });
        }
        return result;
    };
    return LidarLoader;
})();
console.log(GetMessage());
var lidar = new LidarLoader("./LIDAR-DTM-1M-SU49/su4090_DTM_1m.asc");
lidar.Load()
    .then(function (props) {
    console.log(props.length);
    console.log("Loaded data");
})
    .done();
//# sourceMappingURL=app.js.map