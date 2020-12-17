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
    this.dmg = data.mobs[name].dmg;
    this.render = function () {
        if (this.ch) {
            this.move();
            if ((this.x - xpos + (3 + 14/96)) * 96 < 850 && (this.y - ypos + (3 + 14/96)) * 96 < 850 && (this.x - xpos + (3 + 14/96)) * 96 > -150 && (this.y - ypos + (3 + 14/96)) * 96 > -150) {
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
                        myGameArea.context.drawImage(imm, 32 * this.l[this.fi], 32 * data.mobs[name].get['dr'], 32, 32, (this.x - xpos + (3 + 14/96)) * 96, (this.y - ypos + (3 + 14/96)) * 96, 96, 96);
                    } else {
                        myGameArea.context.drawImage(imm, 32 * this.l[this.fi], 32 * data.mobs[name].get['dl'], 32, 32, (this.x - xpos + (3 + 14/96)) * 96, (this.y - ypos + (3 + 14/96)) * 96, 96, 96);
                    }
                } else {
                    if (this.ng > Math.PI * 3 / 2 || this.ng < Math.PI / 2) {
                        myGameArea.context.drawImage(imm, 32 * this.l[this.fi], 32 * data.mobs[name].get['r'], 32, 32, (this.x - xpos + (3 + 14/96)) * 96, (this.y - ypos + (3 + 14/96)) * 96, 96, 96)
                    } else {
                        myGameArea.context.drawImage(imm, 32 * this.l[this.fi], 32 * data.mobs[name].get['l'], 32, 32, (this.x - xpos + (3 + 14/96)) * 96, (this.y - ypos + (3 + 14/96)) * 96, 96, 96)
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
            var ng = Math.random() * Math.PI * 2;
            dropblocs.push({
                item: this.d[p][0],
                num: Math.floor(Math.random() * (this.d[p][1][1] - this.d[p][1][0] + 1)) + this.d[p][1][0],
                xp: this.x + ((Math.random() ** (1/2)) * 2) * Math.cos(ng),
                yp: this.y + ((Math.random() ** (1/2)) * 2) * Math.sin(ng),
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