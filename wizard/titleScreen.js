/* 
 * Manage the Title Screen
 * 
 * date: 03-03-2018
 */
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
};


