function gameLoop(){
    // Calculate the delta time.
    var dt = 1 / FPS;
    tickComponents(dt);
    tick(dt);
}