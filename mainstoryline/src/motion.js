const CYCLE_LOOP = [0, 1, 2, 3, 4, 5];
let currentDirection = 0, currentLoopIndex = 0, frameCount = 0, imgp = new Image();
function drawFrame(frameX, frameY, canvasX, canvasY) {
    myGameArea.context.drawImage(imgp, frameX * 32, frameY * 32, 32, 32, canvasX, canvasY, 100, 100);
}
function move() {
    var k = false;
    if (myGameArea.keys && (myGameArea.keys[37] || myGameArea.keys[97] || myGameArea.keys[65])) {
        if (walkable.includes(blocks[(Math.floor(ypos))][Math.floor(xpos - speed)]) && walkable.includes(blocks[(Math.ceil(ypos))][Math.floor(xpos - speed)])) {
            xpos -= speed;
            if (xpos <= 3) {
                xpos = 3;
            }
        }
        currentDirection = 0;
        k = true;
    } else if (myGameArea.keys && (myGameArea.keys[39] || myGameArea.keys[100] || myGameArea.keys[68])) {
        if (walkable.includes(blocks[(Math.floor(ypos))][Math.ceil(xpos + speed)]) && walkable.includes(blocks[(Math.ceil(ypos))][Math.ceil(xpos + speed)])) {
            xpos += speed;
            if (xpos >= width - 4) {
                xpos = width - 4;
            
            }
        }
        currentDirection = 1;
        k = true;
    }
    if (myGameArea.keys && (myGameArea.keys[38] || myGameArea.keys[119] || myGameArea.keys[87])) {
        if (walkable.includes(blocks[(Math.floor(ypos - speed))][Math.floor(xpos)]) && walkable.includes(blocks[(Math.floor(ypos - speed))][Math.ceil(xpos)])) {
            ypos -= speed;
            if (ypos <= 3) {
                ypos = 3;
            }
        }
        k = true;
    } else if (myGameArea.keys && (myGameArea.keys[40] || myGameArea.keys[115] || myGameArea.keys[83])) {
        if (walkable.includes(blocks[(Math.ceil(ypos + speed))][Math.floor(xpos)]) && walkable.includes(blocks[(Math.ceil(ypos + speed))][Math.ceil(xpos)])) {
            ypos += speed;
            if (ypos >= height - 4) {
                ypos = height - 4;
            }
        }
        k = true;
    }
    return k;
}