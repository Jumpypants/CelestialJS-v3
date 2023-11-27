class RectPhyicsComponent extends Component {
    constructor(){
        super(
            (system) => {
                for(var e of system.getAll()){
                    setIfUndefined(e, "vel", new V2(0, 0));
                    setIfUndefined(e, "rotationVel", 0);
                    setIfUndefined(e, "mass", 1);
                    setIfUndefined(e, "elasticity", 0.01);
                    setIfUndefined(e, "positionIsStatic", false);
                    setIfUndefined(e, "rotationIsStatic", false);
                }
            },
            (system, dt) => {
                // Calculate the position and velocity of each entity at the end of the frame.
                calculateRectPhysics(system.getAll(), dt);
            }
        );
    }
}

function calculateRectPhysics(entities, dt){
    // Apply forces (gravity friction etc.) and accelerations.
    calculateVelocities(entities, dt);
    // Tracks how much time of the frame is used up.
    var t = 0;
    while(t < dt){
        // Find the next collision that will happen (least amount of time).
        var nextCollision = findNextCollision(entities);
        // Null means no more collisions happen this frame.
        if(nextCollision == null || nextCollision.time + t > dt){
            // Change the position of the entities based on their velocities.
            moveEntities(entities, dt - t);
            break;
        }
        // Change the position of the entities based on their velocities.
        moveEntities(entities, nextCollision.time);
        // Change the velocities of the entities that collided.
        collision(nextCollision.entity1, nextCollision.entity2);
        t += nextCollision.time;
    }
}