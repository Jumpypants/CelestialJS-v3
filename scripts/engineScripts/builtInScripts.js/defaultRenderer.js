function defaultRenderer(scene){
    for(var layer of scene.layers){
        var parallax = 1 / layer.distance;
        for(var entity of layer.entities){
            ctx.save();
            ctx.translate(entity.pos.x * parallax, entity.pos.y * parallax);
            ctx.rotate(entity.rotation);

            entity.draw();

            ctx.restore();
        }
    }
}