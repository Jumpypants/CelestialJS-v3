class Entity {
    constructor(pos, size, rotation, image){
        // A 2d vector representing the position of the entity within the scene.
        this.pos = pos;
        // A 2d vector representing the width and height of the entity.
        this.size = size;
        // The rotation of the enity within the scene in radians.
        this.rotation = rotation;
        // The display image of the entity.
        this.image = image;
    }
}