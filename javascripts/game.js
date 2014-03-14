var canvas;
var context;
var framerate = 20;
var frameskip = framerate/5;
var P1;
var P2;
var ball;
var ball_speed = 4;
var paddle_speed = 4;
var paddle_height = 80;
var paddle_width = 15;
var max_height;

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
    P1 = Player(1);
    P2 = Player(2);
    ball = Ball();
    max_height = context.canvas.clientHeight - paddle_height;
}

function gameLoop(){
    InputManager.proccessInput();
    clearCanvas();
    drawPlayer(P1);
    drawPlayer(P2);
    ball.move();
    drawBall(ball);
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
        var directionP1 = (this.isKeyPressed(87) ? -1 : 0) + //w
                          (this.isKeyPressed(83) ?  1 : 0);  //s
        P1.move(directionP1);

        //player2 action
        var directionP2 = (this.isKeyPressed(38) ? -1 : 0) + //up
                          (this.isKeyPressed(40) ?  1 : 0);  //down
        P2.move(directionP2);
    }
}

//Player class
Player = function(side){
    var x;
    var y;
    var sprite = new Image();
    sprite.src = "images/paddle.png";
    if(side==1){
        x = 10;
        y = 160;
    }
    else{
        x = 575;
        y = 160;
    }
    return {
        x:x,
        y:y,
        sprite:sprite,
        move: function(my){
            next_move = this.y + my*paddle_speed;
            if (next_move < 320 && next_move > 0){
                this.y = next_move;
            }
        }
    }
}

Ball = function(){
    var x = context.canvas.clientWidth / 2;
    var y = context.canvas.clientHeight / 2;
    var sprite = new Image();
    sprite.src = "images/ball.png";
    var direction_x = 1;
    var direction_y = 1;
    return{
        x:x,
        y:y,
        sprite:sprite,
        direction_x:direction_x,
        direction_y:direction_y,
        move: function(){
            this.x += direction_x * ball_speed;
            this.y += direction_y * ball_speed;
        }
    }
}

var game = {
    scoreP1:0,
    scoreP2:0,
    max_score:10,
}

function drawPlayer(player){
    context.drawImage(player.sprite, player.x, player.y);
}

function drawBall(ball){
    context.drawImage(ball.sprite, ball.x, ball.y);
}

function clearCanvas(){
    canvas.width = canvas.width;
}
