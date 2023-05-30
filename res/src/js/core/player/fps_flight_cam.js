import {
    Vector3,
    Euler,
        
} from "three";

export class FPSFlightCam {
    constructor (camera, inputState, commands) {
        this.phi = 0;
        this.theta = 0;
        this.camera = camera;

        this._forward = false;
        this._backward = false;
        this._left = false;
        this._right = false;

        // Register Commands
        commands.registerCommand("+forward", () => {this.setProp.call(this, "_forward", true)});
        commands.registerCommand("-forward", () => {this.setProp.call(this, "_forward", false)});
        commands.registerCommand("+backward", () => {this.setProp.call(this, "_backward", true)});
        commands.registerCommand("-backward", () => {this.setProp.call(this, "_backward", false)});
        commands.registerCommand("+left", () => {this.setProp.call(this, "_left", true)});
        commands.registerCommand("-left", () => {this.setProp.call(this, "_left", false)});
        commands.registerCommand("+right", () => {this.setProp.call(this, "_right", true)});
        commands.registerCommand("-right", () => {this.setProp.call(this, "_right", false)});

        // Register Binds
        inputState.registerKeydown("w", () => {commands.run.call(commands, "+forward")});
        inputState.registerKeyup  ("w", () => {commands.run.call(commands, "-forward")});
        inputState.registerKeydown("s", () => {commands.run.call(commands, "+backward")});
        inputState.registerKeyup  ("s", () => {commands.run.call(commands, "-backward")});
        inputState.registerKeydown("a", () => {commands.run.call(commands, "+left")});
        inputState.registerKeyup  ("a", () => {commands.run.call(commands, "-left")});
        inputState.registerKeydown("d", () => {commands.run.call(commands, "+right")});
        inputState.registerKeyup  ("d", () => {commands.run.call(commands, "-right")});
    }
    update (inputState) {
        let mouse = inputState.mouse.fold();

        this.theta += -mouse.x / 100;
        this.phi += -mouse.y / 100;

        this.phi = Math.min(Math.max(this.phi, -Math.PI/2), Math.PI/2);

        let rot = new Euler(this.phi, this.theta, 0, 'YXZ');
        this.camera.setRotationFromEuler(rot);
        this.camera.updateMatrix();

        let forward = new Vector3(0, 0, -0.1,);
        forward.applyQuaternion(this.camera.quaternion);
        let right = new Vector3(0.1, 0, 0);
        right.applyQuaternion(this.camera.quaternion);

        if(this._forward) {
            this.camera.position.add(forward);
        }
        if(this._backward) {
            this.camera.position.sub(forward);
        }
        if(this._right) {
            this.camera.position.add(right);
        }
        if(this._left) {
            this.camera.position.sub(right);
        }
        
    }

    setProp(prop, val) {
        this[prop] = val;

        // alert(prop + ": " + val);
    }
}