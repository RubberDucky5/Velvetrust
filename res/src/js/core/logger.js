
export class Logger {
    constructor (passedOptions={}) {
        let options = {
            timestamps: true,
            name: "Log",
            use_name: true,
        }
        Object.assign(options, passedOptions);
        
        this.options = options
    }
    log (message) {
        console.log(
            (this.options.timestamps ? `[${this.getTimeStamp()}] ` : "") + 
            (this.options.use_name ? this.options.name : "") +
            `: ${message}`
            );
    }
    getTimeStamp () {
        let d = new Date();
        let hrs = d.getHours();
        let min = d.getMinutes();
        let sec = d.getSeconds();
        let ms = d.getMilliseconds();

        return `${hrs}:${min}:${sec}:${ms}`;
    }
}