/* 
 * Manages Barriers
 * 
 * date: 03-03-2018
 */

Barrier = function(game, speed, tintColor){
    barrierHeight = game.cache.getImage('barrier').height;
    var position = (game.height - groundHeight + 5);
    Phaser.Sprite.call(this, game, game.width + 100, position, "barrier");
//    var cropRect = new Phaser.Rectangle(0, 0, 24, gameBackgroundHeight/4);
//    this.crop(cropRect);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.set(0.5, 1);
    this.tint = tintColor;
    this.body.velocity.x = -speed;
    this.placeBarrier = true;
};

Barrier.prototype = Object.create(Phaser.Sprite.prototype);
Barrier.prototype.constructor = Barrier;

Barrier.prototype.update = function(){
    if(this.placeBarrier && this.x > barrierGap){
        //console.log(this.x);
        this.placeBarrier = false;
        //playGame.prototype.addBarrier(this.parent, this.tint);
    }
    if(this.x < 0){
        this.destroy();
    }

    landscape.tilePosition.x -= 3;
};

function addBarrier (group, tintColor) {
    var barrier = new Barrier(game, barrierSpeed, tintColor);
    game.add.existing(barrier);
    group.add(barrier);
}



