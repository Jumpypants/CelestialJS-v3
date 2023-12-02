class Scene {
    constructor(layers, cameras){
        // The "z" layers in the scene.
        this.layers = layers;
        // The cameras in the scene.
        this.cameras = cameras;
        console.log("cameras", this.cameras)
    }
}