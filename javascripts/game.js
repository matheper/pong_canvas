var canvas;
var context;
var framerate = 20;
var frameskip = framerate/5;

window.onload = function(){
    startUp();
}

$(document).keydown(function(e){
    InputManager.onKeyPress(e);
});

$(document).keyup(function(e){
    InputManager.onKeyRelease(e);
});

function startUp(){
    window.setInterval(gameLoop, framerate);
    canvas = document.getElementById('game_canvas');
    context = canvas.getContext('2d');
}

function gameLoop(){
    InputManager.proccessInput();
}

//Input Management
var InputManager = {
    keysPressed: [],
    //get key presses
    onKeyPress: function(e) {
        var haskey = this.keysPressed[e.keyCode];
        if(!haskey){
            this.keysPressed[e.keyCode] = true;
        }
    },
    //key release
    onKeyRelease: function(e){
        this.keysPressed[e.keyCode] = false;
    },
    //is key pressed?
    isKeyPressed: function(key){
        return this.keysPressed[key];
    },
    //players actions
    proccessInput: function(){
        //player1 action
        var directionP1 = (this.isKeyPressed(38) ? -1 : 0) + //up
                          (this.isKeyPressed(40) ?  1 : 0);  //down

        //player2 action
        var directionP2 = (this.isKeyPressed(87) ? -1 : 0) + //w
                          (this.isKeyPressed(83) ?  1 : 0);  //s
    }
}

//Player class
Player = function(side){
    var x;
    var y;
    if(side==1){
        x = 10;
        y = 10;
    }
    else{
        x = 20;
        y = 20;
    }
    return {
        x:x,
        y:y,
    }
}
