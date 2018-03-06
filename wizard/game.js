var game;

window.onload = function() {
    game = new Phaser.Game(1600, 640, Phaser.AUTO, "game");
    game.state.add("Boot", boot);
    game.state.add("Preload", preload);
    game.state.add("TitleScreen", titleScreen);
    game.state.add("PlayGame", playGame);
    game.state.add("GameOverScreen", gameOverScreen);
    game.state.start("Boot");
};

var boot = function(game){};
boot.prototype = {
    preload: function(){
        this.game.load.image("loading","assets/sprites/loading.png");   
    },
    create: function(){
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVerticaly = true;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.state.start("Preload");
    }
};

var preload = function(game){};
preload.prototype = {
    preload: function(){
        var loadingBar = this.add.sprite(game.width/2, game.height/2, "loading");
        loadingBar.anchor.setTo(0.5);
        game.load.setPreloadSprite(loadingBar);
        game.load.image("title", "assets/sprites/title.png");
        game.load.image("playbutton", "assets/sprites/playbutton.png");
        game.load.image("gamebg", "assets/sprites/gamebg.png");
        game.load.image("wall", "assets/sprites/wall.png");
        game.load.image("wizard", "assets/sprites/wizard.png");
        game.load.image("barrier", "assets/sprites/barrier.png");
        game.load.image("landscape", "assets/sprites/grass.png");
        game.load.image("ground", "assets/sprites/ground.png");
    },
    create: function(){
        this.game.state.start("TitleScreen");
    }
};

var playGame = function(game){};
playGame.prototype = {
    create: function(){
        landscapeHeight = game.cache.getImage('landscape').height;
        groundHeight = game.cache.getImage('ground').height;
        wizardHeight = game.cache.getImage('wizard').height;
        
        var tintColor = bgColor;
        var gameBG = game.add.tileSprite(0, 0, game.width, game.height, "gamebg");
        gameBG.tint = tintColor;
//        var topWallBG = game.add.tileSprite(0, -gameBackgroundHeight/2, game.width, game.height/2, "wall");
//        topWallBG.tint = tintColor;
//        var bottomWallBG = game.add.tileSprite(0, (game.height + gameBackgroundHeight)/2, game.width, game.height/2, "wall");
//        bottomWallBG.tint = tintColor;
//        bottomWallBG.tileScale.y = -1;
                
        landscape = game.add.tileSprite(0, game.height - landscapeHeight - groundHeight + 25,
            game.width, landscapeHeight, "landscape");
        ground = game.add.tileSprite(0, game.height - groundHeight, game.width, groundHeight, "ground");
        
        this.wizard = game.add.sprite(100, game.height - wizardHeight - groundHeight + 30, "wizard");
        this.wizard.anchor.set(0.5);
        this.game.physics.enable(this.wizard, Phaser.Physics.ARCADE);
        
        this.barrierGroup = game.add.group();
        this.addLandscape();
        this.addBarrier(this.barrierGroup, tintColor);
    },
    addLandscape: function() {
        
    },
    addBarrier: function(group, tintColor){
        addBarrier(group, tintColor);
    }
};