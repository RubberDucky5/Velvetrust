// TODO: Add mouse buttons to InputState in a discrete way

import { genUUID } from "./uuid";

/**
 * A Class to handle input from user in various ways 
 */
class InputState {
    constructor() {
        this.keys = {};

        this.keydownmethods = {};
        this.keyupmethods = {};

        window.addEventListener("keydown", (e) => {
            this.keydown.call(this, e);
        }, true);
        window.addEventListener("keyup", (e) => {
            this.keyup.call(this, e);
        }, true);

        this.mouse = new MouseStream();
    }

    keyup (event) {
        let key = event.key.toLowerCase();
        this.keys[key] = false;

        if(this.keyupmethods[key] != null) {
            for(let i = 0; i < this.keyupmethods[key].length; i++) {
                this.keyupmethods[key][i].method();
            }
        }
    }

    keydown (event) {
        let key = event.key.toLowerCase();
        this.keys[key] = true;

        if(this.keydownmethods[key] != null) {
            for(let i = 0; i < this.keydownmethods[key].length; i++) {
                this.keydownmethods[key][i].method();
            }
        }
    }

    /**
     * Registers method to be called when a certain key is pressed
     * @returns {number} The id of the registered method
     */
    registerKeydown (key, method) {
        let payload = {
            method: method,
            id: genUUID(),
        }
        if(this.keydownmethods[key] == null) {
            this.keydownmethods[key] = [];
        }
        this.keydownmethods[key].push(payload);
    }

    /**
     * Registers method to be called when a certain key is released
     * @returns {number} The id of the registered method
     */
    registerKeyup (key, method) {
        let payload = {
            method: method,
            id: genUUID(),
        }
        if(this.keyupmethods[key] == null) {
            this.keyupmethods[key] = [];
        }
        this.keyupmethods[key].push(payload);
    }

    /**
     * Unregisters a method from an id
     */
    unregisterMethod (id) {
        for(let k in this.keydownmethods) {
            for(let i = 0; i < this.keydownmethods[k].length; i++) {
                if(this.keydownmethods[k][i].id == id) {
                    this.keydownmethods[k].slice(i, 1);
                    return true;
                }
            }
        }
        for(let k in this.keyupmethods) {
            for(let i = 0; i < this.keyupmethods[k].length; i++) {
                if(this.keyupmethods[k][i].id == id) {
                    this.keyupmethods[k].slice(i, 1);
                    return true;
                }
            }
        }
        return false;
    }
}

class MouseStream {
    constructor() {
        this.mousex = 0;
        this.mousey = 0;
         
        this.deltax = 0;
        this.deltay = 0;

        window.addEventListener("mousemove", (e) => {this.update.call(this, e)}, true);
    }

    fold () {
        this.mousex = this.deltax;
        this.mousey = this.deltay;

        let r = {x: this.deltax, y: this.deltay};

        this.deltax = 0;
        this.deltay = 0;

        return r;
    }

    update(event) {
        this.deltax += event.movementX;
        this.deltay += event.movementY;
    }
}

export { InputState };