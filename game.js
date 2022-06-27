
let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let level = 0;

let iterate = -1;

function nextSequence()
{
    iterate = 0;

    userClickedPattern = [];

    level++;

    $("h1").text("Level " + level);

    randomNumber = Math.floor(Math.random() * 4);

    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

$(document).keydown(function()
{
    if(level == 0)
    {
        setTimeout(function(){nextSequence();},200);
    }
})


$(".my-btn").click(function()
{
    let userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer();
}
);

function playSound(name)
{
    let audio = new Audio("sounds/" + name + ".mp3");

    audio.play();
}

function animatePress(currentColour)
{
    $("#" + currentColour).addClass("pressed");
    setTimeout(function()
    {
        $("#" + currentColour).removeClass("pressed");
    },100);
}

function checkAnswer()
{
    if(iterate != -1 && gamePattern[iterate++] == userClickedPattern[userClickedPattern.length - 1])
    {
        // nothing to execute
        if(iterate == gamePattern.length)
        {
            setTimeout(function(){nextSequence();},1000);
        }
    }
    else
    {
        gameOver();
    }
}

function gameOver()
{
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");},200);
    level = 0;
    gamePattern = [];
    iterate = -1;
    return;
}