import fs = require("fs");
import bluebird = require("bluebird");
let fspromise = require("fs-promise");

export function GetMessage() {
	return "Hello from y!";
}

class LidarLoader
{
    constructor(private filename: string)
    {
    }

    public Load()
    {
        var result = fspromise.readFile(this.filename)
                    .then(contents => this.Parse(contents.toString()));

        return bluebird.cast(result);
    }
    
    private Parse(contents: string)
    {
        // console.log("Parse: " + contents);
        let lines = contents.split("\n");
        
        console.log("Lines: " + lines.length);
        let props: {[id: string]: string} = {};
        
        for(let i = 0; i < 6; i++)
        {
            let parts = lines[i].split(/ +/);
            let key = parts[0];
            
            let value = parts[1];
            
            props[key] = value;
        }
        
        console.log(props);
        
        let nrows = parseFloat(props["nrows"]);
        let ncols = parseFloat(props["ncols"]);
        
        
        let result: number[][] = new Array<number[]>(nrows);
        
        for(let i = 0; i < nrows; i++)
        {
            result[i] = lines[i + 6].split(" ").map(str => parseFloat(str));
        }
        
        return result;
    }
}

console.log(GetMessage());

let lidar = new LidarLoader("./LIDAR-DTM-1M-SU49/su4090_DTM_1m.asc");

lidar.Load()
    .then(props =>
    {
        console.log(props.length);
        console.log("Loaded data");
    })
    .done();