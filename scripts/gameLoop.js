function gameLoop(){
    // Calculate the delta time.
    var dt = 1 / FPS;
    // Call component tick functions.
    tickComponents(dt);
    // Call the user's tick function.
    tick(dt);
    // Draw the current screen.
    screens.get(currentScreen).draw();
}