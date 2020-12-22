function renderSave(){
    myGameArea.context.drawImage(ime, 70, 210, 50, 50, 0, 0, 50, 50);
    if(myGameArea.click && myGameArea.x > 0 && myGameArea.x < 50 && myGameArea.y > 0 && myGameArea.y < 50){
        var sk = localStorage.getItem('secretKey') ?? Math.floor(Math.random() * 1000000000000);
        localStorage.setItem('secretKey',sk);
        var blk = [];
        for(var q of blocks){
            blk.push(compressArr(q));
        }
        blk = blk.join('&');
        var mobcl = mobs;
        for(var k in mobcl){
            mobcl[k].x = Math.floor(mobcl[k].x * 10) / 10;
            mobcl[k].y = Math.floor(mobcl[k].y * 10) / 10;
            mobcl[k].ng = Math.floor(mobcl[k].ng * 10) / 10;
            if(k > 0){
                if(mobcl[k].name == mobcl[k - 1].name){
                    delete mobcl[k - 1].name;
                }
                if(mobcl[k].ac == mobcl[k - 1].ac){
                    delete mobcl[k - 1].ac;
                }
                if(mobcl[k].fc == mobcl[k - 1].fc){
                    delete mobcl[k - 1].fc;
                }
                if(mobcl[k].h == mobcl[k - 1].h){
                    delete mobcl[k - 1].h;
                }
                if(mobcl[k].fi == mobcl[k - 1].fi){
                    delete mobcl[k - 1].fi;
                }
                if(mobcl[k].ch == mobcl[k - 1].ch){
                    delete mobcl[k - 1].ch;
                }
                if(mobcl[k].dmgc == mobcl[k - 1].dmgc){
                    delete mobcl[k - 1].dmgc;
                }
            }
        }
        var obj = {
            blocks: blk,
            biomes: compressArr(replaceVals(biomes)),
            xpos: xpos,
            ypos: ypos,
            chestContents: chestContents,
            map: compressArr(replaceVals(map)),
            mapview: compressArr(replaceVals(mapview)),
            deathX: deathX,
            deathY: deathY,
            secretKey: sk,
            spawnx: spawnx,
            spawny: spawny,
            equipped: equipped,
            mobs: mobs,
            playerHealth: playerHealth,
            maxHealth: maxHealth,
            inventory: inventory,
        };
        document.getElementById('dwnld').href = 'data:text/plain,' + JSON.stringify(obj);
        alert("Put this somewhere safe");
        myGameArea.click = false;
        document.getElementById('dwnld').click();
    }
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
            text.blocks = text.blocks.split('&');
            for(var q of text.blocks){
                blok.push(expandArr(q));
            }
            var mobcl = text.mobs;
            for(var k = mobcl.length - 1; k >= 0; k--){
                if(mobcl[k].name === undefined){
                    mobcl[k].name = mobcl[k + 1].name;
                }
                if(mobcl[k].ac === undefined){
                    mobcl[k].ac = mobcl[k + 1].ac;
                }
                if(mobcl[k].fc === undefined){
                    mobcl[k].fc = mobcl[k + 1].fc;
                }
                if(mobcl[k].h === undefined){
                    mobcl[k].h = mobcl[k + 1].h;
                }
                if(mobcl[k].fi === undefined){
                    mobcl[k].fi = mobcl[k + 1].fi;
                }
                if(mobcl[k].ch === undefined){
                    mobcl[k].ch = mobcl[k + 1].ch;
                }
                if(mobcl[k].dmgc === undefined){
                    mobcl[k].dmgc = mobcl[k + 1].dmgc;
                }
                blocks = blok;
            }
            inventory = text.inventory;
            biomes = expandVals(expandArr(text.biomes));
            xpos = text.xpos;
            ypos = text.ypos;
            chestContents = text.chestContents;
            map = expandVals(expandArr(text.map));
            mapview = expandVals(expandArr(text.mapview));
            deathX = text.deathX;
            deathY = text.deathY;
            spawnx = text.spawnx;
            spawny = text.spawny;
            equipped = text.equipped;
            mobs = mobcl;
            playerHealth = text.playerHealth;
            maxHealth = text.maxHealth;
            screenNum = 1;
        }
	};
    reader.readAsText(input.files[0]);
    document.getElementById('upload').hidden = true;
    document.getElementById('canvas').hidden = false;
}
function compressArr(arr){
	var res = '', ci = arr[0], cnm = 0;
	for(var x of arr){
    	if(x != ci){
        	if(ci === ''){
            	ci = '_';
            }
            res += ci + cnm;    
        	ci = x;
            cnm = 1;
        } else {
        	cnm++;
        }
    }
    if(ci === ''){
        ci = '_';
    }
    res += ci + cnm;    
    return res;
}
function expandArr(str){
	var alpha = 'abcdefghijklmnopqrstuvwxyz_', cn = '', cnm, c = 'str', res = [];
	for(var q = 0; q < str.length; q++){
    	if(alpha.includes(str.charAt(q))){
        	if(c == 'str'){
            	cn += str.charAt(q); 
            } else {
            	c = 'str';
                if(cn == '_'){
                	cn = '';
                }
                for(var x = 0; x < cnm; x++){
                	res.push(cn);
                }
                cn = str.charAt(q);
                cnm = 0;
            }
        } else {
        	if(c == 'num'){
            	cnm = (cnm * 10) + parseInt(str.charAt(q)); 
            } else {
            	c = 'num';
                cnm = str.charAt(q);
            }
        }
    }
    if(cn == '_'){
        cn = '';
    }
    for(var x = 0; x < cnm; x++){
        res.push(cn);
    }
    return res;
}
function replaceVals(arr){
    for(var x in arr){
        arr[x] = data.shortName[arr[x]];
    }
    return arr;
}
function expandVals(arr){
    for(var y in arr){
        arr[y] = data.fullName[arr[y]];
    }
    return arr;
}