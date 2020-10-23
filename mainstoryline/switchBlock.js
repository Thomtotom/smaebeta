function renderBlocks() {
    var ctx = myGameArea.context;
    for (var l = 0; l < blocks.length; l++) {
        var rowDraw = Math.floor(l / width);
        var tileDraw = l % width;
        //very important, makes sure only visible tiles are rendered, saving huge amounts of time and lag. 
        if ((tileDraw - xpos + 3) * 100 <= 800 && (tileDraw - xpos + 3) * 100 >= -100 && (rowDraw - ypos + 3) * 100 <= 800 && (rowDraw - ypos + 3) * 100 >= -100) {
            var imgs = new Image();
            imgs.src = 'tiles/tiles-1.png';
            var dx, dy;
            switch (blocks[l]) {
                case 'g':
                    dx = 0;
                    dy = 0;
                    break;
                case 't0':
                    dx = 1;
                    dy = 0;
                    break;
                case 't2':
                    dx = 2;
                    dy = 0;
                    break;
                case 't3':
                    dx = 3;
                    dy = 0;
                    break;
                case 't1':
                    dx = 0;
                    dy = 1;
                    break;
                case 't4':
                    dx = 1;
                    dy = 1;
                    break;
                case 'r':
                    dx = 2;
                    dy = 1;
                    break;
                case 'd':
                    dx = 3;
                    dy = 1;
                    break;
                /* decides what to render. Each tile has 2-4 letter shorthand. syntax:
            case <shorthand>:
                dx = <xpos in sheet>;
                dy = <ypos in sheet>;
                break;
         */
            }
        }
        ctx.drawImage(imgs, dx * 32, dy * 32, 32, 32, (tileDraw - xpos + 3) * 100, (rowDraw - ypos + 3) * 100, 100, 100);
    }
}
       