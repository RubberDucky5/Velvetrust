import {
    Scene,
    Color,
    WebGLRenderer,
    MeshBasicMaterial,
    BoxGeometry,
    Mesh,
    PerspectiveCamera,
} from "three";
import { Logger } from "./logger";

class RenderTool {
    constructor (passedOptions={}) {
        let options = {
            width: 100,
            height: 100,
            /**
             * @type HTMLElement
             */
            container: document.body,
        }
        Object.assign(options, passedOptions);

        this.scene = new Scene();
        this.camera = new PerspectiveCamera(90, options.width / options.height, 0.01, 1000);

        this.renderer = new WebGLRenderer();
        this.renderer.setSize(options.width, options.height);
        options.container.appendChild(this.renderer.domElement);

        this.testScene();

        /** @type Logger */
        this.log = new Logger("Renderer");
    }

    render (camera=this.camera) {
        this.renderer.render(this.scene, camera);
    }

    testScene () {
        
        const geometry = new BoxGeometry( 1, 1, 1 );
        const material = new MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new Mesh( geometry, material );
        this.scene.add( cube );

        this.camera.position.z = 5;
    }
}

export { RenderTool };


