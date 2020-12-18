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
        myGameArea.context.fillText('Current biome: ' + biomes[Math.floor(ypos) * width + Math.floor(xpos)],10,90);
        myGameArea.context.fillText('Standing on: ' + data.viewdata[blocks[Math.floor(ypos)][Math.floor(xpos)]].split('*')[0],10,150);
        myGameArea.context.fillText('Looking at: ' + data.viewdata[blocks[Math.round(ypos)][((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1))]].split('*')[0],10,120);
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
    if(equipped.b[0] === 'sb' && biomes[Math.floor(ypos) * width + Math.floor(xpos)] == 'desert'){
        speed = 0.125;
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
            playerHealth -= mobs[x].dmg * (1 / (1 + ((data.armordef[equipped.h[0]] + data.armordef[equipped.c[0]] + data.armordef[equipped.b[0]] + data.armordef[equipped.l[0]]) / 10)));
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

function renderSave(){
    myGameArea.context.drawImage(ime, 70, 210, 50, 50, 0, 0, 50, 50);
    if(myGameArea.click && myGameArea.x > 0 && myGameArea.x < 50 && myGameArea.y > 0 && myGameArea.y < 50){
        var sk = localStorage.getItem('secretKey') ?? Math.floor(Math.random() * 1000000000000);
        localStorage.setItem('secretKey',sk);
        var blk = [];
        for(var q of blocks){
            blk.push(compressArr(q));
        }
        var obj = {
            blocks: blk,
            biomes: compressArr(biomes),
            xpos: xpos,
            ypos: ypos,
            chestContents: chestContents,
            map: compressArr(map),
            mapview: compressArr(mapview),
            deathX: deathX,
            deathY: deathY,
            secretKey: sk,
            spawnx: spawnx,
            spawny: spawny,
            equipped: equipped,
            mobs: mobs,
            playerHealth: playerHealth,
            maxHealth: maxHealth,
        };
        document.getElementById('dwnld').href = 'data:text/plain,' + JSON.stringify(obj);
        document.getElementById('dwnld').click();
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
        loadTiles();
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
        if(document.getElementById('upload').hidden){
            document.getElementById('upload').hidden = false;
        } else  {
            document.getElementById('upload').hidden = true;
        }
        myGameArea.click = false;
    }
}
function compressArr(arr){
	var res = [], ci = arr[0], cnm = 0;
	for(var x of arr){
    	if(x != ci){            
        	res.push(ci + '*' + cnm);
        	ci = x;
            cnm = 1;
        } else {
        	cnm++;
        }
    }
    res.push(ci + '*' + cnm);
    return res;
}
function expandArr(arr){
	var res = [];
    for(var x of arr){
    	for(var t = 0; t < x.split('*')[1]; t++){
        	res.push(x.split('*')[0]);
        }
    }
    return res;
}
function readFile(event){
    var input = event.target;
	var reader = new FileReader(); 
	reader.onload = function(){ 
        console.log(reader.result);
        var text = JSON.parse(reader.result);
        if(text.secretKey != localStorage.getItem('secretKey')){
            alert('Invalid file, please try again');
        } else {
            var blok = [];
            for(var q of text.blocks){
                blok.push(expandArr(q));
            }
            blocks = blok;
            biomes = expandArr(text.biomes);
            xpos = text.xpos;
            ypos = text.ypos;
            chestContents = text.chestContents;
            map = expandArr(text.map);
            mapview = expandArr(text.mapview);
            deathX = text.deathX;
            deathY = text.deathY;
            spawnx = text.spawnx;
            spawny = text.spawny;
            equipped = text.equipped;
            mobs = text.mobs;
            playerHealth = text.playerHealth;
            maxHealth = text.maxHealth;
            screenNum = 1;
        }
	};
 	reader.readAsText(input.files[0]);
}