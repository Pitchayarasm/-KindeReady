var count = 0;


$(document).ready(function () {

    // array to create buttons on the screen
    var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    // for-loop to iterate through the letters array.
    for (var i = 0; i < letters.length; i++) {

        var letterBtn = $("<button>");

        letterBtn.addClass("letter-button letter-tile letter-button-color");

        letterBtn.attr("data-letter", letters[i]);

        letterBtn.text(letters[i]);

        $("#buttons").append(letterBtn);

    }

    // "on-click" event attached to the ".letter-button" class.
    $(".letter-button").on("click", function () {

        var letterTile = $("<div>");

        letterTile.addClass("letter-board tile-color");

        letterTile.text($(this).attr("data-letter"));

        $("#display").append(letterTile);

        count++;

        if (count > 28) {
            $("#display").empty();
            count = 0;
        }

    }); 

    // "on-click" event attached to the "#clear" button id.
    $("#clear").on("click", function () {

        $("#display").empty();

    });

});