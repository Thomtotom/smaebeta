function randomChoice(arr){
    var ttl = 0;
    for(var x in arr){
        ttl += arr[x][1];
    }
    var nm = Math.random() * ttl, cc = 0;
    for(var x in arr){
        cc += arr[x][1];
        if(nm < cc){
            return arr[x][0];
        }
    }
}
function loadTiles() {
    generateBiomes();
    for (var o = 0; o < height; o++) {
        for (var j = 0; j < width; j++) {
            var randVal = Math.random();
            if(o < 3 || o > 996 || j < 3 || j > 996){
                blocks[o][j] = '';
            } else {
                switch(biomes[o * width + j]){
                    case 'forest':
                        blocks[o][j] = randomChoice(data.biomeProb.forest);
                        break;
                    case 'desert':
                        blocks[o][j] = randomChoice(data.biomeProb.desert);
                        break;
                    case 'mountain': 
                        blocks[o][j] = 'sr';
                        break;
                }
            }
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
                if (biomes[(cy + Math.floor(n / Math.floor(loop ** (1 / 2)))) * width + cx + (n % Math.floor(loop ** (1 / 2)))] == 'mountain' && cy + Math.floor(n / Math.floor(loop ** (1 / 2))) > 2 && cy + Math.floor(n / Math.floor(loop ** (1 / 2))) < 997 && cx + (n % Math.floor(loop ** (1 / 2))) > 2 && cx + (n % Math.floor(loop ** (1 / 2))) < 997) {
                    blocks[cy + Math.floor((n / Math.floor(loop ** (1 / 2))))][cx + (n % Math.floor(loop ** (1 / 2)))] = String(p);
                }
            }
        }
    }
    for(z in data.temples){
        for(var u = 0; u < 50; u++){
            var tx = Math.floor(Math.random() * 987) + 3, ty = Math.floor(Math.random() * 987) + 3;
            while (biomes[tx + width * ty] != z) {
                tx = Math.floor(Math.random() * 987) + 3;
                ty = Math.floor(Math.random() * 987) + 3;
            }
            for(var q = 0; q < 49; q++){
                if(q % 7 == 0 || q % 7 == 6 || Math.floor(q / 7) == 0 || Math.floor(q / 7) == 6){
                    blocks[ty + Math.floor(q / 7)][tx + (q % 7)] = data.temples[z].wall;
                } else if(q == 26){
                    blocks[ty + Math.floor(q / 7)][tx + (q % 7)] = 'ch';
                    chestContents[(ty + Math.floor(q / 7)) * width + tx + (q % 7)] = [];
                    for(var w = 0; w < 23; w++){
                        var k = randomChoice(data.temples[z].contents);                       
                        chestContents[(ty + Math.floor(q / 7)) * width + tx + (q % 7)].push([k,(k == 'e' ? 0 : 1)]);
                    }
                    chestContents[(ty + Math.floor(q / 7)) * width + tx + (q % 7)].push([data.shortName[z] + 'c',1]);
                } else {
                    blocks[ty + Math.floor(q / 7)][tx + (q % 7)] = data.defaultTile[z];
                }
                if(q == 21){
                    blocks[ty + 3][tx] = data.defaultTile[z];
                }
                biomes[(ty + Math.floor(q / 7)) * width + tx + (q % 7)] = z;
            }
            mobs.push(new mob('g',tx + 3, ty + 3));
        }
    }
    genMobs();
}
function generateBiomes() {
    var colors = ['#ffff99', 'grey'];
    cs.width = 1000;
    cs.height = 1000;
    var ctx = cs.getContext("2d");
    var l = 100;
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, 1000, 1000);
    for (var k = 0; k < 12; k++) {
        var dx = Math.random() * 1000, dy = Math.random() * 1000;
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