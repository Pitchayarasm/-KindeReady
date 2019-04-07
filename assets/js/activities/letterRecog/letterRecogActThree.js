// word stores the alphabet
var word = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// answerArray stores the answer board (starting with all _ and gradually filled in)
var answerArray = [];
var remaining_letters = 26;

function init() {

    $("#nextAct").attr("disabled", true);

    // Set up the answer array
    answerArray = [];
    for (var i = 0; i < word.length; i++) {
        answerArray[i] = "_";
    }
    document.getElementById("answer").innerHTML = answerArray.join(" ");
    document.getElementById("message").innerHTML = "Type a letter in the box then press submit.  You can press reset to start over."
}
init();

$("#guess").keyup(function(e) {
    if (e.keyCode === 13) {
        $("#letterSubmit").click();
    }
});

$("#letterSubmit").on("click", guessOne);

function guessOne() {
    // Get a guess from the player
    var guess = document.getElementById("guess").value.toUpperCase();
    var showThisMessage = "";

    if (guess.length !== 1) {
        showThisMessage = "Please enter only a single letter";
    } else {
        // Update the game with the guess
        var i = 0; // an indexer into the array 
        for (i = 0; i < word.length; i++) {
            if (word[i] === guess) {
                answerArray[i] = guess;
                showThisMessage = "Good job! " + guess + " is in the alphabet.  What other letters are missing?";
                remaining_letters--;
            }
        }

        // if no remaining letters, hurray, you won
        if (remaining_letters === 0) {
            showThisMessage = "Great Job! You know the alphabet!!";
            $("#nextAct").attr("disabled", false).removeClass("btn-outline-dark").addClass("btn-success");
        }

        // (otherwise) if we have no message, wrong guess 
        if (showThisMessage === "") {
            showThisMessage = "Sorry, " + guess + " is not a letter.";
        }

        // Update the puzzle
        document.getElementById("answer").innerHTML = answerArray.join(" ");

        // Lend a hand by clearing out their last guess
        document.getElementById("guess").value = "";
    }
    document.getElementById("message").innerHTML = showThisMessage;
}

$("#letterReset").on("click", quit);

function quit() {
    remaining_letters = 26;
    document.getElementById("message").innerHTML = "Here is the Alphabet. " + word;
    for (var j = 0; j < word.length; j++) {
        answerArray[j] = word[j];
    }
    // Solve the puzzle
    document.getElementById("answer").innerHTML = answerArray.join(" ");
    init();
}