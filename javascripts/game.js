var canvas;

window.onload = function(){
    startUp();
}

function startUp(){
    canvas = document.getElementById('game_canvas');
    context = canvas.getContext('2d');
    console.log(context);
}

