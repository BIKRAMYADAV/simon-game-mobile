var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(".start").click(function(){
    if(!started){
    $("#level-title").text("level"+level);
    nextSequence();
    started = true;}
});

$(".btn").click(function (){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    awaaj(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);

} );



function awaaj(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function nextSequence(){
    userClickedPattern = []; 
    level++;
    $("#level-title").text("level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    awaaj(randomChosenColor);
}


   


function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
    },100);
}
  

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      awaaj("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press start key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
       replay();
    }}

 


function replay(){
    level = 0;
    gamePattern = [];
    started = false;
}