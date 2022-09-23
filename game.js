
var colors = ["red", "yellow", "blue", "green"]
var gamePattern = []
var userClickedPattern = []

var started = false;
var level = 0;


// starts the game by detecting a keyboard press
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//plays a sound if a button is pressed
function playSound(name){
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}
//animates a button if a button is pressed
function animate(color){
    var button = $('#' + color);
    button.addClass('pressed');
    setTimeout(function() {
        button.removeClass('pressed');
    }, 100);
}

//randomly generates a random color to continue the game
function nextSequence(){
    
    level ++
    $("h1").text("Level " + level);
    console.log(level)
    var randomNumber = Math.floor(Math.random() * 4)
    gamePattern.push(colors[randomNumber])
    $("#" + colors[randomNumber]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(colors[randomNumber])
}


// checkes the users selected button against the array from the sequence of random colors to determite if it is correct or not
function checkAnswer(gameLevel){
    
    if (userClickedPattern[gameLevel] === gamePattern[gameLevel]){

        if (userClickedPattern.length == gamePattern.length) {
            userClickedPattern = []
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
        
    } else {

        var audio2 = new Audio('sounds/wrong.mp3');
        audio2.play();    

        var wrong = $('body');
        wrong.addClass('game-over');
        setTimeout(function() {
        wrong.removeClass('game-over');
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart")

        startOver();
        }
    
function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}  


}

//appends selected button into array to check against array from sequence of random colors

$(".btn").click(function(){
    var userChosenColor = this.id
    userClickedPattern.push(userChosenColor)

    playSound(userChosenColor)
    animate(userChosenColor)
    checkAnswer(userClickedPattern.length - 1)
})





