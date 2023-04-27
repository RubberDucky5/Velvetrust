import { Logger } from "./core/logger";
import { Application } from "./application";

// Resource Imports
import "../css/main.css";

/** @type Application */
let app;

// Temp
function render () {
    app.render();

    requestAnimationFrame(render);
}

window.addEventListener("load", () => {
    app = new Application();
    
    render();
});

let log = new Logger({name: "Main"});

log.log("Hello, World!");
