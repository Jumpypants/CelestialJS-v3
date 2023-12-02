class Layer {
    constructor(entities, distance){
        // The entites within the layer.
        this.entities = entities;
        // The z distance of the layer from the camera for parallax effect. Does not affect the scale of the layer.
        this.distance = distance;
    }
}