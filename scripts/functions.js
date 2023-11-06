// Calls the tick function of every component in every active system.
function tickComponents(dt){
    for(var system of systems){
        if(!system.active){
            continue;
        }
        for(var component of system.components){
            component.tickFunction(dt);
        }
    }
}

function tick(dt){}