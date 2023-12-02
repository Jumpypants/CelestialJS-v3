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
    const newX = cosAngle * v.x + sinAngle * v.y;
    const newY = -sinAngle * v.x + cosAngle * v.y;
    return new V2(newX, newY);
}

function dotV2(v1, v2){
    return v1.x * v2.x + v1.y * v2.y;
}

function unitV2(a){
    return new V2(Math.cos(a), -Math.sin(a));
}

function angleFromToV2(f, t) {
    return Math.atan2(-t.y * f.x + t.x * f.y, t.x * f.x + t.y * f.y);
}

function rotate90degreesV2(v){
    return new V2(-v.y, v.x);
}