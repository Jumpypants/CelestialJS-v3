// Calls the tick function of every component in every active system.
function tickComponents(dt){
    for(var system of systems.values()){
        if(!system.active){
            continue;
        }
        for(var component of system.components){
            component.tickFunction(system, dt);
        }
    }
}

function tick(dt){}

function setIfUndefined(obj, prop, value){
    if (obj[prop] === undefined) {
        obj[prop] = value;
    }
}

function fitScreenSectionToRect(camera, screenSection, size){
    var xScale = size.x / camera.size.x;
    camera.size.y = size.y / xScale;
    screenSection.scale = new V2(xScale, xScale);
}