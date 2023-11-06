class Screen {
    constructor(sections, frameFunction){
        // The sections of the screen where a scene is being rendered.
        this.sections = sections;
        // A function that is called every frame when the screen is active.
        this.frameFunction = frameFunction;
    }

    draw(){
        // Draws all of the screen sections and then calls the frame function. This method is called every frame when the screen is active.
        for(var section of this.sections){
            section.render();
        }

        this.frameFunction();
    }
}