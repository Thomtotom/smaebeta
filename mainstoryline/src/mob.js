function mob(name) {
    if(data.setPos.includes(name)){
        this.x = arguments[1];
        this.y = arguments[2];
    } else {
        this.x = Math.floor(Math.random() * 994) + 3; this.y = Math.floor(Math.random() * 994) + 3;
        while (biomes[this.y * width + this.x] != data.mobs[name].spawn) {
            this.x = Math.floor(Math.random() * 994) + 3;
            this.y = Math.floor(Math.random() * 994) + 3;
        }
    }
    this.h = data.mobs[name].health;
    this.dmgc = 0;
    this.ch = true;
    this.ng = 0;
    this.name = name;
    this.fc = 0;
    this.fi = 0;
    this.ac = 0;
}
function dieMob(mob){
    for (p in data.mobs[mob.name].drop) {
        var ng = Math.random() * Math.PI * 2;
        dropblocs.push({
            item: data.mobs[mob.name].drop[p][0],
            num: Math.floor(Math.random() * (data.mobs[mob.name].drop[p][1][1] - data.mobs[mob.name].drop[p][1][0] + 1)) + data.mobs[mob.name].drop[p][1][0],
            xp: mob.x + ((Math.random() ** (1/2)) * 2) * Math.cos(ng),
            yp: mob.y + ((Math.random() ** (1/2)) * 2) * Math.sin(ng),
        });
    }
    mob.ch = false;
    mob.ac = undefined;
    mob.x = undefined;
    mob.y = undefined;
    mob.h = undefined;
    mob.t = undefined;
    mob.d = undefined;
    mob.ng = undefined;
}
function dxMob(e,mob) {
    if (e > 0) {
        if (walkable.includes(blocks[(Math.floor(mob.y))][Math.ceil(mob.x + e)]) && walkable.includes(blocks[(Math.ceil(mob.y))][Math.ceil(mob.x + e)])) {
            mob.x += e;
        }
    } else {
        if (walkable.includes(blocks[(Math.floor(mob.y))][Math.floor(mob.x - e)]) && walkable.includes(blocks[(Math.ceil(mob.y))][Math.floor(mob.x - e)])) {
            mob.x += e;
        }
    }
}
function genMobs() {
    for (var c = 0; c < 2000; c++) {
        mobs.push(new mob('blob'));
    }
}
function renMobs() {
    for (var t = 0; t < mobs.length; t++) {
        renderMob(mobs[t]);
    }
}
function renderMob(mob){
    if (mob.ch) {
        moveMob(mob);
        if ((mob.x - xpos + (3 + 14/96)) * 96 < 1600 && (mob.y - ypos + (3 + 14/96)) * 96 < 850 && (mob.x - xpos + (3 + 14/96)) * 96 > -800 && (mob.y - ypos + (3 + 14/96)) * 96 > -150) {
            mob.fc++;
            if (mob.fc == data.mobs[mob.name].framerate) {
                mob.fc = 0;
                mob.fi++;
                if (mob.fi == data.mobs[mob.name].cycleLoop.length - 1) {
                    mob.fi = 0;
                }
            }
            if (mob.dmgc > 0) {
                mob.dmgc--;
                if (mob.ng > Math.PI * 3 / 2 || mob.ng < Math.PI / 2) {
                    myGameArea.context.drawImage(imm, 32 * data.mobs[mob.name].cycleLoop[mob.fi], 32 * data.mobs[mob.name].get['dr'], 32, 32,700 +  (mob.x - xpos + (3 + 14/96)) * 96, (mob.y - ypos + (3 + 14/96)) * 96, 96, 96);
                } else {
                    myGameArea.context.drawImage(imm, 32 * data.mobs[mob.name].cycleLoop[mob.fi], 32 * data.mobs[mob.name].get['dl'], 32, 32,700 +  (mob.x - xpos + (3 + 14/96)) * 96, (mob.y - ypos + (3 + 14/96)) * 96, 96, 96);
                }
            } else {
                if (mob.ng > Math.PI * 3 / 2 || mob.ng < Math.PI / 2) {
                    myGameArea.context.drawImage(imm, 32 * data.mobs[mob.name].cycleLoop[mob.fi], 32 * data.mobs[mob.name].get['r'], 32, 32,700 +  (mob.x - xpos + (3 + 14/96)) * 96, (mob.y - ypos + (3 + 14/96)) * 96, 96, 96)
                } else {
                    myGameArea.context.drawImage(imm, 32 * data.mobs[mob.name].cycleLoop[mob.fi], 32 * data.mobs[mob.name].get['l'], 32, 32,700 +  (mob.x - xpos + (3 + 14/96)) * 96, (mob.y - ypos + (3 + 14/96)) * 96, 96, 96)
                }
            }
        }
    }
}
function moveMob(mob){
    if (data.mobs[mob.name].type == 'passive') {
        mob.ac++;
        if (mob.ac == 50) {
            mob.ac = 0;
            mob.ng = Math.random() * Math.PI * 2;
        }
    }
    if (data.mobs[mob.name].type == 'hostile') {
        if ((((mob.x - xpos) ** 2) + ((mob.y - ypos) ** 2)) ** (1 / 2) < 10) {
            mob.ng = Math.atan2(mob.y - ypos, xpos - mob.x);
        } else {
            mob.ac++;
            if (mob.ac == 50) {
                mob.ac = 0;
                mob.ng = Math.random() * Math.PI * 2;
            }
        }
    }
    dxMob(Math.cos(mob.ng) * data.mobs[mob.name].speed,mob);
    dyMob(Math.sin(mob.ng) * data.mobs[mob.name].speed,mob);
}
function dyMob(e,mob){
    if (e > 0) {
        if (walkable.includes(blocks[(Math.floor(mob.y - e))][Math.floor(mob.x)]) && walkable.includes(blocks[(Math.floor(mob.y - e))][Math.ceil(mob.x)])) {
            mob.y -= e;
        }
    } else {
        if (walkable.includes(blocks[(Math.ceil(mob.y + e))][Math.floor(mob.x)]) && walkable.includes(blocks[(Math.ceil(mob.y + e))][Math.ceil(mob.x)])) {
            mob.y -= e;
        }
    }
}