import * as Terminal from "xterm";
import "xterm/css/xterm.css";

export class PopoutConsole {
    constructor ( consoleInterface ) {
        this._console = consoleInterface;
        
        this.window = window.open("about:blank", "Console", "popup");

        this._term = new Terminal.Terminal();
        this._term.open(this.window.document.body);

        this._term.write("Hello, World!");
    }
}