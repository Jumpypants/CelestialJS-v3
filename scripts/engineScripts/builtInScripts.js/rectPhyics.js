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
        collision(nextCollision.sideEntity, nextCollision.cornerEntity, nextCollision.side, nextCollision.corner);
        t += nextCollision.time;
    }
}

function calculateVelocities(entities, dt){

}

function findNextCollision(entities){

}

function moveEntities(entities, dt){
    for(var entity of entities){
        entity.pos = addV2(entity.pos, multV2S(entity.vel), dt);
        entity.rotation += entity.rotationVel * dt;
    }
}

function collision(sideEntity, cornerEntity, side, corner){
    var collisionNormal = findCollisionNormal(sideEntity, side);

    var collisionPoint = getCornerPosition(cornerEntity, corner);
    var sideEntityVelocityAtCollisionPoint = getVelocityAtPoint(sideEntity, collisionPoint);
    var cornerEntityVelocityAtCollisionPoint = getVelocityAtPoint(cornerEntity, collisionPoint);
    var relativeVel = subV2(sideEntityVelocityAtCollisionPoint, cornerEntityVelocityAtCollisionPoint);
    var relativeVelAlongNorm = dotV2(relativeVel, collisionNormal);

    var e = 1 + average([sideEntity.elasticity, cornerEntity.elasticity]);
    var impulse =  -((e * relativeVelAlongNorm) / (1 / sideEntity.mass + 1 / cornerEntity.mass));

    sideEntity.vel = multV2S(collisionNormal, impulse / sideEntity.mass);
    cornerEntity.vel = multV2S(collisionNormal, impulse / cornerEntity.mass);
}

var block1 = new Entity(new V2(0, 0), new V2(1, Math.sqrt(3)), Math.PI / 6, null);
block1.vel = new V2(0, 100);
block1.mass = 1;
block1.elasticity = 1;
block1.rotationVel = 0;
var block2 = new Entity(new V2(0, 2), new V2(2, 2), 0, null);
block2.vel = new V2(0, 0);
block2.mass = 1;
block2.elasticity = 1;
block2.rotationVel = 0;

console.log("before");
console.log(JSON.stringify(block1));
console.log(JSON.stringify(block2));
collision(block2, block1, 2, 1);
console.log('after');
console.log(JSON.stringify(block1));
console.log(JSON.stringify(block2));

function findCollisionNormal(sideEntity, side){
    switch(side){
        case 0:
            return unitV2(sideEntity.rotation);
        case 1:
            return unitV2(sideEntity.rotation - Math.PI / 2);
        case 2:
            return unitV2(sideEntity.rotation - Math.PI);
        case 3:
            return unitV2(sideEntity.rotation - Math.PI * 3 / 2);
    }
}

function getCornerPosition(cornerEntity, corner){
    switch(corner){
        case 0:
            return addV2(cornerEntity.pos, rotateV2(new V2(-cornerEntity.size.x / 2, cornerEntity.size.y / 2), cornerEntity.rotation));
        case 1:
            return addV2(cornerEntity.pos, rotateV2(new V2(cornerEntity.size.x / 2, cornerEntity.size.y / 2), cornerEntity.rotation));
        case 2:
            return addV2(cornerEntity.pos, rotateV2(new V2(cornerEntity.size.x / 2, -cornerEntity.size.y / 2), cornerEntity.rotation));
        case 3:
            return addV2(cornerEntity.pos, rotateV2(new V2(-cornerEntity.size.x / 2, -cornerEntity.size.y / 2), cornerEntity.rotation));
    }
}

function getVelocityAtPoint(entity, point){
    var relativePos = subV2(point, entity.pos);
    var tangentVector = rotate90degreesV2(relativePos);
    var angularVel = multV2S(tangentVector, entity.rotationVel);
    return addV2(angularVel, entity.vel);
}

function average(l){
    var t = 0;
    for(var i of l){
        t += i;
    }
    return t / l.length;
}