function renderSave(){
    myGameArea.context.drawImage(ime, 70, 210, 50, 50, 0, 0, 50, 50);
    if(myGameArea.click && myGameArea.x > 0 && myGameArea.x < 50 && myGameArea.y > 0 && myGameArea.y < 50){
        var sk = localStorage.getItem('secretKey') ?? Math.floor(Math.random() * 1000000000000);
        localStorage.setItem('secretKey',sk);
        var blk = [];
        for(var q of blocks){
            blk.push(compressArr(q));
        }
        var obj = {
            blocks: blk,
            biomes: compressArr(biomes),
            xpos: xpos,
            ypos: ypos,
            chestContents: chestContents,
            map: compressArr(map),
            mapview: compressArr(mapview),
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
            for(var q of text.blocks){
                blok.push(expandArr(q));
            }
            blocks = blok;
            inventory = text.inventory;
            biomes = expandArr(text.biomes);
            xpos = text.xpos;
            ypos = text.ypos;
            chestContents = text.chestContents;
            map = expandArr(text.map);
            mapview = expandArr(text.mapview);
            deathX = text.deathX;
            deathY = text.deathY;
            spawnx = text.spawnx;
            spawny = text.spawny;
            equipped = text.equipped;
            mobs = text.mobs;
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
	var res = [], ci = arr[0], cnm = 0;
	for(var x of arr){
    	if(x != ci){            
        	res.push(ci + '*' + cnm);
        	ci = x;
            cnm = 1;
        } else {
        	cnm++;
        }
    }
    res.push(ci + '*' + cnm);
    return res;
}
function expandArr(arr){
	var res = [];
    for(var x of arr){
    	for(var t = 0; t < x.split('*')[1]; t++){
        	res.push(x.split('*')[0]);
        }
    }
    return res;
}