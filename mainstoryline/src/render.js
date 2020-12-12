"use strict";
var ime = new Image();
ime.src = 'imgs/system.png';
var imc = new Image();
imc.src = 'imgs/crack.png';
var imt = new Image();
imt.src = 'imgs/tiles-1.png';
var imm = new Image();
imm.src = 'imgs/mobnew.png';
var imh = new Image();
imh.src = 'imgs/system-32.png';
function renderHealth() {
    for (var x = 0; x < playerHealth; x++) {
        myGameArea.context.drawImage(imh, (playerHealth % 2 == 1 && x == playerHealth - 1 ? 96 :(x % 2 >= 1 ? 64 : 32)), 0, 32, 32, 6 + 16 * (x % 20), 568 - 32 * Math.floor(x / 20), 32, 32);
    }
    for (var x = playerHealth; x < maxHealth; x++) {
        myGameArea.context.drawImage(imh, (maxHealth % 2 == 1 && x == maxHealth - 1 ? 192 : (x % 2 >= 1 ? 160 : 128)), 0, 32, 32, 6 + 16 * (x % 20), 568 - 32 * Math.floor(x / 20), 32, 32);
    }
    if (playerHealth < maxHealth) {
        regenCount++;
        if (regenCount == 50) {
            regenCount = 0;
            playerHealth++;
        }
    }
    if (playerHealth <= 0) {
        screenNum = 4;
        for (var o = 0; o < inventory.length; o++) {
            dropblocs.push({
                xp: xpos,
                yp: ypos,
                item: inventory[o][0],
                num: inventory[o][1],
            });
            inventory[o] = ['e', ''];
        }
        deathX = xpos;
        deathY = ypos;
        xpos = spawnx;
        ypos = spawny;
    }
}
function renderDrops() {
    for (var b = 0; b < dropblocs.length; b++) {
        var dq = chooseBlock(dropblocs[b].item);
        if (dropblocs[b].num > 0) {
            myGameArea.context.drawImage(imt, dq[0] * 32, dq[1] * 32, 32, 32, (dropblocs[b].xp - xpos + 3.3) * 100, (dropblocs[b].yp - ypos + 3.3) * 100, 40, 40);
            var k = 0;
            for (var x = 0; x < inventory.length; x++) {
                if (inventory[x][1] == '' || (inventory[x][0] == dropblocs[b].item && inventory[x][1] < (data.ms[dropblocs[b].item] ?? 64))) {
                    k = 1;
                    break;
                }
            }
            if ((((xpos - dropblocs[b].xp) ** 2) + ((ypos - dropblocs[b].yp) ** 2)) ** (1 / 2) <= 1 && k == 1) {
                myGameArea.add(dropblocs[b].item, dropblocs[b].num);
                dropblocs.splice(b, 1);
            }
        }
    }
}
function renderBlocks() {
    var ctx = myGameArea.context;
    for (var r = Math.floor(ypos) - 5; r < Math.floor(ypos) + 5; r++) {
        for (var c = Math.floor(xpos) - 5; c < Math.floor(xpos) + 5; c++) {
            if (r > 0 && c > 0 && r < 1000 && c < 1000) {
                var d = chooseBlock(blocks[r][c]);
                ctx.drawImage(imt, d[0] * 32, d[1] * 32, 32, 32, (c - xpos + 3) * 100, (r - ypos + 3) * 100, 100, 100);
            }
        }
    }
}
function chooseBlock(e) {
    if (!blockimg[e]) {
        return [200, 200,false];
    }
    return [blockimg[e][0], blockimg[e][1],true];
}
function renderPlayer(moved) {
    if (moved || myGameArea.keys[32]) {
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
    for (var x = 0; x < mobs.length; x++) {
        if ((((mobs[x].x - xpos) ** 2) + ((mobs[x].y - ypos) ** 2)) ** (1 / 2) < 1 / 2 && dmgcount == 0) {
            dmgcount = 12;
            playerHealth--;
        }
    }
    if (dmgcount > 0) {
        dmgcount--;
    }
    drawFrame(CYCLE_LOOP[currentLoopIndex], currentDirection + (myGameArea.keys[32] ? 4 : (moved ? 0 : 2)) + (dmgcount > 0 ? 6 : 0), 300, 300);
}
function renderHotbar() {
    for (var w = 0; w < 7; w++) {
        myGameArea.context.fillStyle = (w == selectIndex ? 'gold' : 'grey');
        myGameArea.context.drawImage(ime, w == selectIndex ? 112 : 0,0,56,56,70 + (80 * w), 600, 80, 80);
        if (inventory[w]) {
            var gx = chooseBlock(inventory[w][0])[0] * 32, gy = chooseBlock(inventory[w][0])[1] * 32;
            myGameArea.context.drawImage(imt, gx, gy, 32, 32, 75 + (80 * w), 605, 70, 70);
            if (inventory[w][1] > 1) {
                myGameArea.context.font = '20px Arial';
                myGameArea.context.fillStyle = 'white';
                myGameArea.context.fillText(inventory[w][1], 105 + w * 80, 675);
            }
        }
    }
}
function slotSwitch() {
    if (myGameArea.keys && myGameArea.keys[49]) {
        selectIndex = 0;
    }
    if (myGameArea.keys && myGameArea.keys[50]) {
        selectIndex = 1;
    }
    if (myGameArea.keys && myGameArea.keys[51]) {
        selectIndex = 2;
    }
    if (myGameArea.keys && myGameArea.keys[52]) {
        selectIndex = 3;
    }
    if (myGameArea.keys && myGameArea.keys[53]) {
        selectIndex = 4;
    }
    if (myGameArea.keys && myGameArea.keys[54]) {
        selectIndex = 5;
    }
    if (myGameArea.keys && myGameArea.keys[55]) {
        selectIndex = 6;
    }
}
function renderDeath() {
    myGameArea.context.fillStyle = 'maroon';
    myGameArea.context.fillRect(0, 0, 700, 700);
    myGameArea.context.font = '50px Arial';
    myGameArea.context.fillStyle = 'white';
    myGameArea.context.fillText('You died!', 250, 200);
    myGameArea.context.fillStyle = '#555';
    myGameArea.context.fillRect(300, 500, 100, 50);
    myGameArea.context.font = '22px Arial';
    myGameArea.context.fillStyle = 'white';
    myGameArea.context.fillText('Respawn', 305, 530);
    if (myGameArea.click && myGameArea.x > 300 && myGameArea.y > 500 && myGameArea.x < 400 && myGameArea.y < 550) {
        screenNum = 1;
        playerHealth = maxHealth;
    }
}