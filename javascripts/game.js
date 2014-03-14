var canvas;
var context;
var framerate = 15;
var frameskip = framerate/5;
var P1;
var P2;
var paddle_speed = 4;
var paddle_height = 80;
var paddle_width = 15;
var max_paddle_height;
var ball;
var ball_speed = 4;
var ball_size = 15;
var max_ball_height;

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
    max_paddle_height = context.canvas.clientHeight - paddle_height;
    max_ball_height = context.canvas.clientHeight - ball_size;
}

function gameLoop(){
    InputManager.proccessInput();
    game.physicsUpdate();
    clearCanvas();
    drawBall(ball);
    drawPlayer(P1);
    drawPlayer(P2);
    drawHUD(game);
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
            next_y = this.y + my*paddle_speed;
            if (next_y < max_paddle_height && next_y > 0){
                this.y = next_y;
            }
        }
    }
}

Ball = function(){
    var x = 25;
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
            this.x += this.direction_x * ball_speed;
            this.y += this.direction_y * ball_speed;
        },
        reset: function(side){
            this.x = side == 1 ? 25 : 555;
            this.y = context.canvas.clientHeight / 2;
            this.direction_x = side;
            this.direction_y = side;
        }
    }
}

var game = {
    scoreP1:0,
    scoreP2:0,
    max_score:10,
    physicsUpdate: function(){
        //Verifica colisoes com as paredes
        ball.x += ball.direction_x * ball_speed;
        next_y = ball.y + ball.direction_y * ball_speed;
        if (next_y > max_ball_height){
            ball.direction_y = -1
        }
        else if(next_y < 0){
            ball.direction_y = 1;
        }
        //Verifica colisoes com os raquetes
        if (testCollisions(P1, ball)){
            ball.direction_x = 1;
        }
        else if (testCollisions(P2, ball)){
            ball.direction_x = -1;
        }
        //Um jogador pontua
        if (ball.x > context.canvas.clientWidth){
            this.scoreP1 += 1;
            ball.reset(-1);
        }
        else if(ball.x < 0){
            this.scoreP2 += 1;
            ball.reset(1);
        }
    ball.move();
    }
}

//ball logic

//Colision
function testCollisions(obj1, obj2){
    var collision = !(obj1.x > obj2.x + obj2.sprite.width ||
             obj1.x + obj1.sprite.width < obj2.x ||
             obj1.y > obj2.y + obj2.sprite.height ||
             obj1.y + obj1.sprite.height < obj2.y);
    return collision;
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

//heads-up display
function drawHUD(game){
    context.textAlign = "center";
    context.font = "bold 12pt sans-serif";
    context.textBaseline = "bottom";
    context.fillStyle = "rgb(255,255,255)";
    context.fillText(game.scoreP1 + " X " + game.scoreP2, 290, 20);

}
