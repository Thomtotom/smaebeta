function renderRecipes() {
    var arec = [], arecc = [];
    for (var x = 0; x < recipes.length; x++) {
        var o = 0;
        for (var m = 0; m < recipes[x][1].length; m++) {
            var i = {};
            for (var p = 0; p < inventory.length; p++) {
                if (!i[inventory[p][0]]) {
                    i[inventory[p][0]] = inventory[p][1];
                } else {
                    i[inventory[p][0]] += inventory[p][1];
                }
            }
            if (!i[recipes[x][1][m][0]] || i[recipes[x][1][m][0]] < recipes[x][1][m][1]) {
                o = 1;
            }
        }
        if (o == 0 && isNearby(recipes[x][2])) {
            arec.push(recipes[x][0][0]);
            arecc.push(recipes[x]);
        }
    }
    var precc = [], a = [], alrec = [];
    for (var v = 0; v < arecc.length; v++) {
        a.push(arecc[v][0][0]);
    }
    for (var x = 0; x < recipes.length; x++) {
        var o = 0;
        for (var m = 0; m < recipes[x][1].length; m++) {
            var i = [];
            for (var p = 0; p < inventory.length; p++) {
                i.push(inventory[p][0]);
            }
            if (i.includes(recipes[x][1][m][0]) && !a.includes(recipes[x][0][0])) {
                o = 1;
                break;
            }
        }
        if (o == 1 || (recipes[x][2] == 'none' ? false : (isNearby(recipes[x][2]) && !a.includes(recipes[x][0][0])))) {
            precc.push(recipes[x]);
        }
    }
    for (var k in arecc) {
        alrec.push([arecc[k], 'y']);
    }
    for (var b in precc) {
        alrec.push([precc[b], 'n']);
    }
    for (var q = 0; q < Math.min(48, alrec.length - (pagenum * 48)); q++) {
        var gx = chooseBlock(alrec[q + (pagenum * 48)][0][0][0])[0] * 32, gy = chooseBlock(alrec[q + (pagenum * 48)][0][0][0])[1] * 32;
        myGameArea.context.fillStyle = alrec[q + (pagenum * 48)][1] == 'y' ? 'grey' : 'maroon';
        myGameArea.context.fillRect(50 + (70 * (q % 8)), 250 + 70 * Math.floor(q / 8), 70, 70);
        myGameArea.context.font = '25px Arial';
        myGameArea.context.fillStyle = 'white';
        myGameArea.context.drawImage(imt, gx, gy, 32, 32, 53 + (70 * (q % 8)), 253 + 70 * Math.floor(q / 8), 64, 64);
        if (alrec[q + (pagenum * 48)][0][0][1] > 1) {
            myGameArea.context.fillText(alrec[q + (pagenum * 48)][0][0][1], 85 + (q % 8) * 70, 315 + 70 * Math.floor(q / 8));
        }
    }
    pages = Math.ceil(alrec.length / 48);
    return alrec;
}
function closeInventory() {
    myGameArea.context.drawImage(ime, 70, 70, 50, 50, 650, 0, 50, 50);
    if ((myGameArea.click && myGameArea.x > 650 && myGameArea.x < 700 && myGameArea.y < 50) || (myGameArea.keys && (myGameArea.keys[69] || myGameArea.keys[101]))) {
        screenNum = 1;
        myGameArea.keys[101] = false;
        myGameArea.keys[69] = false;
        invIndex = -1;
    }
    document.getElementById("canvas").style.cursor = 'default';
}
function renderHoverCraft(k) {
    if (!myGameArea.click && myGameArea.x < 610 && myGameArea.y > 250 && myGameArea.x > 50 && k[(Math.floor((myGameArea.y - 250) / 70) * 8) + Math.floor((myGameArea.x - 50) / 70) + (pagenum * 48)]) {
        if (myGameArea.keys[16]) {
            myGameArea.context.fillStyle = 'grey';
            var bloc = k[(Math.floor((myGameArea.y - 250) / 70) * 8) + Math.floor((myGameArea.x - 50) / 70) + (pagenum * 48)][0][1];
            var util = k[(Math.floor((myGameArea.y - 250) / 70) * 8) + Math.floor((myGameArea.x - 50) / 70) + (pagenum * 48)][0][2];
            var vw = (util === 'none' ? 0 : 100) + (bloc.length * 70);
            myGameArea.context.fillRect(myGameArea.x - vw / 2, myGameArea.y - 35, vw, 70);
            myGameArea.context.fillStyle = 'white';
            myGameArea.context.font = '25px Arial';
            for (var k = 0; k < bloc.length; k++) {
                myGameArea.context.drawImage(imt, 32 * chooseBlock(bloc[k][0])[0], 32 * chooseBlock(bloc[k][0])[1], 32, 32, myGameArea.x + (70 * k) + 3 - (vw / 2), myGameArea.y - 32, 64, 64);
                myGameArea.context.fillText(bloc[k][1], myGameArea.x + (70 * k) + 40 - (vw / 2), myGameArea.y + 30);
            }
            if (util !== 'none') {
                myGameArea.context.fillText('on', myGameArea.x + 70 * bloc.length - (vw / 2), myGameArea.y);
                myGameArea.context.drawImage(imt, 32 * chooseBlock(util)[0], 32 * chooseBlock(util)[1], 32, 32, myGameArea.x + (70 * bloc.length) + 33 - (vw / 2), myGameArea.y - 32, 64, 64);
            }
        } else {
            var h = k[(Math.floor((myGameArea.y - 250) / 70) * 8) + Math.floor((myGameArea.x - 50) / 70) + (pagenum * 48)][0][0][0];
            var c = data.viewdata[h];
            var k = [];
            for (var m = 0; m < c.split('*').length; m++) {
                k.push(c.split('*')[m].length);
            }
            myGameArea.context.fillStyle = 'grey';
            myGameArea.context.fillRect(myGameArea.x - (6 * Math.max.apply(null, k)), myGameArea.y - (c.split('*').length * 20 / 2), (12 * Math.max.apply(null, k)), c.split('*').length * 20);
            myGameArea.context.fillStyle = 'white';
            myGameArea.context.font = '20px Arial';
            for (var x = 0; x < c.split('*').length; x++) {
                myGameArea.context.fillText(c.split('*')[x], myGameArea.x + (((12 * Math.max.apply(null, k)) - (12 * k[x])) / 2) - (6 * Math.max.apply(null, k)), myGameArea.y - (c.split('*').length * 20 / 2) + (20 * x) + 20);
            }
        }
    }
}
function renderHoverItem() {
    if (!myGameArea.click && myGameArea.x > 50 && myGameArea.x < 610 && myGameArea.y > 20 && myGameArea.y < 230 && inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)][0] != 'e') {
        var h = inventory[Math.floor((myGameArea.x - 50) / 70) + 8 * Math.floor((myGameArea.y - 20) / 70)][0];
        var c = data.viewdata[h];
        var k = [];
        for (var m = 0; m < c.split('*').length; m++) {
            k.push(c.split('*')[m].length);
        }
        myGameArea.context.fillStyle = 'grey';
        myGameArea.context.fillRect(myGameArea.x - (6 * Math.max.apply(null, k)), myGameArea.y - (c.split('*').length * 20 / 2), (12 * Math.max.apply(null, k)), c.split('*').length * 20);
        myGameArea.context.fillStyle = 'white';
        myGameArea.context.font = '20px Arial';
        for (var x = 0; x < c.split('*').length; x++) {
            myGameArea.context.fillText(c.split('*')[x], myGameArea.x + (((12 * Math.max.apply(null, k)) - (12 * k[x])) / 2) - (6 * Math.max.apply(null, k)), myGameArea.y - (c.split('*').length * 20 / 2) + (20 * x) + 20);
        }
    }
}
function renderPages() {
    myGameArea.context.drawImage(imh, 256, 0, 32, 32, 619, 430, 32, 32);
    myGameArea.context.drawImage(imh, 288, 0, 32, 32, 9, 430, 32, 32);
    if (myGameArea.click && myGameArea.x > 619 && myGameArea.x < 651 && myGameArea.y > 430 && myGameArea.y < 462) {
        pagenum = (pagenum == pages - 1 ? 0 : pagenum + 1);
        myGameArea.click = false;
    }
    if (myGameArea.click && myGameArea.x > 9 && myGameArea.x < 41 && myGameArea.y > 430 && myGameArea.y < 462) {
        pagenum = (pagenum == 0 ? pages - 1 : pagenum - 1);
        myGameArea.click = false;
    }
}
function renderItems() {
    for (var y = 0; y < 24; y++) {
        var gx = chooseBlock(inventory[y][0])[0] * 32, gy = chooseBlock(inventory[y][0])[1] * 32;
        myGameArea.context.drawImage(ime, (y != invIndex ? (y <= 6 ? 70 : 0) : (y <= 6 ? 0 : 140)), y != invIndex ? 0 : (y <= 6 ? 70 : 0), 70, 70, 50 + (70 * (y % 8)), 20 + 70 * Math.floor(y / 8), 70, 70);
        myGameArea.context.drawImage(imt, gx, gy, 32, 32, 53 + (70 * (y % 8)), 23 + 70 * Math.floor(y / 8), 64, 64);
        if (inventory[y][1] > 1) {
            myGameArea.context.font = '25px Arial';
            myGameArea.context.fillStyle = 'white';
            myGameArea.context.fillText(inventory[y][1], 85 + (y % 8) * 70, 85 + 70 * Math.floor(y / 8));
        }
    }
}
function renderTrash() {
    myGameArea.context.drawImage(imh, 224, 0, 32, 32, 636, 50, 64, 64);
    if (myGameArea.x > 636 && myGameArea.x < 700 && myGameArea.y > 50 && myGameArea.y < 114 && myGameArea.click && invIndex != -1) {
        switch (invIndex) {
            case 30:
                equipped.h = ['e', ''];
                break;
            case 31:
                equipped.c = ['e', ''];
                break;
            case 32:
                equipped.l = ['e', ''];
                break;
            case 33:
                equipped.b = ['e', ''];
                break;
            default:
                if(invIndex >= 100){
                    chestContents[cy * 1000 + cx][invIndex - 100] = ['e',''];
                } else {
                    inventory[invIndex] = ['e', ''];
                }
        }
    }
}
function renderTabs() {
    if (openedWithChest) {
        switch (invPage) {
            case 0:
                myGameArea.context.drawImage(ime, 140, 70, 48, 48, 604, 114, 96, 96);
                if (myGameArea.click && myGameArea.x > 664 && myGameArea.y > 148 && myGameArea.y < 176 && myGameArea.x < 700) {
                    invPage = 1;
                    invIndex = -1;
                }
                if (myGameArea.click && myGameArea.x > 664 && myGameArea.y > 180 && myGameArea.y < 210 && myGameArea.x < 700) {
                    invPage = 2;
                    invIndex = -1;
                }
                break;
            case 1:
                myGameArea.context.drawImage(ime, 0, 140, 48, 48, 604, 114, 96, 96);
                if (myGameArea.click && myGameArea.x > 664 && myGameArea.y > 114 && myGameArea.y < 144 && myGameArea.x < 700) {
                    invPage = 0;
                    invIndex = -1;
                }
                if (myGameArea.click && myGameArea.x > 664 && myGameArea.y > 180 && myGameArea.y < 210 && myGameArea.x < 700) {
                    invPage = 2;
                    invIndex = -1;
                }
                break;
            case 2:
                myGameArea.context.drawImage(ime, 70, 140, 48, 48, 604, 114, 96, 96);
                if (myGameArea.click && myGameArea.x > 664 && myGameArea.y > 114 && myGameArea.y < 144 && myGameArea.x < 700) {
                    invPage = 0;
                    invIndex = -1;
                }
                if (myGameArea.click && myGameArea.x > 664 && myGameArea.y > 148 && myGameArea.y < 176 && myGameArea.x < 700) {
                    invPage = 1;
                    invIndex = -1;
                }
                break;
        }
    } else {
        if (invPage == 0) {
            myGameArea.context.drawImage(ime, 140, 140, 48, 48, 604, 114, 96, 96);
            if (myGameArea.click && myGameArea.x > 664 && myGameArea.y > 164 && myGameArea.y < 210 && myGameArea.x < 700) {
                invPage = 1;
                invIndex = -1;
            }
        } else {
            myGameArea.context.drawImage(ime, 0, 210, 48, 48, 604, 114, 96, 96);
            if (myGameArea.click && myGameArea.x > 664 && myGameArea.y < 160 && myGameArea.y > 114 &&  myGameArea.x < 700) {
                invPage = 0;
                invIndex = -1;
            }
        }
    }
}
function renderArmor() {
    myGameArea.context.drawImage(ime, (invIndex == 30 ? 140 : 0), 0, 70, 70, 50, 250, 70, 70);
    myGameArea.context.drawImage(imh, 0, 32, 32, 32, 53, 253, 64, 64);
    myGameArea.context.drawImage(imt, chooseBlock(equipped.h[0])[0] * 32, chooseBlock(equipped.h[0])[1] * 32, 32, 32, 53, 253, 64, 64);
    if (myGameArea.click && myGameArea.x > 50 && myGameArea.x < 120 && myGameArea.y > 250 && myGameArea.y < 320) {
        if (invIndex == -1) {
            invIndex = 30;
        } else {
            if (invIndex < 30 && data.armor.h.includes(inventory[invIndex][0])) {
                [equipped.h, inventory[invIndex]] = [inventory[invIndex], equipped.h];
            }
            invIndex = -1;
        }
        myGameArea.click = false;
    }

    myGameArea.context.drawImage(ime, (invIndex == 31 ? 140 : 0), 0, 70, 70, 50, 320, 70, 70);
    myGameArea.context.drawImage(imh, 32, 32, 32, 32, 53, 323, 64, 64);
    myGameArea.context.drawImage(imt, chooseBlock(equipped.c[0])[0] * 32, chooseBlock(equipped.c[0])[1] * 32, 32, 32, 53, 323, 64, 64);
    if (myGameArea.click && myGameArea.x > 50 && myGameArea.x < 120 && myGameArea.y > 320 && myGameArea.y < 390) {
        if (invIndex == -1) {
            invIndex = 31;
        } else {
            if (invIndex < 30 && data.armor.c.includes(inventory[invIndex][0])) {
                [equipped.c, inventory[invIndex]] = [inventory[invIndex], equipped.c];
            }
            invIndex = -1;
        }
        myGameArea.click = false;
    }
    myGameArea.context.drawImage(ime, (invIndex == 32 ? 140 : 0), 0, 70, 70, 50, 390, 70, 70);
    myGameArea.context.drawImage(imh, 64, 32, 32, 32, 53, 393, 64, 64);
    myGameArea.context.drawImage(imt, chooseBlock(equipped.l[0])[0] * 32, chooseBlock(equipped.l[0])[1] * 32, 32, 32, 53, 393, 64, 64);
    if (myGameArea.click && myGameArea.x > 50 && myGameArea.x < 120 && myGameArea.y > 390 && myGameArea.y < 460) {
        if (invIndex == -1) {
            invIndex = 32;
        } else {
            if (invIndex < 30 && data.armor.l.includes(inventory[invIndex][0])) {
                [equipped.l, inventory[invIndex]] = [inventory[invIndex], equipped.l];
            }
            invIndex = -1;
        }
        myGameArea.click = false;
    }
    myGameArea.context.drawImage(ime, (invIndex == 33 ? 140 : 0), 0, 70, 70, 50, 460, 70, 70);
    myGameArea.context.drawImage(imh, 96, 32, 32, 32, 53, 463, 64, 64);
    myGameArea.context.drawImage(imt, chooseBlock(equipped.b[0])[0] * 32, chooseBlock(equipped.b[0])[1] * 32, 32, 32, 53, 463, 64, 64);
    if (myGameArea.click && myGameArea.x > 50 && myGameArea.x < 120 && myGameArea.y > 460 && myGameArea.y < 530) {
        if (invIndex == -1) {
            invIndex = 33;
        } else {
            if (invIndex < 30 && data.armor.b.includes(inventory[invIndex][0])) {
                [equipped.b, inventory[invIndex]] = [inventory[invIndex], equipped.b];
            }
            invIndex = -1;
        }
        myGameArea.click = false;
    }
}
function renderChestContents(){
    chestContents[cy * 1000 + cx] ??= [['e',''],['e',''],['e',''],['e',''],['e',''],['e',''],['e',''],['e',''],['e',''],['e',''],['e',''],['e',''],['e',''],['e',''],['e',''],['e',''],['e',''],['e',''],['e',''],['e',''],['e',''],['e',''],['e',''],['e','']];
    for(var x = 0; x < chestContents[cy * 1000 + cx].length; x++){
        var gx = chooseBlock(chestContents[cy * 1000 + cx][x][0])[0] * 32, gy = chooseBlock(chestContents[cy * 1000 + cx][x][0])[1] * 32;
        myGameArea.context.drawImage(ime, (x + 100 == invIndex ? 140 : 0), 0, 70, 70, 50 + (70 * (x % 8)), 250 + 70 * Math.floor(x / 8), 70, 70);
        myGameArea.context.drawImage(imt, gx, gy, 32, 32, 53 + (70 * (x % 8)), 253 + 70 * Math.floor(x / 8), 64, 64);
        if (chestContents[cy * 1000 + cx][x][1] > 1) {
            myGameArea.context.font = '25px Arial';
            myGameArea.context.fillStyle = 'white';
            myGameArea.context.fillText(chestContents[cy * 1000 + cx][x][1], 85 + (x % 8) * 70, 315 + 70 * Math.floor(x / 8));
        }
    }
    if(myGameArea.click && myGameArea.x > 50 && myGameArea.x < 610 && myGameArea.y > 250 && myGameArea.y < 460){
        if(invIndex == -1){
            invIndex = 100 + (8 * Math.floor((myGameArea.y - 250) / 70) + Math.floor((myGameArea.x - 50) / 70));
        } else {
            if(invIndex >= 100){
                if(myGameArea.keys[16] && chestContents[cy * 1000 + cx][(8 * Math.floor((myGameArea.y - 250) / 70) + Math.floor((myGameArea.x - 50) / 70))][1] === ''){
                    var k = Math.floor(chestContents[cy * 1000 + cx][invIndex - 100][1] / 2);
                    var a = Math.ceil(chestContents[cy * 1000 + cx][invIndex - 100][1] / 2);
                    chestContents[cy * 1000 + cx][(8 * Math.floor((myGameArea.y - 250) / 70) + Math.floor((myGameArea.x - 50) / 70))][0] = chestContents[cy * 1000 + cx][invIndex - 100][0];
                    chestContents[cy * 1000 + cx][invIndex - 100][1] = k;
                    chestContents[cy * 1000 + cx][(8 * Math.floor((myGameArea.y - 250) / 70) + Math.floor((myGameArea.x - 50) / 70))][1] = a;
                } else {
                    if(chestContents[cy * 1000 + cx][invIndex - 100][0] == chestContents[cy * 1000 + cx][(8 * Math.floor((myGameArea.y - 250) / 70) + Math.floor((myGameArea.x - 50) / 70))][0]){
                        var q = Math.min(chestContents[cy * 1000 + cx][invIndex - 100][1], (data.ms[chestContents[cy * 1000 + cx][(8 * Math.floor((myGameArea.y - 250) / 70) + Math.floor((myGameArea.x - 50) / 70))][0]] ?? 64) - chestContents[cy * 1000 + cx][(8 * Math.floor((myGameArea.y - 250) / 70) + Math.floor((myGameArea.x - 50) / 70))][1]);
                        if (q == 0) {
                            var h = chestContents[cy * 1000 + cx][invIndex - 100];
                            chestContents[cy * 1000 + cx][invIndex - 100] = chestContents[cy * 1000 + cx][(8 * Math.floor((myGameArea.y - 250) / 70) + Math.floor((myGameArea.x - 50) / 70))];
                            chestContents[cy * 1000 + cx][(8 * Math.floor((myGameArea.y - 250) / 70) + Math.floor((myGameArea.x - 50) / 70))] = h;
                        } else {
                            chestContents[cy * 1000 + cx][invIndex - 100][1] -= q;
                            chestContents[cy * 1000 + cx][(8 * Math.floor((myGameArea.y - 250) / 70) + Math.floor((myGameArea.x - 50) / 70))][1] += q;
                        }
                    } else {
                        var h = chestContents[cy * 1000 + cx][invIndex - 100];
                        chestContents[cy * 1000 + cx][invIndex - 100] = chestContents[cy * 1000 + cx][(8 * Math.floor((myGameArea.y - 250) / 70) + Math.floor((myGameArea.x - 50) / 70))];
                        chestContents[cy * 1000 + cx][(8 * Math.floor((myGameArea.y - 250) / 70) + Math.floor((myGameArea.x - 50) / 70))] = h;
                    }
                }
                invIndex = -1;
            } else {
                if(myGameArea.keys[16] && chestContents[cy * 1000 + cx][(8 * Math.floor((myGameArea.y - 250) / 70) + Math.floor((myGameArea.x - 50) / 70))][1] === ''){
                    var k = Math.floor(inventory[invIndex][1] / 2);
                    var a = Math.ceil(inventory[invIndex][1] / 2);
                    chestContents[cy * 1000 + cx][(8 * Math.floor((myGameArea.y - 250) / 70) + Math.floor((myGameArea.x - 50) / 70))][0] = inventory[invIndex][0];
                    inventory[invIndex][1] = k;
                    chestContents[cy * 1000 + cx][(8 * Math.floor((myGameArea.y - 250) / 70) + Math.floor((myGameArea.x - 50) / 70))][1] = a;
                } else {
                    if(inventory[invIndex][0] == chestContents[cy * 1000 + cx][(8 * Math.floor((myGameArea.y - 250) / 70) + Math.floor((myGameArea.x - 50) / 70))][0]){
                        var q = Math.min(inventory[invIndex][1], (data.ms[chestContents[cy * 1000 + cx][(8 * Math.floor((myGameArea.y - 250) / 70) + Math.floor((myGameArea.x - 50) / 70))][0]] ?? 64) - chestContents[cy * 1000 + cx][(8 * Math.floor((myGameArea.y - 250) / 70) + Math.floor((myGameArea.x - 50) / 70))][1]);
                        if (q == 0) {
                            var h = inventory[invIndex][invIndex - 100];
                            inventory[invIndex] = chestContents[cy * 1000 + cx][(8 * Math.floor((myGameArea.y - 250) / 70) + Math.floor((myGameArea.x - 50) / 70))];
                            chestContents[cy * 1000 + cx][(8 * Math.floor((myGameArea.y - 250) / 70) + Math.floor((myGameArea.x - 50) / 70))] = h;
                        } else {
                            inventory[invIndex][1] -= q;
                            chestContents[cy * 1000 + cx][(8 * Math.floor((myGameArea.y - 250) / 70) + Math.floor((myGameArea.x - 50) / 70))][1] += q;
                        }
                    } else {
                        var h = inventory[invIndex];
                        inventory[invIndex] = chestContents[cy * 1000 + cx][(8 * Math.floor((myGameArea.y - 250) / 70) + Math.floor((myGameArea.x - 50) / 70))];
                        chestContents[cy * 1000 + cx][(8 * Math.floor((myGameArea.y - 250) / 70) + Math.floor((myGameArea.x - 50) / 70))] = h;
                    }
                }
                invIndex = -1;
            }
            for(var q in chestContents[cy * 1000 + cx]){
                if(chestContents[cy * 1000 + cx][q][1] == 0){
                    chestContents[cy * 1000 + cx][q] = ['e',''];
                }
            }
        }
        myGameArea.click = false;
    }
}
function renderHoverChest(){
    if (!myGameArea.click && myGameArea.x > 50 && myGameArea.x < 610 && myGameArea.y > 250 && myGameArea.y < 460){
        if(chestContents[cy * 1000 + cx][(8 * Math.floor((myGameArea.y - 250) / 70) + Math.floor((myGameArea.x - 50) / 70))][0] != 'e') {
            var h = chestContents[cy * 1000 + cx][(8 * Math.floor((myGameArea.y - 250) / 70) + Math.floor((myGameArea.x - 50) / 70))][0];
            var c = data.viewdata[h];
            var k = [];
            for (var m = 0; m < c.split('*').length; m++) {
                k.push(c.split('*')[m].length);
            }
            myGameArea.context.fillStyle = 'grey';
            myGameArea.context.fillRect(myGameArea.x - (6 * Math.max.apply(null, k)), myGameArea.y - (c.split('*').length * 20 / 2), (12 * Math.max.apply(null, k)), c.split('*').length * 20);
            myGameArea.context.fillStyle = 'white';
            myGameArea.context.font = '20px Arial';
            for (var x = 0; x < c.split('*').length; x++) {
                myGameArea.context.fillText(c.split('*')[x], myGameArea.x + (((12 * Math.max.apply(null, k)) - (12 * k[x])) / 2) - (6 * Math.max.apply(null, k)), myGameArea.y - (c.split('*').length * 20 / 2) + (20 * x) + 20);
            }
        }
    }
}