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