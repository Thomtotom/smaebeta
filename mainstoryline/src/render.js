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
var ima = new Image();
ima.src = 'imgs/armor.png';
function renderInHand(){
    if(myGameArea.keys[32]){
        var os = -1;
        if(currentDirection == 1){
            var ng = (currentLoopIndex * 6 + frameCount + os) >= 15 ? (Math.PI) - Math.PI * (currentLoopIndex * 6 + frameCount + os) / 30 : Math.PI * (currentLoopIndex * 6 + frameCount + os) / 30;
            myGameArea.context.save();
            myGameArea.context.translate(350 + 20 * Math.cos(ng),350 + 20 * Math.sin(ng));
            myGameArea.context.rotate(ng);
            myGameArea.context.drawImage(imt,32 * chooseBlock(inventory[selectIndex][0])[0],32 * chooseBlock(inventory[selectIndex][0])[1],32,32,0, -64, 64, 64);
            myGameArea.context.restore();
        } else {
            var ng = (currentLoopIndex * 6 + frameCount + os) >= 15 ? (Math.PI / 2) + Math.PI * (currentLoopIndex * 6 + frameCount + os) / 30 : (Math.PI / -2) +  Math.PI * (currentLoopIndex * 6 + frameCount + os) / -30;
            myGameArea.context.save();
            myGameArea.context.translate(350 + 20 * Math.cos(ng),370 + 20 * Math.sin(ng));
            myGameArea.context.rotate(ng);
            myGameArea.context.drawImage(imt,32 * chooseBlock(inventory[selectIndex][0])[0],32 * chooseBlock(inventory[selectIndex][0])[1],32,32,0, -64, 64, 64);
            myGameArea.context.restore();
        }
    }
}
function renderData(){
    if(myGameArea.keys && (myGameArea.keys[102] || myGameArea.keys[70])){
        if(datashow){
            datashow = false;
        } else {
            datashow = true;
        }
        myGameArea.keys[102] = false;
        myGameArea.keys[70] = false;
    }
    if(datashow){
        myGameArea.context.globalAlpha = 0.4;
        myGameArea.context.fillStyle = 'black';
        myGameArea.context.fillRect(0,0,700,200);
        myGameArea.context.globalAlpha = 1;
        myGameArea.context.fillStyle = 'white';
        myGameArea.context.font = '20px Arial';
        myGameArea.context.fillText('X: ' + xpos,10,30);
        myGameArea.context.fillText('Y: ' + ypos,10,60);
        myGameArea.context.fillText('Current biome: ' + (biomes[Math.round(ypos) * width + Math.round(xpos)][0].toUpperCase() + biomes[Math.round(ypos) * width + Math.round(xpos)].slice(1)),10,90);
        myGameArea.context.fillText('Standing on: ' + data.viewdata[blocks[Math.round(ypos)][Math.round(xpos)]].split('*')[0],10,150);
        myGameArea.context.fillText('Looking at: ' + (data.viewdata[blocks[Math.round(ypos)][((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1))]] ?? 'Void').split('*')[0],10,120);
    }
}
function renderPlayerArmor(moved) {
    var charRow;
    if (currentDirection == 1) {
        if (myGameArea.keys && myGameArea.keys[32]) {
            charRow = 'ar';
        } else if (moved) {
            charRow = 'r';
        } else {
            charRow = 'sr';
        }
    } else {
        if (myGameArea.keys && myGameArea.keys[32]) {
            charRow = 'al';
        } else if (moved) {
            charRow = 'l';
        } else {
            charRow = 'sl';
        }
    }
    if (data.armordraw[equipped.h[0]]) {
        myGameArea.context.drawImage(ima, CYCLE_LOOP[currentLoopIndex] * 32, data.armordraw[equipped.h[0]][charRow] * 32, 32, 32, 302, 302, 96, 96);
    }
    if (data.armordraw[equipped.b[0]]) {
        myGameArea.context.drawImage(ima, CYCLE_LOOP[currentLoopIndex] * 32, data.armordraw[equipped.b[0]][charRow] * 32, 32, 32, 302, 302, 96, 96);
    }
    if (data.armordraw[equipped.l[0]]) {
        myGameArea.context.drawImage(ima, CYCLE_LOOP[currentLoopIndex] * 32, data.armordraw[equipped.l[0]][charRow] * 32, 32, 32, 302, 302, 96, 96);
    }
    if (data.armordraw[equipped.c[0]]) {
        myGameArea.context.drawImage(ima, CYCLE_LOOP[currentLoopIndex] * 32, data.armordraw[equipped.c[0]][charRow] * 32, 32, 32, 302, 302, 96, 96);
    }
    if(equipped.b[0] === 'sb' && biomes[Math.round(ypos) * width + Math.round(xpos)] == 'desert'){
        speed = 0.125;
        xpos = xpos - (xpos % 0.125);
        ypos = ypos - (ypos % 0.125);
    } else {
        speed = 0.0625;
    }
}
function renderHealth() {
    for (var x = 0; x < Math.ceil(playerHealth); x++) {
        myGameArea.context.drawImage(imh, (Math.ceil(playerHealth) % 2 == 1 && x == Math.ceil(playerHealth) - 1 ? 96 :(x % 2 >= 1 ? 64 : 32)), 0, 32, 32, 6 + 16 * (x % 20), 568 - 32 * Math.floor(x / 20), 32, 32);
    }
    for (var x = Math.ceil(playerHealth); x < maxHealth; x++) {
        myGameArea.context.drawImage(imh, (maxHealth % 2 == 1 && x == maxHealth - 1 ? 192 : (x % 2 >= 1 ? 160 : 128)), 0, 32, 32, 6 + 16 * (x % 20), 568 - 32 * Math.floor(x / 20), 32, 32);
    }
    if (playerHealth < maxHealth) {
        regenCount++;
        if (regenCount == 50) {
            regenCount = 0;
            playerHealth++;
            if (playerHealth > maxHealth) {
                playerHealth = maxHealth;
            }
        }
    }
    if (playerHealth <= 0) {
        screenNum = 4;
        for (var o = 0; o < inventory.length; o++) {
            var ng = Math.random() * Math.PI * 2;
            dropblocs.push({
                xp: xpos + ((Math.random() ** (1/2)) * 3) * Math.cos(ng),
                yp: ypos + ((Math.random() ** (1/2)) * 3) * Math.sin(ng),
                item: inventory[o][0],
                num: inventory[o][1],
            });
            inventory[o] = ['e', ''];
        }
        for (var k in equipped) {
            var ng = Math.random() * Math.PI * 2;
            dropblocs.push({
                xp: xpos + ((Math.random() ** (1/2)) * 3) * Math.cos(ng),
                yp: ypos + ((Math.random() ** (1/2)) * 3) * Math.sin(ng),
                item: equipped[k][0],
                num: equipped[k][1],
            });
            equipped[k] = ['e','']
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
            myGameArea.context.drawImage(imt, dq[0] * 32, dq[1] * 32, 32, 32, (dropblocs[b].xp - xpos + (3.34 + 14/96)) * 96, (dropblocs[b].yp - ypos + (3.34 + 14/96)) * 96, 32, 32);
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
    for (var r = Math.floor(ypos) - 6; r < Math.floor(ypos) + 6; r++) {
        for (var c = Math.floor(xpos) - 6; c < Math.floor(xpos) + 6; c++) {
            if (r > 0 && c > 0 && r < 1000 && c < 1000) {
                var d = chooseBlock(blocks[r][c]);
                ctx.drawImage(imt, d[0] * 32, d[1] * 32, 32, 32, (c - xpos + (3 + 14/96)) * 96, (r - ypos + (3 + 14/96)) * 96, 96, 96);
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
            playerHealth -= data.mobs[mobs[x].name].dmg * (1 / (1 + ((data.armordef[equipped.h[0]] + data.armordef[equipped.c[0]] + data.armordef[equipped.b[0]] + data.armordef[equipped.l[0]]) / 10)));
        }
    }
    if (dmgcount > 0) {
        dmgcount--;
    }
    drawFrame(CYCLE_LOOP[currentLoopIndex], currentDirection + (myGameArea.keys[32] ? 4 : (moved ? 0 : 2)) + (dmgcount > 0 ? 6 : 0), 302, 302);
    return moved;
}
function renderHotbar() {
    for (var w = 0; w < 7; w++) {
        myGameArea.context.drawImage(ime, w == selectIndex ? 140 : 0, 0, 70, 70, 105 + (70 * w), 600, 70, 70);
        if (inventory[w]) {
            var gx = chooseBlock(inventory[w][0])[0] * 32, gy = chooseBlock(inventory[w][0])[1] * 32;
            myGameArea.context.drawImage(imt, gx, gy, 32, 32, 108 + (70 * w), 603, 64, 64);
            if (inventory[w][1] > 1) {
                myGameArea.context.font = '20px Arial';
                myGameArea.context.fillStyle = 'white';
                myGameArea.context.fillText(inventory[w][1], 145 + w * 70, 665);
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
function renderTitleScreen(){
    myGameArea.context.drawImage(bImage, 0, 0, 700, 700);
    myGameArea.context.fillStyle = 'lightgrey';
    myGameArea.context.fillRect(250,250,200,75);
    myGameArea.context.fillRect(250,350,200,75);
    myGameArea.context.fillStyle = 'black';
    myGameArea.context.fillRect(253,253,194,69);
    myGameArea.context.fillRect(253,353,194,69);
    myGameArea.context.fillStyle = 'lightgrey';
    myGameArea.context.fillRect(255,255,190,65);
    myGameArea.context.fillRect(255,355,190,65);
    myGameArea.context.fillStyle = 'black';
    myGameArea.context.font= '35px Arial';
    myGameArea.context.fillText('New game',260,300);
    myGameArea.context.fillText('Load game',260,400);
    if (myGameArea.x > 250 && myGameArea.y > 250 && myGameArea.x < 450 && myGameArea.y < 325 && myGameArea.click) {
        loadTiles(Math.floor(Math.random() * 1000000000));
        spawnx = Math.floor(Math.random() * 990) + 5;
        spawny = Math.floor(Math.random() * 990) + 5;
        while (blocks[spawny][spawnx] != 'g') {
            spawnx = Math.floor(Math.random() * 990) + 5;
            spawny = Math.floor(Math.random() * 990) + 5;
        }
        xpos = spawnx;
        ypos = spawny;
        loadMap();
        screenNum = 1;
    }
    if (myGameArea.x > 250 && myGameArea.y > 350 && myGameArea.x < 450 && myGameArea.y < 425 && myGameArea.click) {
        document.getElementById('upload').hidden = false;
        document.getElementById('canvas').hidden = true;
        myGameArea.click = false;
    }
}
function standingOn(x){
    if(blocks[Math.floor(ypos)][Math.ceil(xpos)] == x){
        return [Math.floor(ypos),Math.ceil(xpos)];
    } 
    if(blocks[Math.ceil(ypos)][Math.ceil(xpos)] == x){
        return [Math.ceil(ypos),Math.ceil(xpos)];
    }
    if(blocks[Math.floor(ypos)][Math.floor(xpos)] == x){
        return [Math.floor(ypos),Math.floor(xpos)];
    }
    if(blocks[Math.ceil(ypos)][Math.floor(xpos)] == x){
        return [Math.ceil(ypos),Math.floor(xpos)];
    }
    return false;
}
function getTrapped(){
    for(var c in data.traps){
        if(standingOn(c)){
            dmgcount = 12;
            playerHealth -= data.traps[c] * (1 / (1 + ((data.armordef[equipped.h[0]] + data.armordef[equipped.c[0]] + data.armordef[equipped.b[0]] + data.armordef[equipped.l[0]]) / 10)));
            blocks[standingOn(c)[0]][standingOn(c)[1]] = data.defaultTile[biomes[standingOn(c)[0] * width + standingOn(c)[1]]];
        }
    }
}