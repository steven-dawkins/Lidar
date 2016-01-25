import bluebird = require("bluebird");
import Logger = require("./Logger");

let log = new Logger();
let fspromise = require("fs-promise");

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
            result[i] = lines[i + 6].split(" ").map(str => parseFloat(str)).filter(v => !isNaN(v));
        }

        return result;
    }
}

export = LidarLoader;