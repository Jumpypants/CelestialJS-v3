class V2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function addV2(v1, v2){
    return new V2(v1.x + v2.x, v1.y + v2.y);
}

function subV2(v1, v2){
    return new V2(v1.x - v2.x, v1.y - v2.y);
}

function copyV2(v){
    return new V2(v.x, v.y);
}

function absV2(v){
    return Math.hypot(v.x, v.y);
}

function multV2S(v, s){
    return new V2(v.x * s, v.y * s);
}

function rotateV2(v, r) {
    const cosAngle = Math.cos(r);
    const sinAngle = Math.sin(r);
    const newX = cosAngle * v.x - sinAngle * v.y;
    const newY = sinAngle * v.x + cosAngle * v.y;
    return new V2(newX, newY);
}
