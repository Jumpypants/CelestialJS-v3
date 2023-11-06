class ScreenSection {
    constructor(pos, scale, camera, scene, renderer){
        // A 2d vector representing the position of center of the screen section on the screen (in pixels).
        this.pos = pos;
        // A 2d vector representing the scale of the screen section from scene units to pixels.
        this.scale = scale;
        // A pointer to the camera being used as a perspective to draw the scene.
        this.camera = camera;
        // The scene that is being rendered.
        this.scene = scene;
        // The renderer function being used to render the scene.
        this.renderer = renderer;
    }

    render(){
        // Save the context.
        ctx.save();
        
        // Move to the position of the screen section.
        ctx.translate(this.pos.x, this.pos.y);
        // Scale.
        ctx.scale(this.scale.x, this.scale.y);

        // Clear the area on the canvas.
        ctx.fillStyle = "white";
        ctx.fillRect(-this.camera.size.x / 2, - this.camera.size.y / 2, camera.size.x, camera.size.y);
        // Clip the canvas to create boundries.
        var region = new Path2D();
        region.rect(
            - this.camera.size.x / 2,
            - this.camera.size.y / 2,
            this.camera.size.x,
            this.camera.size.y
        );
        ctx.clip(region, "evenodd");
        ctx.stroke();

        // Translate to the camera's position in the scene.
        ctx.translate(-this.camera.pos.x, - this.camera.pos.y);
        // Rotate to the cameras rotation.
        ctx.rotate(this.camera.rotation);

        // Render.
        this.renderer(this.scene);

        // Restore context.
        ctx.restore();
    }
}