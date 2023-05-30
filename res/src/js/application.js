import { Logger } from "./core/logger";
import { RenderTool } from "./core/renderer";
import { InputState } from "./core/input_handler";
import { FPSFlightCam } from "./core/player/fps_flight_cam";
import { BindHandler } from "./core/bind_handler";
import { Console } from "./core/console";
import { PopoutConsole } from "./core/popout_console";

class Application {
    constructor() {
        this.log = new Logger({name: "App"});

        this.viewWidth = window.innerWidth;
        this.viewHeight = window.innerHeight;

        this.renderer = new RenderTool({width: this.viewWidth, height: this.viewHeight});

        this.inputState = new InputState();

        this.console = new Console();

        this.binds = new BindHandler(this.console, this.inputState);

        this._fpscam = new FPSFlightCam(this.renderer.camera, this.inputState, this.console);

        // this.consoleGUI = new PopoutConsole(this.console);
    }
    render () {
        this._fpscam.update(this.inputState);
        this.renderer.render();
    }
}

export { Application };