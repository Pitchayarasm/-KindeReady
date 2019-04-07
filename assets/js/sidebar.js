let id = window.sessionStorage.studentId;
    id = id.toString();

$(document).ready(function() {
    
    $(".studentProgress").css("display", "none");
    
    $.get("/currentStudent/" + id, function(result) {

        // Show Student Information
        $("#studentAvatar").attr("src", result.avatar);
        $("#studentName").text(result.firstName + " " + result.lastName).css({"font-size": "24px", "font-weight": "bold"});
        $(".studentProgress").css("display", "block");
        
        function activity1Prog(id) {

            let unit1Prog = 0;

            $.get("/unit1/" + id, function(unit1Result) {

                let values = Object.values(unit1Result);
                
                for (let i = 0; i < values.length; i++) {
                    if (values[i] === true) {
                        unit1Prog++;
                    }
                }
            }).done(function() {

                if (unit1Prog < 4) {
                    $("#SnCActCount").text(unit1Prog + " / 4");
                    $("#SnC").css("width", (unit1Prog * 25) + "%");

                    if ($(window).width() <= 767) {
                        $("html, body").animate({
                            scrollTop: $(".title").offset().top
                        }, "slow");
                    };
                }
                else {
                    let star = $("<span>").addClass("fa fa-star").css("color", "gold");
    
                    $("#SnCActCount").html("<span class='fa fa-star' style='color: gold'></span> COMPLETE ");
                    $("#SnCActCount").append(star);
                    $("#SnC").removeClass("bg-success progress-bar-animated").css("width", (unit1Prog * 25) + "%");
    
                    $.post("/student/update/" + id, {unit1Complete: true}, function(result) {
                        console.log(result);
                    });
                }
    
                sessionStorage.setItem('unit1Prog', unit1Prog);
                activity2Prog(id);
            });
        };

        function activity2Prog(id) {

            let unit2Prog = 0;

            $.get("/unit2/" + id, function(unit2Result) {

                if (unit2Result) {
                    let values = Object.values(unit2Result);
                    
                    for (let i = 0; i < values.length; i++) {
                        if (values[i] === true) {
                            unit2Prog++;
                        }
                    }
                }

                }).done(function() {
                    if (unit2Prog < 4) {
                        $("#letActCount").text(unit2Prog + " / 4");
                        $("#letRec").css("width", (unit2Prog * 25) + "%");
                    }
                else {
                    let star = $("<span>").addClass("fa fa-star").css("color", "gold");

                    $("#letActCount").html("<span class='fa fa-star' style='color: gold'></span> COMPLETE ");
                    $("#letActCount").append(star);
                    $("#letRec").removeClass("bg-success progress-bar-animated").css("width", (unit2Prog * 25) + "%");

                    $.post("/student/update/" + id, {unit2Complete: true}, function(result) {
                        console.log(result);
                    });
                }
            
                sessionStorage.setItem('unit2Prog', unit2Prog);
            });
        };

        activity1Prog(id);

    }).done(function() {
        console.log("Student Set");
    });

    $(".studentProgress a").on("click", function() {
        sessionStorage.setItem("currentUnit", $(this).attr("data-unit"));
    });

    $("#nextAct").on("click", function() {

        let updateVal = {
            unit: window.sessionStorage.currentUnit,
            act: $(this).attr("data-act")
        };
        runUpdate(updateVal);
    });

    function runUpdate(updateVal) {

        console.log(updateVal);
        $.ajax({
            type: "PUT",
            url: "/activity/" + window.sessionStorage.studentId,
            data: updateVal
        });
    };

    // Logout or Change Student Storage Clear
    $("#change").on("click", function() {
        clearStorage();
    });

    $("#logout").on("click", function() {
        clearStorage();
    });
    
    checkWindowSize()
});

function clearStorage() {
    sessionStorage.removeItem("studentId");
    sessionStorage.removeItem("unit1Prog");
    sessionStorage.removeItem("unit2Prog");
    sessionStorage.removeItem("currentUnit");
};

function checkWindowSize() {

    if ($(window).width() <= 991) {
        $("#toLetters").attr("href", "");
    } else {
        $("#toLetters").attr("href", "/letter/main");
    }
};