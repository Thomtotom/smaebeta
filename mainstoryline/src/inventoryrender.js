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
    for (var q = 0; q < Math.min(70, alrec.length - (pagenum * 70)); q++) {
        var gx = chooseBlock(alrec[q + (pagenum * 70)][0][0][0])[0] * 32, gy = chooseBlock(alrec[q + (pagenum * 70)][0][0][0])[1] * 32;
        myGameArea.context.fillStyle = alrec[q + (pagenum * 70)][1] == 'y' ? 'grey' : 'maroon';
        myGameArea.context.fillRect(50 + (56 * (q % 10)), 250 + 56 * Math.floor(q / 10), 56, 56);
        myGameArea.context.font = '15px Arial';
        myGameArea.context.fillStyle = 'white';
        myGameArea.context.drawImage(imt, gx, gy, 32, 32, 53 + (56 * (q % 10)), 253 + 56 * Math.floor(q / 10), 50, 50);
        if (alrec[q + (pagenum * 70)][0][0][1] > 1) {
            myGameArea.context.fillText(alrec[q + (pagenum * 70)][0][0][1], 80 + (q % 10) * 56, 300 + 56 * Math.floor(q / 10));
        }
    }
    pages = Math.ceil(alrec.length / 70);
    return alrec;
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
function renderHoverCraft(k) {
    if (!myGameArea.click && myGameArea.x < 610 && myGameArea.y > 250 && myGameArea.x > 50 && k[(Math.floor((myGameArea.y - 250) / 56) * 10) + Math.floor((myGameArea.x - 50) / 56) + (pagenum * 70)]) {
        if (myGameArea.keys[16]) {
            myGameArea.context.fillStyle = 'grey';
            var bloc = k[(Math.floor((myGameArea.y - 250) / 56) * 10) + Math.floor((myGameArea.x - 50) / 56) + (pagenum * 70)][0][1];
            var util = k[(Math.floor((myGameArea.y - 250) / 56) * 10) + Math.floor((myGameArea.x - 50) / 56) + (pagenum * 70)][0][2];
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
            var h = k[(Math.floor((myGameArea.y - 250) / 56) * 10) + Math.floor((myGameArea.x - 50) / 56) + (pagenum * 70)][0][0][0];
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
    if (!myGameArea.click && myGameArea.x > 50 && myGameArea.x < 610 && myGameArea.y > 50 && myGameArea.y < 208 && inventory[Math.floor((myGameArea.x - 50) / 56) + 10 * Math.floor((myGameArea.y - 50) / 56)][0] != 'e') {
        var h = inventory[Math.floor((myGameArea.x - 50) / 56) + 10 * Math.floor((myGameArea.y - 50) / 56)][0];
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
    for (var y = 0; y < 30; y++) {
        var gx = chooseBlock(inventory[y][0])[0] * 32, gy = chooseBlock(inventory[y][0])[1] * 32;
        myGameArea.context.drawImage(ime, (y != invIndex ? (y <= 6 ? 56 : 0) : (y <= 6 ? 0 : 112)), y != invIndex ? 0 : (y <= 6 ? 56 : 0), 56, 56, 50 + (56 * (y % 10)), 50 + 56 * Math.floor(y / 10), 56, 56);
        myGameArea.context.drawImage(imt, gx, gy, 32, 32, 53 + (56 * (y % 10)), 53 + 56 * Math.floor(y / 10), 50, 50);
        if (inventory[y][1] > 1) {
            myGameArea.context.font = '15px Arial';
            myGameArea.context.fillStyle = 'white';
            myGameArea.context.fillText(inventory[y][1], 80 + (y % 10) * 56, 100 + 56 * Math.floor(y / 10));
        }
    }
}
function renderTrash() {
    myGameArea.context.drawImage(imh, 224, 0, 32, 32, 636, 50, 64, 64);
    if (myGameArea.x > 636 && myGameArea.x < 700 && myGameArea.y > 50 && myGameArea.y < 114 && myGameArea.click && invIndex != -1) {
        inventory[invIndex] = ['e', ''];
    }
}