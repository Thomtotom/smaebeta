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
}
function renderDrops() {
    for (var b = 0; b < dropblocs.length; b++) {
        var dq = chooseBlock(dropblocs[b].item);
        if (dropblocs[b].num > 0) {
            myGameArea.context.drawImage(imt, dq[0] * 32, dq[1] * 32, 32, 32, (dropblocs[b].xp - xpos + 3.3) * 100, (dropblocs[b].yp - ypos + 3.3) * 100, 40, 40);
            if ((((xpos - dropblocs[b].xp) ** 2) + ((ypos - dropblocs[b].yp) ** 2)) ** (1 / 2) <= 1) {
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
            myGameArea.context.font = '20px Arial';
            myGameArea.context.fillStyle = 'white';
            myGameArea.context.fillText(inventory[w][1], 105 + w * 80, 675);
        }
    }
}
function renderItems() {
    for (var y = 0; y < 30; y++) {
        var gx = chooseBlock(inventory[y][0])[0] * 32, gy = chooseBlock(inventory[y][0])[1] * 32;
        myGameArea.context.drawImage(ime, (y != invIndex ? (y <= 6 ? 56 : 0) : (y <= 6 ? 0 : 112)), y != invIndex ? 0 : (y <= 6 ? 56 : 0),56,56,50 + (56 * (y % 10)), 50 + 56 * Math.floor(y / 10), 56, 56);
        myGameArea.context.drawImage(imt, gx, gy, 32, 32, 53 + (56 * (y % 10)), 53 + 56 * Math.floor(y / 10), 50, 50);
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
        if (o == 0 && isNearby(recipes[x][2])) {
            arec.push(recipes[x][0][0]);
            arecc.push(recipes[x]);
        }
    }
    for (var q in arec) {
        var gx = chooseBlock(arecc[q][0][0])[0] * 32, gy = chooseBlock(arecc[q][0][0])[1] * 32;
        myGameArea.context.fillStyle = 'grey';
        myGameArea.context.fillRect(50 + (56 * (q % 10)), 250 + 56 * Math.floor(q / 10), 56, 56);
        myGameArea.context.font = '15px Arial';
        myGameArea.context.fillStyle = 'white';
        myGameArea.context.drawImage(imt, gx, gy, 32, 32, 53 + (56 * (q % 10)), 253 + 56 * Math.floor(q / 10), 50, 50);
        myGameArea.context.fillText(arecc[q][0][1], 80 + (q % 10) * 56, 300 + 56 * Math.floor(q / 10));
    }
    return arecc;
}
function closeInventory() {
    myGameArea.context.drawImage(ime, 56, 56, 56, 56, 650, 0, 50, 50);
    if ((myGameArea.click && myGameArea.x > 650 && myGameArea.x < 700 && myGameArea.y < 50) || (myGameArea.keys && (myGameArea.keys[69] || myGameArea.keys[101]))) {
        screenNum = 1;
        myGameArea.keys[101] = false;
        myGameArea.keys[69] = false;
        invIndex = -1;
    }
    document.getElementById("canvas").style.cursor = 'default';
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
function renderCursor() {
    if (chooseBlock(inventory[selectIndex][0])[2]) {
        document.getElementById("canvas").style.cursor = 'none';
        myGameArea.context.drawImage(imt, 32 * chooseBlock(inventory[selectIndex][0])[0], 32 * chooseBlock(inventory[selectIndex][0])[1], 32, 32, myGameArea.ax - 32, myGameArea.ay - 32, 64, 64);
    } else {
        document.getElementById("canvas").style.cursor = 'default';
    }
}
function mob(name) {
    this.x = Math.floor(Math.random() * 994) + 3; this.y = Math.floor(Math.random() * 994) + 3;
    while (biomes[this.y * width + this.x] != data.mobs[name].spawn) {
        this.x = Math.floor(Math.random() * 994) + 3;
        this.y = Math.floor(Math.random() * 994) + 3;
    }
    this.dmgc = 0;
    this.ch = true;
    this.h = data.mobs[name].health;
    this.t = data.mobs[name].type;
    this.ng = 0;
    this.d = data.mobs[name].drop;
    this.fc = 0;
    this.fi = 0;
    this.l = data.mobs[name].cycleLoop;
    this.render = function () {
        if (this.ch) {
            this.move();
            if ((this.x - xpos + 3) * 100 < 850 && (this.y - ypos + 3) * 100 < 850 && (this.x - xpos + 3) * 100 > -150 && (this.y - ypos + 3) * 100 > -150) {
                this.fc++;
                if (this.fc == data.mobs[name].framerate) {
                    this.fc = 0;
                    this.fi++;
                    if (this.fi == this.l.length - 1) {
                        this.fi = 0;
                    }
                }
                if (this.dmgc > 0) {
                    this.dmgc--;
                    if (this.ng > Math.PI * 3 / 2 || this.ng < Math.PI / 2) {
                        myGameArea.context.drawImage(imm, 32 * this.l[this.fi], 32 * data.mobs[name].get['dr'], 32, 32, (this.x - xpos + 3) * 100, (this.y - ypos + 3) * 100, 100, 100);
                    } else {
                        myGameArea.context.drawImage(imm, 32 * this.l[this.fi], 32 * data.mobs[name].get['dl'], 32, 32, (this.x - xpos + 3) * 100, (this.y - ypos + 3) * 100, 100, 100);
                    }
                } else {
                    if (this.ng > Math.PI * 3 / 2 || this.ng < Math.PI / 2) {
                        myGameArea.context.drawImage(imm, 32 * this.l[this.fi], 32 * data.mobs[name].get['r'], 32, 32, (this.x - xpos + 3) * 100, (this.y - ypos + 3) * 100, 100, 100)
                    } else {
                        myGameArea.context.drawImage(imm, 32 * this.l[this.fi], 32 * data.mobs[name].get['l'], 32, 32, (this.x - xpos + 3) * 100, (this.y - ypos + 3) * 100, 100, 100)
                    }
                }
            }
        }
    }; 
    this.ac = 0;
    this.dy = function (e) {
        if (e > 0) {
            if (walkable.includes(blocks[(Math.floor(this.y - e))][Math.floor(this.x)]) && walkable.includes(blocks[(Math.floor(this.y - e))][Math.ceil(this.x)])) {
                this.y -= e;
            }
        } else {
            if (walkable.includes(blocks[(Math.ceil(this.y + e))][Math.floor(this.x)]) && walkable.includes(blocks[(Math.ceil(this.y + e))][Math.ceil(this.x)])) {
                this.y -= e;
            }
        }
    };
    this.dx = function (e) {
        if (e > 0) {
            if (walkable.includes(blocks[(Math.floor(this.y))][Math.ceil(this.x + e)]) && walkable.includes(blocks[(Math.ceil(this.y))][Math.ceil(this.x + e)])) {
                this.x += e;
            }
        } else {
            if (walkable.includes(blocks[(Math.floor(this.y))][Math.floor(this.x - e)]) && walkable.includes(blocks[(Math.ceil(this.y))][Math.floor(this.x - e)])) {
                this.x += e;
            }
        }
    };
    this.move = function () {
        if (this.t == 'passive') {
            this.ac++;
            if (this.ac == 50) {
                this.ac = 0;
                this.ng = Math.random() * Math.PI * 2;
            }
        }
        if (this.t == 'hostile') {
            if ((((this.x - xpos) ** 2) + ((this.y - ypos) ** 2)) ** (1 / 2) < 5) {
                this.ng = Math.atan2(this.y - ypos, xpos - this.x);
            } else {
                this.ac++;
                if (this.ac == 50) {
                    this.ac = 0;
                    this.ng = Math.random() * Math.PI * 2;
                }
            }
        }
        this.dx(Math.cos(this.ng) * this.s);
        this.dy(Math.sin(this.ng) * this.s);
    };
    this.s = data.mobs[name].speed;
    this.die = function () {
        for (p in this.d) {
            dropblocs.push({
                item: this.d[p][0],
                num: Math.floor(Math.random() * (this.d[p][1][1] - this.d[p][1][0] + 1)) + this.d[p][1][0],
                xp: this.x,
                yp: this.y,
            });
        }
        this.destroy();
    };
    this.destroy = function () {
        this.ch = false;
        this.ac = undefined;
        this.x = undefined;
        this.y = undefined;
        this.h = undefined;
        this.t = undefined;
        this.d = undefined;
        this.ng = undefined;
    };
}
var mobs = [];
function genMobs() {
    for (var c = 0; c < 2000; c++) {
        mobs.push(new mob('blob'));
    }
}
function renMobs() {
    for (var t = 0; t < mobs.length; t++) {
        mobs[t].render();
    }
}
function openMap() {
    if (myGameArea.keys && (myGameArea.keys[77] || myGameArea.keys[109])) {
        screenNum = 3;
        myGameArea.keys[109] = false;
        myGameArea.keys[77] = false;
        mapview = [];
        for (var x = 0; x < 10000; x++) {
            var current = [];
            for (var y = 0; y < 100; y++) {
                current.push(map[10 * (x % 100) + y % 10 + (width * (10 * Math.floor(x / 100) + Math.floor(y / 10)))]);
            }
            var counter = [], counterIndex = [];
            for (var k in current) {
                if (counterIndex.includes(current[k])) {
                    counter[counterIndex.indexOf(current[k])]++;
                } else {
                    counterIndex.push(current[k]);
                    counter.push(1);
                }
            }
            var bm = -Infinity, ind = 0;
            for (var p in counter) {
                if (counter[p] > bm) {
                    bm = counter[p];
                    ind = p;
                }
            }
            mapview.push(counterIndex[ind]);
        }
    }
}
function renderMap() {
    for (var x = 0; x < 10000; x++) {
        myGameArea.context.fillStyle = mapview[x] == 'unknown' ? 'black' : (mapview[x] == 'desert' ? '#ffff99' : (mapview[x] == 'forest' ? 'green' : 'grey'));
        myGameArea.context.fillRect((x % 100) * 7, Math.floor(x / 100) * 7, 7, 7);
    }
    myGameArea.context.fillStyle = 'red';
    myGameArea.context.fillRect(xpos * 0.7 - 5, ypos * 0.7 - 5, 10, 10);
}
function closeMap() {
    myGameArea.context.drawImage(ime, 56, 56, 56, 56, 650, 0, 50, 50);
    if ((myGameArea.click && myGameArea.x > 650 && myGameArea.x < 700 && myGameArea.y < 50) || (myGameArea.keys && (myGameArea.keys[77] || myGameArea.keys[109]))) {
        screenNum = 1;
        myGameArea.keys[109] = false;
        myGameArea.keys[77] = false;
    }
    document.getElementById("canvas").style.cursor = 'default';
}