function isNearby(x) {
    if (x == 'none') {
        return true;
    } else {
        for (var qx = Math.floor(xpos) - 5; qx < Math.floor(xpos) + 5; qx++) {
            for (var qy = Math.floor(ypos) - 5; qy < Math.floor(ypos) + 5; qy++) {
                if ((((xpos - qx) ** 2) + ((ypos - qy) ** 2)) ** (1 / 2) <= 5 && blocks[qy][qx] == x) {
                    return true;
                }
            }
        }
        return false;
    }
}
function interact() {
    var placabli = [];
    for (var e = 0; e < placable.length; e++) {
        placabli.push(placable[e][0]);
    }
    if (myGameArea.keys && myGameArea.keys[32]) {
        var k = true;
        for (var o = 0; o < mobs.length; o++) {
            if (((xpos - mobs[o].x) ** 2 + (ypos - mobs[o].y) ** 2) ** (1 / 2) < 1.5 && ((currentDirection == 1) ? (mobs[o].x >= xpos) : (mobs[o].x <= xpos))) {
                k = false;
                if (mobs[o].dmgc == 0) {
                    mobs[o].dmgc = 12;
                    mobs[o].h -= (data.dmg[inventory[selectIndex][0]] ?? data.dmg['def']);
                    if (mobs[o].h <= 0) {
                        mobs[o].die();
                    } else {
                        for (var p = 0; p < 100; p++) {
                            mobs[o].dx((-2 * Math.cos(Math.atan2(mobs[o].y - ypos, xpos - mobs[o].x))) / 100);
                            mobs[o].dy((-2 * Math.sin(Math.atan2(mobs[o].y - ypos, xpos - mobs[o].x))) / 100);
                        }
                    }
                }
            }
        }
        if (k) {
            if (blocks[Math.round(ypos)][((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1))] == defaultTile[biomes[Math.round(ypos) * width + ((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1))]]) {
                if (placabli.includes(inventory[selectIndex] ? (inventory[selectIndex][0] ? inventory[selectIndex][0] : 'no') : 'no')) {
                    blocks[Math.round(ypos)][((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1))] = placable[placabli.indexOf(inventory[selectIndex][0])][1];
                    myGameArea.add(inventory[selectIndex][0], -1);
                }
            } else if (blocks[Math.round(ypos)][((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1))] != ''){
                if (lastClick.x != ((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1)) || lastClick.y != Math.round(ypos)) {
                    clickCount = 1;
                } else {
                    clickCount += 1;
                } 
                var a = inventory[selectIndex] ? inventory[selectIndex] : 'def';
                var mq = maxClicks[blocks[Math.round(ypos)][((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1))]][a[0]] ? maxClicks[blocks[Math.round(ypos)][((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1))]][a[0]] : maxClicks[blocks[Math.round(ypos)][((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1))]]['def'];
                var dq = dropitem[blocks[Math.round(ypos)][((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1))]][a[0]] ? a[0] : 'def';
                if (clickCount == mq) {
                    dropblocs.push({
                        item: dropitem[blocks[Math.round(ypos)][((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1))]][dq][0],
                        num: Math.floor(Math.random() * (dropitem[blocks[Math.round(ypos)][((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1))]][dq][1][1] - dropitem[blocks[Math.round(ypos)][((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1))]][dq][1][0] + 1)) + dropitem[blocks[Math.round(ypos)][((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1))]][dq][1][0],
                        xp: ((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1)),
                        yp: Math.round(ypos)
                    });
                    blocks[Math.round(ypos)][((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1))] = defaultTile[biomes[Math.round(ypos) * width + ((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1))]]
                }
                lastClick.x = ((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1));
                lastClick.y = Math.round(ypos);
                myGameArea.context.drawImage(imc,32 *  Math.floor(10 * (clickCount / mq)), 0, 32, 32, (((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1)) - xpos + 3) * 100, (Math.round(ypos) - ypos + 3) * 100, 100, 100);
            }
        }
    }
}
function clearBlanks() {
    for (var v = 0; v < inventory.length; v++) {
        if (inventory[v][1] === 0) {
            inventory[v][0] = 'e';
            inventory[v][1] = '';
        }
    }
}
function dealWithSwaps() {
    if (myGameArea.click && myGameArea.x > 50 && myGameArea.x < 610 && myGameArea.y > 50 && myGameArea.y < 208) {
        if (invIndex == -1) {
            invIndex = Math.floor((myGameArea.x - 50) / 56) + 10 * Math.floor((myGameArea.y - 50) / 56);
        } else {
            if (myGameArea.keys && myGameArea.keys[16] && inventory[Math.floor((myGameArea.x - 50) / 56) + 10 * Math.floor((myGameArea.y - 50) / 56)][1] === '') {
                var k = Math.floor(inventory[invIndex][1] / 2);
                var a = Math.ceil(inventory[invIndex][1] / 2);
                inventory[Math.floor((myGameArea.x - 50) / 56) + 10 * Math.floor((myGameArea.y - 50) / 56)][0] = inventory[invIndex][0];
                inventory[invIndex][1] = k;
                inventory[Math.floor((myGameArea.x - 50) / 56) + 10 * Math.floor((myGameArea.y - 50) / 56)][1] = a;
            } else {
                if (inventory[invIndex][0] == inventory[Math.floor((myGameArea.x - 50) / 56) + 10 * Math.floor((myGameArea.y - 50) / 56)][0]) {
                    var q = Math.min(inventory[invIndex][1], (data.ms[inventory[Math.floor((myGameArea.x - 50) / 56) + 10 * Math.floor((myGameArea.y - 50) / 56)][0]] ?? 64) - inventory[Math.floor((myGameArea.x - 50) / 56) + 10 * Math.floor((myGameArea.y - 50) / 56)][1]);
                    if (q == 0) {
                        var h = inventory[invIndex];
                        inventory[invIndex] = inventory[Math.floor((myGameArea.x - 50) / 56) + 10 * Math.floor((myGameArea.y - 50) / 56)];
                        inventory[Math.floor((myGameArea.x - 50) / 56) + 10 * Math.floor((myGameArea.y - 50) / 56)] = h;
                    } else {
                        inventory[invIndex][1] -= q;
                        inventory[Math.floor((myGameArea.x - 50) / 56) + 10 * Math.floor((myGameArea.y - 50) / 56)][1] += q;
                    }
                } else {
                    var h = inventory[invIndex];
                    inventory[invIndex] = inventory[Math.floor((myGameArea.x - 50) / 56) + 10 * Math.floor((myGameArea.y - 50) / 56)];
                    inventory[Math.floor((myGameArea.x - 50) / 56) + 10 * Math.floor((myGameArea.y - 50) / 56)] = h;
                }
            }
            invIndex = -1;
        }
        myGameArea.click = false;
    } else if (myGameArea.click) {
        invIndex = -1;
    }
}
function dealWithCrafts(k) {
    var arecc = [];
    for (var x = 0; x < k.length; x++) {
        if (k[x][1] == 'y') {
            arecc.push(k[x][0]);
        }
    }
    if (myGameArea.click && myGameArea.x < 610 && myGameArea.y > 250 && myGameArea.x > 50) {
        myGameArea.click = false;
        if (arecc[(Math.floor((myGameArea.y - 250) / 56) * 10) + Math.floor((myGameArea.x - 50) / 56) + (pagenum * 70)]) {
            var t = [];
            for (var p = 0; p < inventory.length; p++) {
                t.push(inventory[p][0]);
            }
            for (r in arecc[(Math.floor((myGameArea.y - 250) / 56) * 10) + Math.floor((myGameArea.x - 50) / 56)][1]) {
                myGameArea.add(arecc[(Math.floor((myGameArea.y - 250) / 56) * 10) + Math.floor((myGameArea.x - 50) / 56)][1][r][0], -1 * arecc[(Math.floor((myGameArea.y - 250) / 56) * 10) + Math.floor((myGameArea.x - 50) / 56) + (pagenum * 70)][1][r][1]);
                arecc[(Math.floor((myGameArea.y - 250) / 56) * 10) + Math.floor((myGameArea.x - 50) / 56) + (pagenum * 70)][1][r];
            }
            myGameArea.add(arecc[(Math.floor((myGameArea.y - 250) / 56) * 10) + Math.floor((myGameArea.x - 50) / 56)][0][0], arecc[(Math.floor((myGameArea.y - 250) / 56) * 10) + Math.floor((myGameArea.x - 50) / 56)][0][1]);
        }
    }
    return k;
}
function loadMap() {
    for (var x = 0; x < 1000000; x++) {
        map.push('unknown');
    }
}
function updateMap() {
    for (var x = 0; x < 1000000; x++) {
        if (((((x % 1000) - xpos) ** 2) + ((Math.floor(x / 1000) - ypos) ** 2)) ** (1 / 2) <= 100) {
            map[x] = biomes[x];
        }
    }
}
function throwItems() {
    if (myGameArea.keys && (myGameArea.keys[113] || myGameArea.keys[81])) {
        dropblocs.push({
            item: inventory[selectIndex][0],
            num: inventory[selectIndex][1],
            yp: ypos,
            xp: xpos + (((currentDirection * 2) - 1) * 3)
        });
        myGameArea.add(inventory[selectIndex][0], -1 * inventory[selectIndex][1]);
    }
}