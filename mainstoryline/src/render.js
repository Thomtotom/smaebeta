function renderDrops() {
    for (var b = 0; b < dropblocs.length; b++) {
        var imgq = new Image();
        imgq.src = 'imgs/tiles-1.png';
        var dq = chooseBlock(dropblocs[b].item);
        myGameArea.context.drawImage(imgq, dq[0] * 32, dq[1] * 32, 32, 32, (dropblocs[b].xp - xpos + 3.3) * 100, (dropblocs[b].yp - ypos + 3.3) * 100, 40, 40);
        if ((Math.floor(xpos) == dropblocs[b].xp || Math.ceil(xpos) == dropblocs[b].xp) && (Math.floor(ypos) == dropblocs[b].yp || Math.ceil(ypos) == dropblocs[b].yp)) {
            myGameArea.add(dropblocs[b].item, dropblocs[b].num);
            dropblocs.splice(b, 1);
        }
    }
}
function renderBlocks() {
    var ctx = myGameArea.context;
    for (var r = Math.floor(ypos) - 5; r < Math.floor(ypos) + 5; r++) {
        for (var c = Math.floor(xpos) - 5; c < Math.floor(xpos) + 5; c++) {
            var imgs = new Image();
            imgs.src = 'imgs/tiles-1.png';
            if (r > 0 && c > 0 && r < 1000 && c < 1000) {
                var d = chooseBlock(blocks[r][c]);
                ctx.drawImage(imgs, d[0] * 32, d[1] * 32, 32, 32, (c - xpos + 3) * 100, (r - ypos + 3) * 100, 100, 100);
            }
        }
    }
}
function chooseBlock(e) {
    if (!blockimg[e]) {
        return [200, 200];
    }
    return [blockimg[e][0], blockimg[e][1]];
}
function renderPlayer(moved) {
    if (moved) {
        frameCount++;
        if (frameCount >= 5) {
            frameCount = 0;
            currentLoopIndex++;
            if (currentLoopIndex >= CYCLE_LOOP.length) {
                currentLoopIndex = 0;
            }
        }
    } else {
        currentLoopIndex = 0;
    }
    drawFrame(CYCLE_LOOP[currentLoopIndex], currentDirection, 300, 300);
}
function renderHotbar() {
    for (var w = 0; w < 7; w++) {
        var img3 = new Image();
        img3.src = 'imgs/system.png';
        myGameArea.context.fillStyle = (w == selectIndex ? 'gold' : 'grey');
        myGameArea.context.drawImage(img3, w == selectIndex ? 112 : 0,0,56,56,70 + (80 * w), 600, 80, 80);
        if (inventory[w]) {
            var gx = chooseBlock(inventory[w][0])[0] * 32, gy = chooseBlock(inventory[w][0])[1] * 32;
            var img = new Image();
            img.src = 'imgs/tiles-1.png';
            myGameArea.context.drawImage(img, gx, gy, 32, 32, 75 + (80 * w), 605, 70, 70);
            myGameArea.context.font = '20px Arial';
            myGameArea.context.fillStyle = 'white';
            myGameArea.context.fillText(inventory[w][1], 105 + w * 80, 675);
        }
    }
}
function renderItems() {
    for (var y = 0; y < 30; y++) {
        var gx = chooseBlock(inventory[y][0])[0] * 32, gy = chooseBlock(inventory[y][0])[1] * 32;
        var img = new Image();
        img.src = 'imgs/tiles-1.png';
        var img2 = new Image();
        img2.src = 'imgs/system.png';
        myGameArea.context.drawImage(img2, (y != invIndex ? (y <= 6 ? 56 : 0) : (y <= 6 ? 0 : 112)), y != invIndex ? 0 : (y <= 6 ? 56 : 0),56,56,50 + (56 * (y % 10)), 50 + 56 * Math.floor(y / 10), 56, 56);
        myGameArea.context.drawImage(img, gx, gy, 32, 32, 53 + (56 * (y % 10)), 53 + 56 * Math.floor(y / 10), 50, 50);
        myGameArea.context.font = '15px Arial';
        myGameArea.context.fillStyle = 'white';
        myGameArea.context.fillText(inventory[y][1], 80 + (y % 10) * 56, 100 + 56 * Math.floor(y / 10));
    }
}
function renderRecipes() {
    var arec = [], arecc = [];
    for (var x = 0; x < recipes.length; x++) {
        var o = 0;
        for (var m = 0; m < recipes[x][1].length; m++) {
            var t = [];
            for (var p = 0; p < inventory.length; p++) {
                t.push(inventory[p][0]);
            }
            if (t.indexOf(recipes[x][1][m][0]) == -1 || inventory[t.indexOf(recipes[x][1][m][0])][1] < recipes[x][1][m][1]) {
                o = 1;
            }
        }
        if (o == 0) {
            arec.push(recipes[x][0][0]);
            arecc.push(recipes[x]);
        }
    }
    for (var q in arec) {
        var gx = chooseBlock(arecc[q][0][0])[0] * 32, gy = chooseBlock(arecc[q][0][0])[1] * 32;
        var img = new Image();
        img.src = 'imgs/tiles-1.png';
        myGameArea.context.fillStyle = 'grey';
        myGameArea.context.fillRect(50 + (56 * (q % 10)), 250 + 56 * Math.floor(q / 10), 56, 56);
        myGameArea.context.font = '15px Arial';
        myGameArea.context.fillStyle = 'white';
        myGameArea.context.drawImage(img, gx, gy, 32, 32, 53 + (56 * (q % 10)), 253 + 56 * Math.floor(q / 10), 50, 50);
        myGameArea.context.fillText(arecc[q][0][1], 80 + (q % 10) * 56, 300 + 56 * Math.floor(q / 10));
    }
    return arecc;
}
function closeInventory() {
    var ime = new Image();
    ime.src = 'imgs/system.png';
    myGameArea.context.drawImage(ime, 56, 56, 56, 56, 650, 0, 50, 50);
    if ((myGameArea.click && myGameArea.x > 650 && myGameArea.x < 700 && myGameArea.y < 50) || (myGameArea.keys && (myGameArea.keys[69] || myGameArea.keys[101]))) {
        screenNum = 1;
        myGameArea.keys[101] = false;
        myGameArea.keys[69] = false;
        invIndex = -1;
    }
}