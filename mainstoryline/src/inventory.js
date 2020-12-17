function isNearby(x) {
    if (x == 'none') {
        return true;
    } else {
        for (var qx = Math.floor(xpos) - 5; qx < Math.floor(xpos) + 5; qx++) {
            for (var qy = Math.floor(ypos) - 5; qy < Math.floor(ypos) + 5; qy++) {
                if (qy >= 0 && qx >= 0) {
                    if ((((xpos - qx) ** 2) + ((ypos - qy) ** 2)) ** (1 / 2) <= 5 && blocks[qy][qx] == x) {
                        return true;
                    }
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
            if(myGameArea.keys[16] && blocks[Math.round(ypos)][((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1))] == 'ch'){
                screenNum = 2;
                openedWithChest = true;
                invPage = 2;
                cx = ((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1));
                cy = Math.round(ypos);
            } else {
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
                        if(blocks[Math.round(ypos)][((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1))] == 'ch'){
                            for(var w in chestContents[(Math.round(ypos) * width) + ((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1))]){
                                var ng = Math.random() * Math.PI * 2;
                                if(chestContents[(Math.round(ypos) * width) + ((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1))][w][0] != 'e'){
                                    dropblocs.push({
                                        item: chestContents[(Math.round(ypos) * width) + ((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1))][w][0],
                                        num: chestContents[(Math.round(ypos) * width) + ((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1))][w][1],
                                        xp: ((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1)) + ((Math.random() ** (1/2)) * 2) * Math.cos(ng),
                                        yp: Math.round(ypos) + ((Math.random() ** (1/2)) * 2) * Math.sin(ng)
                                    });
                                } 
                            }
                            chestContents[(Math.round(ypos) * width) + ((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1))] = undefined;
                        }
                        var ng = Math.random() * Math.PI * 2;
                        dropblocs.push({
                            item: dropitem[blocks[Math.round(ypos)][((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1))]][dq][0],
                            num: Math.floor(Math.random() * (dropitem[blocks[Math.round(ypos)][((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1))]][dq][1][1] - dropitem[blocks[Math.round(ypos)][((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1))]][dq][1][0] + 1)) + dropitem[blocks[Math.round(ypos)][((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1))]][dq][1][0],
                            xp: ((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1)) + ((Math.random() ** (1/2)) * 1) * Math.cos(ng),
                            yp: Math.round(ypos) + ((Math.random() ** (1/2)) * 1) * Math.sin(ng)
                        });
                        blocks[Math.round(ypos)][((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1))] = defaultTile[biomes[Math.round(ypos) * width + ((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1))]];
                    }
                    lastClick.x = ((currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1));
                    lastClick.y = Math.round(ypos);
                    myGameArea.context.drawImage(imc,32 *  Math.floor(10 * (clickCount / mq)), 0, 32, 32, ((        (currentDirection == 1) ? (Math.ceil(xpos) + 1) : (Math.floor(xpos) - 1)) - xpos + (3 + 14/96)) *   96, (Math.round(ypos) - ypos + (3 + 14/96)) * 96, 96, 96);
                }
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
    if (myGameArea.click && myGameArea.x > 50 && myGameArea.x < 610 && myGameArea.y > 20 && myGameArea.y < 230) {
        if (invIndex == -1) {
            invIndex = Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70);
        } else {
            if (invIndex < 30) {
                if (myGameArea.keys && myGameArea.keys[16] && inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)][1] === '') {
                    var k = Math.floor(inventory[invIndex][1] / 2);
                    var a = Math.ceil(inventory[invIndex][1] / 2);
                    inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)][0] = inventory[invIndex][0];
                    inventory[invIndex][1] = k;
                    inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)][1] = a;
                } else {
                    if (inventory[invIndex][0] == inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)][0]) {
                        var q = Math.min(inventory[invIndex][1], (data.ms[inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)][0]] ?? 64) - inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)][1]);
                        if (q == 0) {
                            var h = inventory[invIndex];
                            inventory[invIndex] = inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)];
                            inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)] = h;
                        } else {
                            inventory[invIndex][1] -= q;
                            inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)][1] += q;
                        }
                    } else {
                        var h = inventory[invIndex];
                        inventory[invIndex] = inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)];
                        inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)] = h;
                    }
                }
            } else if(invIndex >= 100){
                if (myGameArea.keys && myGameArea.keys[16] && inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)][1] === '') {
                    var k = Math.floor(chestContents[cy * 1000 + cx][invIndex - 100][1] / 2);
                    var a = Math.ceil(chestContents[cy * 1000 + cx][invIndex - 100][1] / 2);
                    inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)][0] = chestContents[cy * 1000 + cx][invIndex - 100][0];
                    chestContents[cy * 1000 + cx][invIndex - 100][1] = k;
                    inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)][1] = a;
                } else {
                    if (chestContents[cy * 1000 + cx][invIndex - 100][0] == inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)][0]) {
                        var q = Math.min(chestContents[cy * 1000 + cx][invIndex - 100][1], (data.ms[inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)][0]] ?? 64) - inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)][1]);
                        if (q == 0) {
                            var h = chestContents[cy * 1000 + cx][invIndex - 100];
                            chestContents[cy * 1000 + cx][invIndex - 100] = inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)];
                            inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)] = h;
                        } else {
                            chestContents[cy * 1000 + cx][invIndex - 100][1] -= q;
                            inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)][1] += q;
                        }
                    } else {
                        var h = chestContents[cy * 1000 + cx][invIndex - 100];
                        chestContents[cy * 1000 + cx][invIndex - 100] = inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)];
                        inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)] = h;
                    }
                }
                for(var q in chestContents[cy * 1000 + cx]){
                    if(chestContents[cy * 1000 + cx][q][1] == 0){
                        chestContents[cy * 1000 + cx][q] = ['e',''];
                    }
                }
            } else {
                switch (invIndex) {
                    case 30:
                        [equipped.h, inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)]] = [inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)], equipped.h];
                        break;
                    case 31:
                        [equipped.c, inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)]] = [inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)], equipped.c];
                        break;
                    case 32:
                        [equipped.l, inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)]] = [inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)], equipped.l];
                        break;
                    case 33:
                        [equipped.b, inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)]] = [inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)], equipped.b];
                        break;
                }
            }
            invIndex = -1;
        }
        myGameArea.click = false;
    } else if (myGameArea.click){
        if(invPage == 1){
            if(!(myGameArea.x > 50 && myGameArea.x < 120 && myGameArea.y > 250 && myGameArea.y < 530)){
                invIndex = -1;
            }
        }
        if(invPage == 2){
            if(!(myGameArea.x > 50 && myGameArea.x < 610 && myGameArea.y > 250 && myGameArea.y < 460)){
                invIndex = -1;
            }
        }
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
        if (arecc[(Math.floor((myGameArea.y - 250) / 70) * 8) + Math.floor((myGameArea.x - 50) / 70) + (pagenum * 48)]) {
            var t = [];
            for (var p = 0; p < inventory.length; p++) {
                t.push(inventory[p][0]);
            }
            for (r in arecc[(Math.floor((myGameArea.y - 250) / 70) * 8) + Math.floor((myGameArea.x - 50) / 70)][1]) {
                myGameArea.add(arecc[(Math.floor((myGameArea.y - 250) / 70) * 8) + Math.floor((myGameArea.x - 50) / 70) + (pagenum * 48)][1][r][0], -1 * arecc[(Math.floor((myGameArea.y - 250) / 70) * 8) + Math.floor((myGameArea.x - 50) / 70) + (pagenum * 48)][1][r][1]);
            }
            myGameArea.add(arecc[(Math.floor((myGameArea.y - 250) / 70) * 8) + Math.floor((myGameArea.x - 50) / 70) + (pagenum * 48)][0][0], arecc[(Math.floor((myGameArea.y - 250) / 70) * 8) + Math.floor((myGameArea.x - 50) / 70) + (pagenum * 48)][0][1]);
        }
    }
    return k;
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