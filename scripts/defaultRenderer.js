function defaultRenderer(scene){
    for(var layer of scene.layers){
        for(var entity of layer.entities){
            ctx.save();
            ctx.translate(entity.pos.x, entity.pos.y);
            ctx.rotate(entity.rotation);
            ctx.fillStyle = "red";
            ctx.fillRect(-entity.size.x / 2, -entity.size.y / 2, entity.size.x, entity.size.y);
            ctx.restore();
        }
    }
}