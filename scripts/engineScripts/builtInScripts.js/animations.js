class AnimationsComponent extends Component{
    constructor(){
        super(
            function(system){
                for(var part of system.getAll()){
                    setIfUndefined(part, "animations", [new Animation(part, part.image, new V2(120, 80), 10, 0, 10, true)]);
                    setIfUndefined(part, "currentAnimation", 0);
                }
            },
            function(system, dt){
                for(var part of system.getAll()){
                    part.image = part.animations[part.currentAnimation].image;
                    part.animations[part.currentAnimation].tick();
                }
            }
        );
    }
}

class Animation {
    constructor(entity, image, frameSize, numFrames, startFrame, frameRepeat, loop){
        this.entity = entity;
        this.image = image;
        this.frameSize = frameSize;
        this.numFrames = numFrames;
        this.startFrame = startFrame;
        this.frameRepeat = frameRepeat;
        this.loop = loop;

        this.currentFrame = 0;
    }

    tick(){
        var index = Math.floor(this.currentFrame / this.frameRepeat);
        this.entity.imageSection = {pos: new V2(this.frameSize.x * (index + this.startFrame), 0), size: this.frameSize};

        if(this.currentFrame + 1 == this.numFrames * this.frameRepeat){
            if(this.loop){
                this.currentFrame = 0;
            }
        } else {
            this.currentFrame += 1;
        }
    }
}