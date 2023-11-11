# **CelestialJS v3**

CelestialJS is a game engine for two dimensional browser games. The game engine is written in pure javascript and makes it much easier for a user to create javascript games.


## **Requirements**

**1 | Scenes**

Every area or “level” in a game is represented by a scene instance. Each scene instance contains an array of layers, and an array of cameras.



* **1.1 | Layers**

    Layers are objects within a scene’s layer array that contain entities within the scene. Layers are drawn one over the other. Each layer instance has an array containing entities.

* **1.1.1 | Entities**

    Almost everything that is displayed on the screen is an entity. Every “object” in the game is represented by an entity. Each entity has a 2d position in its layer, a rotation in its layer, a 2d size, and an image. An entity cannot be in more than one layer, but the user can create sub classes of the entity class if they want to use a certain type of entity more than once in the game.

* **1.2 | Cameras**

    A camera represents a 2d perspective within its scene. When a scene is drawn on the screen, it is drawn through one of the camera’s perspectives. Each camera has a width and height of capture, a rotation, and a 2d position in its scene. A camera cannot be in more than one scene, but the user can create sub classes of the camera class if they want to use a certain type of camera more than once in the game.


**2 | Systems**

Every type of interaction between entities in the game happens within a system. A system represents a group of entities and subsystems that can interact with each other in various ways. A system has a list of parts. These can include references to entities, cameras, and more systems.



* **2.1 | Components**

    Components are the interactions and actions that can affect the objects in your game. For example, a component can simulate 2d physics between entities or allow the player to move an entity using keyboard or mouse input.


    A component affects a specified system, and consists of a function that is called at the start of the game, and a function that happens every game tick (an infinite loop). These functions are created by the user and have access to the components system and everything within that system. A component can change and add properties to the parts of its system, and can add and remove objects from any scene in the game. The user can create sub classes for components if they want multiple systems to have the same component.


**3 | Screens**

An instance of the screen class represents a state that the player’s screen can be in. For example, one instance can represent the menu screen of the game, while another represents the screen that displays a scene. Every screen contains an array of screen sections, and a user written function that is called every game tick. This function may be used to draw things like text and buttons onto the screen.



* **3.1 | Screen sections**

    A screen section is an area on the screen where a scene is drawn. Each screen section has a reference to the scene that is drawn in it, a pointer to the camera that is used as a perspective within the scene, a position on the screen, a 2d scale from scene units to pixels, a rotation on the screen, and a renderer function.

* **3.1.1 | Renderers**

    A renderer is a function that ultimately takes all of the properties of a screen section, and uses them to draw the scene onto the screen. The renderer function of each screen section is called every frame (an infinite loop). The game engine has a built in renderer that can be used, but the user can create their own renderer to fit their game’s needs. 



## **Design**

**Scenes**

A global map called “scenes”. Every scene in the game is stored here. Each entry of this map has a key string representing the name of the scene, and a value which is an instance of the Scene class. The user of the game engine adds entries to the map when they create scenes.

**Scene**

A class called “Scene” with a constructor with the following parameters:



* An array of layer instances.
* An array of camera instances.

The constructor stores both of these parameters as the properties “layers” and “cameras”.

**Layer**

A class called “Layer”  with a constructor with the following parameters:



* An array of entity instances.

The constructor stores this parameter as a property called “entities”.

**Entity**

A class called “Entity” with a constructor with the following parameters:



* A 2d vertex representing the position of the entity within the scene.
* A 2d vertex representing the width and height of the entity.
* An image pointer representing the image of the entity.
* The rotation of the entity within the scene in radians.

The constructor stores all of these parameters as the properties “pos”, “size”, “image”, and “rotation”.

**Camera**

A class called “Camera” with a constructor with the following properties:



* A 2d vertex representing the position of the camera within the scene.
* A 2d vertex representing the capture width and height of the camera within the scene.
* The rotation of the camera within the scene in radians.

The constructor stores both of these parameters as the properties “pos”, “size”, and “rotation”.

**Systems**

A global map called “systems”. Every system in the game is stored here. Each entry of this map has a key string representing the name of the system, and a value which is an instance of the System class. The user of the game engine adds entries to the map when they create systems.

**System**

A class called “System” with a constructor with the following parameters:



* An array of pointers towards entity instances and other system instances, representing the parts of the system.
* An array of component instances.

The constructor stores both of these parameters as the properties “parts”, and “components”. The system also has a property “active” which is a boolean representing whether or not the system is currently active.

The system class has the following methods:



* “activate”. Changes its active property to true and calls all of its component’s start functions.
* “deactivate”. Changes its active property to false.

**Component**

A class called “Component” with a constructor with the following parameters:



* A start function. A function that is called when the system is activated. Takes the system itself as a parameter.
* A tick function. A function that is called every game tick if the system is active. Takes the system itself  and the delta time as parameters.

The constructor stores these parameters as the properties “startFunction”, and “tickFunction”.

**Screens**

A global map called “screens”. Every screen in the game is stored here. Each entry of this map has a key string representing the name of the screen, and a value which is an instance of the Screen class. The user of the game engine adds entries to the map when they create screens.

**Screen**

A class called “Screen” with a constructor with the following parameters:



* An array of Screen Section instances representing the scenes that are drawn on the screen.
* A function that gets called every frame when the screen is active.

The constructor stores these parameters as the properties “sections”, and “frameFunction”. The constructor class has the following methods:



* “draw”. Draws all of the screen sections and then calls the frame function. This method is called every frame when the screen is active.

**Screen Section**

A class called “ScreenSection” with constructor with a constructor the following parameters:



* A 2d vertex representing the position of the center of the screen section within the screen.
* A 2d vertex representing the scale from scene units to pixels on the screen.
* A number representing the rotation of the screen section on the screen.
* A pointer to the camera that is being used.
* A pointer to the scene that is being displayed.
* The renderer function.

The constructor stores these parameters as the properties “pos”, “scale”, “rotation”, “camera”, “scene”, and “renderer”. The class has the following methods:



* “render”. Translates to the correct area on the screen, clips the correct area on the screen, translates and rotates to the camera’s position, calls the renderer function, and then restores the context.

**Renderer**

A renderer function takes the following parameters:



* A pointer to the scene that should be rendered.

**Game Loop**

A function that is called in an infinite loop “FPS” times per second. This function calls the tick function of every component in every active system, then calls the “draw" method for “screens.get(currentScreen)”.
