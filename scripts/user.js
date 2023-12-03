var cam1 = new Camera(new V2(0, 0), new V2(500, 500), 0, []);
var player = new Entity(new V2(0, 0), new V2(30, 50), 0.5, null, []);

scenes.set("scene1", new Scene([new Layer([player, new Entity(new V2(0, 0), new V2(30, 50), -0.5, null, [])], 1)], [cam1]));
screens.set("screen1", new Screen([new ScreenSection(new V2(300, 300), new V2(1, 1), 0, cam1, scenes.get("scene1"), defaultRenderer), new ScreenSection(new V2(700, 300), new V2(0.3, 0.3), 0.5, cam1, scenes.get("scene1"), defaultRenderer)], function(){}));
systems.set("player system", new System([player], [new Component(function(system){}, function(system, dt){
    for(var part of system.parts){
        part.pos.x += 10 * dt;
        part.pos.y += 10 * dt;
        part.rotation += 2 * Math.PI * dt;
    }

})]));

systems.get("player system").activate();
console.log(systems.get("player system").getAll());

FPS = 60;

init();