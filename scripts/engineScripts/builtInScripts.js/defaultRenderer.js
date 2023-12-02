function defaultRenderer(scene){
    for(var layer of scene.layers){
        var parallax = 1 / layer.distance;
        for(var entity of layer.entities){
            ctx.save();
            ctx.translate(entity.pos.x * parallax, entity.pos.y * parallax);
            ctx.rotate(entity.rotation);
            if(entity.image == null){
                ctx.fillStyle = "red";
                ctx.fillRect(-entity.size.x / 2, -entity.size.y / 2, entity.size.x, entity.size.y);
            } else if(entity.imageSection == null){
                ctx.drawImage(entity.image, -entity.size.x / 2, -entity.size.y / 2, entity.size.x, entity.size.y);
            } else {
                ctx.drawImage(entity.image,
                    entity.imageSection.pos.x,
                    entity.imageSection.pos.y,
                    entity.imageSection.size.x,
                    entity.imageSection.size.y,
                    -entity.size.x / 2,
                    -entity.size.y / 2,
                    entity.size.x, entity.size.y);
            }
            ctx.restore();
        }
    }
}