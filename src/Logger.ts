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

export = Logger;