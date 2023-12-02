class AnimationsComponent extends Component{
    constructor(){
        super(
            function(system){
                for(var part of system.getAll()){
                    setIfUndefined(part, "animations", [new Animation()]);
                }
            },
            function(system, dt){

            }
        );
    }
}

class Animation {
    constructor(image, frameSize, numFrames, dir, offset, fps, loop){
        this.image = image;
        this.frameSize = frameSize;
        this.numFrames = numFrames;
        this.dir = dir;
        this.offset = offset;
        this.fps = fps;
        this.loop = loop;
    }

    tick(entity, dt){
        
    }
}