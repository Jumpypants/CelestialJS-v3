class Camera {
    constructor(pos, size, rotation, defaultSystems){
        // The 2d position of the camera within the scene.
        this.pos = pos;
        // The 2d capture size of the camera within the scene.
        this.size = size;
        // The rotation of the camera within the scene.
        this.rotation = rotation;

        // The names of the systems that the entity should be added to by default.
        this.defaultSystems = defaultSystems;
        for(var s of defaultSystems){
            systems.get(s).parts.push(this);
        }
    }
}