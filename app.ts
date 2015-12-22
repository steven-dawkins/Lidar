"use strict";

import bluebird = require("bluebird");
let fspromise = require("fs-promise");

class Logger
{
    private log: any;

    public constructor()
    {
        let logModule = require("log");
        this.log = new logModule("info");
    }

    public info(str: string | {}): void
    {
        this.log.info(str);
    }
}

let log = new Logger();

export function GetMessage(): string {
	return "Hello from y!";
}

class LidarLoader
{
    private NROWS_FIELD: string = "nrows";

    constructor(private filename: string)
    {
    }

    public Load(): bluebird<number[][]>
    {
        let result = fspromise.readFile(this.filename)
                    .then(contents => this.Parse(contents.toString()));

        return bluebird.cast(result);
    }

    private Parse(contents: string): number[][]
    {
        // console.log("Parse: " + contents);
        let lines = contents.split("\n");

        log.info(`Lines: ${lines.length}`);
        let props: {[id: string]: string} = {};

        for (let i = 0; i < 6; i++)
        {
            let parts = lines[i].split(/ +/);
            let key = parts[0];

            let value = parts[1];

            props[key] = value;
        }

        log.info(props);

        let nrows = parseFloat(props[this.NROWS_FIELD]);

        let result: number[][] = new Array<number[]>(nrows);

        for (let i = 0; i < nrows; i++)
        {
            result[i] = lines[i + 6].split(" ").map(str => parseFloat(str));
        }

        return result;
    }
}

log.info(GetMessage());

let lidar = new LidarLoader("./LIDAR-DTM-1M-SU49/su4090_DTM_1m.asc");

lidar.Load()
    .then(props =>
    {
        log.info(props.length);
        log.info("Loaded data");
    })
    .done();