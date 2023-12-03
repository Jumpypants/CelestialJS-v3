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
        for(var s of defaultSystems){
            systems.get(s).parts.push(this);
        }
    }

    draw(){
        ctx.save();
        ctx.scale(1, -1);
        if(this.image == null){
            ctx.fillStyle = "red";
            ctx.fillRect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
        } else if(this.imageSection == null){
            ctx.drawImage(this.image, -this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
        } else {
            ctx.fillStyle = "red";
            ctx.fillRect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
            ctx.drawImage(this.image,
                this.imageSection.pos.x,
                this.imageSection.pos.y,
                this.imageSection.size.x,
                this.imageSection.size.y,
                -this.size.x / 2,
                -this.size.y / 2,
                this.size.x * 1, this.size.y * 1);
        }
        ctx.restore();
    }
}