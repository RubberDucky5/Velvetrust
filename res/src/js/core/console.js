
export class Console {
    constructor() {
        this._commands = { /* Name: function(command_args)->String */ };

        this.registerCommand("alert", (args) => {
            alert(args.join(" "));
        });
    }

    registerCommand (name, func) {
        this._commands[name] = func; 
    }

    unregisterCommand (name) {
        delete this._commands[name];
    }
    
    run (command) {
        // TODO: make a command parser to allow for multiple commands and more complex patterns like quotes
        command = command.split(" ");

        return this._commands[command.shift()](command);
    }
}