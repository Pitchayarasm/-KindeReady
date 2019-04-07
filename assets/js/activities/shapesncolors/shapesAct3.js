$(document).ready(function() {

    $("#nextAct").attr("disabled", true);

    // Start Activity Button
    $("#start").on("click", function() {
        $(this).css("display", "none");
        $(".activity3").css("display", "block");
        $("#shapeChoice").text("________");
        $("#colorChoice").text("________");

        activity3();
    });

    // Get Button Values (SHAPES)
    $(".shape").on("click", function() {
        $("#shapeChoice").text($(this).attr("data-name").toUpperCase());
        $("#shapeChoice").attr("data-choice", $(this).attr("data-name"));
    });

    // Get Button Values (COLORS)
    $(".color").on("click", function() {
        $("#colorChoice").text($(this).attr("data-name").toUpperCase());
        $("#colorChoice").attr("data-choice", $(this).attr("data-name"));
    });

    $("#checkAnswer").on("click", function() {
        let studentAnswer = $("#shapeChoice").attr("data-choice") + "_" + $("#colorChoice").attr("data-choice");
        let correctAnswer = $("#questionBlock").attr("data-answer");
        checkAnswer(studentAnswer, correctAnswer);
    });

    $(".closeRetry").on("click", function() {
        $("#incorrectModal").modal("hide");
    });

    $(".closeNext").on("click", function() {
        $("#correctModal").modal("hide");
        activity3();
    });    
});

var numCorrect = 0;

function activity3() {

    $("#shapeChoice").text("________");
    $("#colorChoice").text("________");

    var shapes = ["square", "circle", "rectangle", "triangle"];
    var colors = ["red", "yellow", "blue", "green"];

    var randShape = shapes[Math.floor(Math.random() * shapes.length)];
    var randColor = colors[Math.floor(Math.random() * colors.length)];

    var imgSrc = "../../../images/shapes_colors/" + randShape + "_" + randColor + ".png";

    $("#questionBlock").attr("src", imgSrc);
    $("#questionBlock").attr("data-answer", randShape + "_" + randColor);
}

function checkAnswer(studentAnswer, correctAnswer) {

    let correctSplit = correctAnswer.split("_");
    let correctShape = correctSplit[0];
    let correctColor = correctSplit[1];
    
    let studentSplit = studentAnswer.split("_");
    let studentShape = studentSplit[0];
    let studentColor = studentSplit[1];
    
    if (studentAnswer === correctAnswer) {
        $("#correctModal").modal("show");
        numCorrect++;
        checkNumCorrect();
        $("#shapeChoice").attr("data-choice", "");
        $("#colorChoice").attr("data-choice", "");
    }
    else {
        $("#incorrectModal").modal("show");

        if (studentShape !== correctShape) {
            $("#shapeChoice").text("________");
        }

        if (studentColor !== correctColor) {
            $("#colorChoice").text("________");
        }
    }
}

function checkNumCorrect() {

    if (numCorrect === 6) {

        $("#nextAct").attr("disabled", false).removeClass("btn-outline-dark").addClass("btn-success");
        $("#nextReady").css("display", "block");
    }

    else {
        $("#nextAct").attr("disabled", true);
    }
}