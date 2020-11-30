function loadTiles() {
    generateBiomes();
    for (var o = 0; o < height; o++) {
        for (var j = 0; j < width; j++) {
            blocks[o][j] = (o < 3 || o > 996 || j < 3 || j > 996) ? '' : (biomes[o * width + j] == 'forest' ? (Math.random() < 0.9 ? 'g' : (Math.random() < 0.5 ? 'r' : 't4')) : (biomes[o * width + j] == 'mountain' ? 'sr' : (Math.random() < 0.02 ? 'db' : 'ds')));
        }
    }
    for (p in data.spawnpatch) {
        for (var s = 0; s < data.spawnpatch[p][0]; s++) {
            var loop = Math.floor(Math.random() * (data.spawnpatch[p][1][1] - data.spawnpatch[p][1][0])) + data.spawnpatch[p][1][0], cx = Math.floor(Math.random() * 994) + 3, cy = Math.floor(Math.random() * 994) + 3;
            while (biomes[cx + width * cy] != 'mountain') {
                cx = Math.floor(Math.random() * 994) + 3;
                cy = Math.floor(Math.random() * 994) + 3;
            } 
            for (var n = 0; n < loop; n++) {
                blocks[cy + (n == 0 ? 1 : (n == 1 ? 2 : (n >= 2 && n <= 9 ? Math.floor((n - 2) / 4) : 1)))][cx + (n == 0 ? 1 : (n == 1 ? 2 : (n >= 2 && n <= 9 ? (n - 2) % 4 : 1)))] = String(p);
            }
        }
    }
    while (blocks[ypos][xpos] != 'g') {
        xpos = Math.floor(Math.random() * 990) + 5;
        ypos = Math.floor(Math.random() * 990) + 5;
    }
    genMobs();
}
function generateBiomes() {
    var colors = ['#ffff99', 'grey'];
    var cs = document.createElement("CANVAS");
    cs.width = 1000;
    cs.height = 1000;
    var ctx = cs.getContext("2d");
    var l = 100;
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, 1000, 1000);
    for (var k = 0; k < 12; k++) {
        var dx = Math.random() * 1000; dy = Math.random() * 1000;
        l = 200;
        ctx.beginPath();
        ctx.fillStyle = colors[k % colors.length];
        ctx.moveTo(dx, dy);
        for (var m = 0; m < 340; m++) {
            l += (Math.random() * 10) - 5;
            ctx.lineTo(dx + l * Math.cos(m * Math.PI / 180), dy + l * Math.sin(m * Math.PI / 180));
        }
        ctx.lineTo(dx + 200, dy);
        ctx.fill();
    }
    var c = ctx.getImageData(0, 0, 1000, 1000).data;
    var prev = 'forest';
    for (var i = 0; i < c.length; i += 4) {
        if (c[i] == 0 && c[i + 1] == 128 && c[i + 2] == 0) {
            prev = 'forest';
        } else if (c[i] == 255 && c[i + 1] == 255 && c[i + 2] == 153) {
            prev = 'desert';
        } else if (c[i] == 128 && c[i + 1] == 128 && c[i + 2] == 128) {
            prev = 'mountain';
        }
        biomes.push(prev);
    }
}