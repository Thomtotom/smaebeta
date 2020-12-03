﻿var data = {
    maxClicks: {
        r: { def: 10, px: 4, ipx: 2},
        t4: { def: 10, x: 4, ix: 2},
        io: { def: 20, px: 10, ipx: 5},
        co: { def: 15, px: 8, ipx: 4},
        ch: { def: 5, x: 2, ix: 1},
        f: { def: 10, px: 5, ipx: 3 },
        nvp: { def: 10, px: 5, ipx: 3 },
        db: { def: 2, x: 1, ix: 1 }
    },
    dmg: {
        def: 2,
        px: 4,
        sw: 6,
        x: 5,
        bx: 7,
        ipx: 7,
        isw: 9,
        ix: 8,
        ibx: 10,
    },
    recipes: [
        [['p', 4], [['l', 1]], 'none'],
        [['st', 4], [['p', 2]], 'none'],
        [['sw', 1], [['s', 5], ['st', 10]], 'none'],
        [['px', 1], [['s', 5], ['st', 10]], 'none'],
        [['x', 1], [['s', 5], ['st', 10]], 'none'],
        [['bx', 1], [['s', 10], ['st', 10]], 'none'],
        [['ii', 1], [['c', 1], ['io', 1]], 'f'],
        [['ch', 1], [['p', 20]], 'none'],
        [['cs', 1], [['s', 3]], 'none'],
        [['t', 1], [['st', 1], ['gl', 1]], 'none'],
        [['f', 1], [['cs', 10], ['t', 10]], 'none'],
        [['nv', 1], [['cs', 1], ['ii', 5]], 'none'],
        [['isw', 1], [['ii', 5], ['st', 10]], 'nvp'],
        [['ipx', 1], [['ii', 5], ['st', 10]], 'nvp'],
        [['ix', 1], [['ii', 5], ['st', 10]], 'nvp'],
        [['ibx', 1], [['ii', 10], ['st', 10]], 'nvp'],
        [['cbf', 1], [['bf', 1], ['c', 1]], 'f'],
    ],
    dropitem: {
        r: { def: ['s', [1, 2]] },
        t4: { def: ['l', [4, 7]] },
        lp: { def: ['l', [1, 1]] },
        fb: { def: ['fb', [1, 1]] },
        io: { def: ['', [0, 0]], px: ['io', [1, 1]], ipx: ['io', [1, 1]] },
        co: { def: ['', [0, 0]], px: ['c', [1, 1]], ipx: ['c', [1, 1]] },
        f: { def: ['f', [1, 1]] },
        nvp: { def: ['nv', [1, 1]] },
        ch: { def: ['ch', [1, 1]] },
        db: { def: ['st', [1, 3]] },
    },
    defaultTile: {
        forest: 'g',
        mountain: 'sr',
        desert: 'ds',
    },
    placable: [
        ['f', 'f'],
        ['ch', 'ch'],
        ['nv', 'nvp'],
    ],
    walkable: ['g', 't0', 'fb', 'sr', 'ds', 'io', 'co','db'],
    blockimg: {
        g: [0, 0],
        cs: [1, 0],
        f: [2, 0],
        t: [3, 0],
        exp: [4, 0],
        t4: [0, 1],
        r: [1, 1],
        sw: [2, 1],
        l: [3, 1],
        s: [4, 1],
        p: [0, 2],
        st: [1, 2],
        px: [2, 2],
        x: [3, 2],
        bx: [4, 2],
        lp: [0, 3],
        fb: [1, 3],
        ds: [2, 3],
        sr: [3, 3],
        io: [4, 3],
        co: [0, 4],
        c: [1, 4],
        ii: [2, 4],
        ch: [3, 4],
        db: [4, 4],
        isw: [0, 5],
        ipx: [1, 5],
        ix: [2, 5],
        ibx: [3, 5],
        nv: [4, 5],
        nvp: [0, 6],
        gl: [1, 6],
    },
    color: {
        g: '#99ff66',
        sr: '#666666',
        t4: '#008000',
        r: '#999999',
        nvp: '#404040',
        f: '#b3b3b3',
        ds: '#ffff99',
        db: '#cc6600',
        io: '#ffcc99',
        co: '#000000',
        ch: '#ff9933'
    },
    spawnpatch: {
        io: [200, [5, 12]],
        co: [300, [5, 20]],
    },
    mobs: {
        blob: {
            get: {
                l: 0,
                r: 1,
                dl: 2,
                dr: 3,
            },
            type: 'passive',
            spawn: 'forest',
            speed: 0.02,
            health: 10,
            drop: [['gl', [1, 3]]],
            framerate: 5,
            cycleLoop: [0,1,2,3,4,5,6,7,8],
        }
    }
};