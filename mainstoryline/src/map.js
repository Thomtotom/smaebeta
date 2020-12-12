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
    myGameArea.context.fillStyle = 'cyan';
    myGameArea.context.fillRect(deathX * 0.7 - 5, deathY * 0.7 - 5, 10, 10);
    myGameArea.context.fillStyle = 'lime';
    myGameArea.context.fillRect(spawnx * 0.7 - 5, spawny * 0.7 - 5, 10, 10);
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