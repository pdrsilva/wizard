var game;
var bgColor = 0x588c73;
//var bgColor = 0xff0000;
var gameBackgroundHeight = 256;
var barrierSpeed = 280;
var barrierGap = 900;
var wind = false;

Barrier = function(game, speed, tintColor){
    var position = (game.height + gameBackgroundHeight)/2;
    Phaser.Sprite.call(this, game, game.width + 100, position, "barrier");
    var cropRect = new Phaser.Rectangle(0, 0, 24, gameBackgroundHeight/4);
    this.crop(cropRect);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.set(0.5, 1);
    this.tint = tintColor;
    this.body.velocity.x = -speed;
    this.placeBarrier = true;
};

Barrier.prototype = Object.create(Phaser.Sprite.prototype);
Barrier.prototype.constructor = Barrier;

Barrier.prototype.update = function(){
    if(this.placeBarrier && game.width - this.x > barrierGap){
        this.placeBarrier = false;
        playGame.prototype.addBarrier(this.parent, this.tint);
    }
    if(this.x < 0){
        this.destroy();
    }
}

window.onload = function() {
    game = new Phaser.Game(960,640, Phaser.AUTO, "");
    game.state.add("Boot", boot);
    game.state.add("Preload", preload);
    game.state.add("TitleScreen", titleScreen);
    game.state.add("PlayGame", playGame);
    game.state.add("GameOverScreen", gameOverScreen);
    game.state.start("Boot");
}

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
}

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
        //game.load.image("wizard", "assets/sprites/wizard.png");
        game.load.image("barrier", "assets/sprites/barrier.png");
        game.load.spritesheet("button_A", "assets/sprites/button-round-a.png",64,64);
        game.load.spritesheet("the_wizard", "assets/sprites/mariospritesheet-small.png", 50, 50);
        game.load.spritesheet("ground", "assets/sprites/2048x48-ground.png",64,64);
        game.load.image('starfield', 'assets/sprites/starfield.jpg');
    },
    create: function(){
        this.game.state.start("TitleScreen");
    }
}

var titleScreen = function(game){};
titleScreen.prototype = {
    create: function(){
        game.stage.backgroundColor = bgColor;
        var title = game.add.image(game.width/2, 210, "title");
        title.anchor.set(0.5);
        var playButton = game.add.button(game.width/2, game.height - 200, "playbutton", this.startGame);
        playButton.anchor.set(0.5);
        var tween = game.add.tween(playButton).to({
            width: 220,
            height: 220
        }, 1500, "Linear", true, 0, -1);
        tween.yoyo(true);
    },
    startGame: function(){
        game.state.start("PlayGame");
    }
}

var playGame = function(game){};
playGame.prototype = {
    create: function(){
        var tintColor = bgColor;
        var gameBG = game.add.tileSprite(0, 0, game.width, game.height, "starfield");
        gameBG.tint = tintColor;
        var topWallBG = game.add.tileSprite(0, -gameBackgroundHeight/2, game.width, game.height/2, "wall");
        topWallBG.tint = tintColor;
        var bottomWallBG = game.add.tileSprite(0, (game.height + gameBackgroundHeight)/2, game.width, game.height/2, "wall");
        bottomWallBG.tint = tintColor;
        bottomWallBG.tileScale.y = -1;
        
        //add the ground 
        this.ground = game.add.sprite(0, 447, "ground");
        game.physics.enable(this.ground, Phaser.Physics.ARCADE);
        this.ground.body.velocity.x = -barrierSpeed;
        
        //create virtual game controller buttons
        
        this.button_wind = game.add.button(50, game.height - 100, "button_A", null, this, 0, 1, 0, 1);
        this.button_wind.fixedToCamera = true;
        
        this.button_earth = game.add.button(125, game.height - 100, "button_A", null, this, 0, 1, 0, 1);
        this.button_earth.fixedToCamera = true;
        
        this.button_fire = game.add.button(200, game.height - 100, "button_A", null, this, 0, 1, 0, 1);
        this.button_fire.fixedToCamera = true;
        
        this.button_water = game.add.button(275, game.height - 100, "button_A", null, this, 0, 1, 0, 1);
        this.button_water.fixedToCamera = true;
        
        
        //setting up the player
        this.wizard = game.add.sprite(100, 423, "the_wizard");
        
        //this.wizard = game.add.sprite(100, 423, "wizard");
        
        this.wizard.anchor.set(0.5);
        this.wizard.animations.add("walk", [1,2,3,4], 15, true);
        this.game.physics.enable(this.wizard, Phaser.Physics.ARCADE);
        this.wizard.animations.play("walk");
        
        this.barrierGroup = game.add.group();
        this.addBarrier(this.barrierGroup, tintColor);
    },
    addBarrier: function(group, tintColor){
        var barrier = new Barrier(game, barrierSpeed, tintColor);
        game.add.existing(barrier);
        group.add(barrier);
    }
}

var gameOverScreen = function(game){};
gameOverScreen.prototype = {
    
}