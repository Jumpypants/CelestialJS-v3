class AnimationsComponent extends Component{
    constructor(){
        super(
            function(system){
                for(var part of system.getAll()){
                    setIfUndefined(part, "animations", [new Animation()]);
                    setIfUndefined(part, "currentAnimation", 0);
                }
            },
            function(system, dt){
                for(var part of system.getAll()){
                    part.image = part.animations[currentAnimation].image;
                    part.animations[currentAnimation].tick();
                }
            }
        );
    }
}

class Animation {
    constructor(entity, image, frameSize, numFrames, offset, frameRepeat, loop){
        this.entity = entity;
        this.image = image;
        this.frameSize = frameSize;
        this.numFrames = numFrames;
        this.offset = offset;
        this.frameRepeat = frameRepeat;
        this.loop = loop;

        this.currentFrame = 0;
    }

    tick(){
        var index = Math.floor(this.currentFrame / this.frameRepeat);
        this.entity.imageSection = {pos: new V2(this.frameSize.x * (index + startFrame), 0), size: this.frameSize};

        if(index + 1 == this.numFrames * this.frameRepeat && this.loop){
            index = 0;
        }
    }
}