var all_images = ["red", "green", "yellow", "blue"];
var used_brushes = ["redBrush", "greenBrush", "blueBrush", "yellowBrush"];
var finalArray;
var firstSequence;

$(document).ready(function() {

  $("#nextAct").attr("disabled", true).removeClass("btn-outline-success").addClass("btn-outline-dark");

  var red = $("<img>").attr("src", "/images/shapes_colors/red_apple.jpeg").addClass("img-thumbnail gamePiece");
  var green = $("<img>").attr("src", "/images/shapes_colors/green_apple.jpeg").addClass("img-thumbnail gamePiece");
  var yellow = $("<img>").attr("src", "/images/shapes_colors/yellow_eleph.png").addClass("img-thumbnail gamePiece");
  var blue = $("<img>").attr("src", "/images/shapes_colors/blue_eleph.png").addClass("img-thumbnail gamePiece");

  var redBrush = $("<img>").attr("src", "/images/shapes_colors/paint_red.png").addClass("img-thumbnail brush");
  var greenBrush = $("<img>").attr("src", "/images/shapes_colors/paint_green.png").addClass("img-thumbnail brush");
  var blueBrush = $("<img>").attr("src", "/images/shapes_colors/paint_blue.png").addClass("img-thumbnail brush");
  var yellowBrush = $("<img>").attr("src", "/images/shapes_colors/paint_yellow.png").addClass("img-thumbnail brush");

  var Time = 90;
  var contino = 0;

  function Randomize(Subject) {
    let counter = Subject.length;
    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;

      let temp = Subject[counter];
      Subject[counter] = Subject[index];
      Subject[index] = temp;
    }
    return Subject;
  }


  $("#start").click(function () {
    StartGame();
    $(this).hide();
    $("#whenReady").css("visibility", "hidden");
  })

  function StartGame() {
    finalArray = [];
    firstSequence = [];
    Counter();
    LoadGame();
  }

  function LoadGame() {
    CreateObjBottom();
    CreateObjTop();
  }

  function Counter() {
    var Countdown = Time;
    $('.counter').html("<h1>Time Remaining: <strong>" + Countdown + "</strong></h1>");

    count = setInterval(function () {
      Countdown--;
      if (Countdown >= 0) {
        $('.counter').html("<h1>Time Remaining: <strong>" + Countdown + "</strong></h1>");
      }
      if (Countdown == 0) {
        $("#gameOver").modal("show");
        $('.tryAgain').click(function() {
          clearInterval(count);
          Time = 90;
          contino = 0;
          $("#gameOver").modal("hide");
          $(".brushesDiv").empty();
          StartGame();
          return false;
        });
        
      }
    }, 1000);
  }

  function CreateObjTop() {

    all_images = Randomize(all_images);

      // set 4 random colors into random colors array
      var i = 0;
      firstSequence = [];
      $.each(all_images, function (index, imgName) {
        var imgID = $("#pic" + i);
        imgID.append(eval(imgName));
        firstSequence.push(imgName);
        i++;
      });
  }

  function CreateObjBottom() {
    Randomize(used_brushes);

    var redBrush = $("<img>").attr("src", "/images/shapes_colors/paint_red.png").addClass("img-thumbnail brush");
    var greenBrush = $("<img>").attr("src", "/images/shapes_colors/paint_green.png").addClass("img-thumbnail brush");
    var blueBrush = $("<img>").attr("src", "/images/shapes_colors/paint_blue.png").addClass("img-thumbnail brush");
    var yellowBrush = $("<img>").attr("src", "/images/shapes_colors/paint_yellow.png").addClass("img-thumbnail brush");

    // set 4 random colors into random colors array
    var x = 0;
    var secondSequence = [];
    $.each(used_brushes, function (err, brushName) {
      var brushID = $("#brush" + x);
      brushID.append(eval(brushName));

      secondSequence.push(brushName);
      x++;

    });

    $(redBrush).click(function choose() {
      $(this).css({"box-shadow": "none", "background-color": "lightgrey", "opacity": "0.5"}).removeClass("brush");
      buildArray("red");
    });

    $(greenBrush).click(function choose() {
      $(this).css({"box-shadow": "none", "background-color": "lightgrey", "opacity": "0.5"}).removeClass("brush");
      buildArray("green");
    });

    $(yellowBrush).click(function choose() {
      $(this).css({"box-shadow": "none", "background-color": "lightgrey", "opacity": "0.5"}).removeClass("brush");
      buildArray("yellow");
    });

    $(blueBrush).click(function choose() {
      $(this).css({"box-shadow": "none", "background-color": "lightgrey", "opacity": "0.5"}).removeClass("brush");
      buildArray("blue");
    });
  }

  function buildArray(color) {
    console.log(color);
    if (finalArray.includes(color)) {
    }
    else {
      console.log(finalArray);
      finalArray.push(color);
      contino++;
      console.log(contino);
    }
    
    if (contino == 4) {
      compare(finalArray);
    }
  }

  function compare(finalArray) {
    if (finalArray[0] == all_images[0] && finalArray[1] == all_images[1] && finalArray[2] == all_images[2] && finalArray[3] == all_images[3]) {
      $("#correctModal").modal("show");
      clearInterval(count);
      $("#nextAct").attr("disabled", false).removeClass("btn-outline-dark").addClass("btn-success");
      $('#playAgain').click(function() {
        clearInterval(count);
        Time = 90;
        contino = 0;
        $("#correctModal").modal("hide");
        $(".brushesDiv").empty();
        StartGame();
        return false;
      });

    } else {
      $("#incorrectModal").modal("show");
      clearInterval(count);
      $('.tryAgain').click(function() {
        clearInterval(count);
        Time = 90;
        contino = 0;
        $("#incorrectModal").modal("hide");
        $(".brushesDiv").empty();
        StartGame();
        return false;
      });
    }
  }
});