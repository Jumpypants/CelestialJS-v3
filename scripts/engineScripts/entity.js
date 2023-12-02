class Entity {
    constructor(pos, size, rotation, image, defaultSystems){
        // A 2d vector representing the position of the entity within the scene.
        this.pos = pos;
        // A 2d vector representing the width and height of the entity.
        this.size = size;
        // The rotation of the enity within the scene in radians.
        this.rotation = rotation;
        // The display image of the entity.
        this.image = image;
        // The section of the image to display (optional).
        this.imageSection = null;

        // The names of the systems that the entity should be added to by default.
        this.defaultSystems = defaultSystems;
        for(var s of defaultSystems){
            systems.get(s).parts.push(this);
        }
    }
}