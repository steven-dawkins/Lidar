"use strict";

import Logger = require("./Logger");
import LidarLoader = require("./LidarLoader");

let log = new Logger();

export function GetMessage(): string {
	return "Hello from y!";
}

log.info(GetMessage());

// http://environment.data.gov.uk/ds/survey#/download?grid=SU49
let lidar = new LidarLoader("./LIDAR-DTM-1M-SU49/su4090_DTM_1m.asc");

lidar.Load()
    .then(props =>
    {
        log.info(props.length);
        log.info("Loaded data");
    })
    .done();