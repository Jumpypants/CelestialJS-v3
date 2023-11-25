class System {
    constructor(parts, components, activate){
        this.isSystem = true;
        // An array of pointers for entities and other systems representing the parts of the system.
        this.parts = parts;
        // An array of the components affecting the system.
        this.components = components;
        // A boolean representing whether or not the system is active.
        this.active = false;
        if(activate){
            this.activate();
        }
    }

    activate(){
        // Set the system state to active.
        this.active = true;
        // Call the start function for each component.
        for(var component of this.components){
            component.startFunction(this);
        }
    }

    deactivate(){
        // Set the system state to deactive.
        this.active = false;
    }

    getAll(){
        // Returns every entity and camera that is part of the system and its sub-systems.
        var allEntites = [];
        for(var part of this.parts){
            if(part.isSystem){
                allEntites.push(...part.getAll());
            } else {
                allEntites.push(part);
            }
        }
        return allEntites;
    }
}