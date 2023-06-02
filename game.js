var started=false;

var level=0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
        checkAnswer(userClickedPaattern,gamePattern);
    }
})

var gamePattern=[];

var userClickedPaattern=[];

var buttonColours=["red","blue","green","yellow"];

$(".btn").click(function() {
    var userClickedcolor=$(this).attr("id");

    animatePress(userClickedcolor);

    userClickedPaattern.push(userClickedcolor);

    playSound(userClickedcolor);

    checkAnswer(userClickedPaattern.length-1);
})

function playSound(audioSource){
    var audio= new Audio("./sounds/"+audioSource+".mp3");
    audio.play();
}
function animatePress(colourchoosen){
    $("#"+colourchoosen).addClass("pressed");

    setTimeout(function() {
        $("#"+colourchoosen).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPaattern[currentLevel]){
  
        if(userClickedPaattern.length===gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }else{
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over")
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function nextSequence() { 
    userClickedPaattern=[];

    level++;
    $("#level-title").text("Level " + level);
    
    var randomNumber=Math.floor(Math.random()*4);

    var randomChosenColour=buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}