// This is not good

export class BindHandler {
    constructor (commands, inputState) {
        this.binds = { /* Key: Command */ };

        this.inputState = inputState

        commands.registerCommand("bind", (args) => {this.bind.call(this, args)});
        commands.registerCommand("unbind", (args) => {this.unbind.call(this, args)});
    }

    bind(args) {
        let key = args.shift();
        this.binds[key] = args.join(" ");

        inputState.registerKeydown(key, () => {commands.run.call(commands, key+args.join(" "))});
    }

    unbind (args) {
        delete this.binds[args.shift()];
        // Unbind Keys in the input state
    }
}