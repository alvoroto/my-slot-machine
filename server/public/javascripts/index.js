let game = new GameController();

window.onload = function() {
    game.init("canvas");
};

function play(){
    game.play()
}

window.onresize = function(event) {
    game.canvas.width = window.innerWidth/1.5;
    game.canvas.height = window.innerHeight/1.5;
};