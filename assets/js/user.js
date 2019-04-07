$(document).ready(function () {

    $("html, body").animate({
        scrollTop: $("#studentHeader").offset().top
    }, "slow");

    checkNumStudents();
    checkWindowSize();

    let userLogin = JSON.parse(localStorage.getItem("userLogin"));
    sessionStorage.clear();
    console.log(userLogin);
    let user_id = userLogin.id;
    let userName = userLogin.firstName;

    // Welcome Greeting
    $("#loginUser").text(userName);

    $.get("/student/create/" + user_id, function(result) {

        for (let i = 0 ; i < result.length ; i++) {

            students.push(result[i]);

            let id = result[i].id;
            let firstName = result[i].firstName;
            let lastName = result[i].lastName;
            let unit1Complete = result[i].unit1Complete;
            let unit2Complete = result[i].unit2Complete;

            console.log(unit1Complete, unit2Complete);

            // Add Change Info Button
            let buttonc = $("<button>");
            buttonc.attr("data-id", id);
            buttonc.attr("data-toggle","modal");
            buttonc.attr("data-target","#exampleModal1");
            buttonc.addClass("btn btn-sm btn-primary changeSt fa fa-pencil-square-o change-btn");
            
            // Add Delete Button
            let buttond = $("<button>");
            buttond.attr("data-id", id);
            buttond.addClass("btn btn-sm btn-danger fa fa-trash-o deleteSt");

            let studentText = $("<span>").html("  " + firstName + " " + lastName + "\xa0\xa0").css({"font-weight": "bold", "display": "inline-block", "vertical-align": "middle",  "white-space": "nowrap", "overflow": "hidden", "text-overflow": "ellipsis"}).addClass("listedStudent");

            // Create Avatar
            let studentAvatar = $("<img>").attr("src", result[i].avatar);

            let student = $("<li>").addClass("studentList").attr("data-id", id).css({"border": "1px solid black", "border-radius": "25px"});
            
            let lineBreak = $("<br>");
            
            if (unit1Complete && unit2Complete) {

                let completeCap = $("<span>").addClass("fa fa-star completeCap");
                student.append(studentAvatar);
                student.append(studentText);
                student.prepend(completeCap);

                $("#currentStudent").append(student).append(lineBreak);
            }
            else {
                student.append(studentAvatar);
                student.append(studentText);

                $("#currentStudent").append(student).append(lineBreak);
            }

            checkNumStudents();
        }

        $(".studentList").on("mouseover", function() {
            $(this).css({"cursor": "pointer", "box-shadow": "0 8px 6px -6px black"});
        });

        $(".studentList").on("click", function() {



            $(".studentList").not(this).each(function() {
                $(this).css({"cursor": "pointer", "background-color": "white"});
                $(this).css("box-shadow", "none");
                $(".completeCap", this).css("color", "gold");
            });

            $(this).css({"background-color": "lemonchiffon", "cursor": "pointer"});
            $(".completeCap", this).css("color", "black");

            $("#SnC").css({"width": 0, "transition": "none"});
            $("#letRec").css({"width": 0, "transition": "none"});
            sessionStorage.setItem("unit1Prog", 0);
            sessionStorage.setItem("unit2Prog", 0);

            let id = $(this).attr("data-id");

            $.get("/currentStudent/" + id, function(result) {

                // Add Clicked Student Info to sessionStorage
                sessionStorage.setItem('studentId', id);

                // Show Student Information
                if ($(window).width() <= 991) {
                    $("#studentAvatar").attr("src", result.avatar);
                    $("#studentName").html("<p style='font-size: 24px; font-weight: bold'>" + result.firstName + " " + result.lastName + "</p><p id='profile-btns'><button class='btn btn-sm btn-outline-primary changeSt change-btn easyRead' style='font-size: 16px' data-toggle='modal' data-target='#exampleModal1'><span class='fa fa-pencil-square-o'></span> Edit Profile</button>" + "\xa0" + "<button class='btn btn-sm btn-outline-danger deleteSt easyRead' data-id='" + id + "' style='font-size: 16px'><span class='fa fa-trash-o'></span> Remove Student</button></p>");
                    $("#students").css("display", "none");
                    $(".studentProgress").css({"display": "block", "border": "none"});
                    $("#backToStudents").css("display", "inline-block");
                    $("#addStudentBtn").css("display", "none");
                    $("#newStudentBtn").css("display", "none");
                } else if ($(window).width() <= 480) {
                    $("#studentAvatar").attr("src", result.avatar);
                    $("#studentName").html("<p style='font-size: 24px; font-weight: bold'>" + result.firstName + " " + result.lastName + "</p><p id='profile-btns'><button class='btn btn-sm btn-outline-primary changeSt change-btn easyRead' style='font-size: 16px' data-toggle='modal' data-target='#exampleModal1'><span class='fa fa-pencil-square-o'></span> Edit Profile</button>" + "\xa0" + "<button class='btn btn-sm btn-outline-danger deleteSt easyRead' data-id='" + id + "' style='font-size: 16px'><span class='fa fa-trash-o'></span> Remove Student</button></p>");
                    $("#students").css("display", "none");
                    $(".studentProgress").css({"display": "block", "border": "none"});
                    $("#backToStudents").css("display", "inline-block");
                    $("#newStudentBtn").css("display", "none");
                } else {
                    $("#studentAvatar").attr("src", result.avatar);
                    $("#studentName").html("<p style='font-size: 24px; font-weight: bold'>" + result.firstName + " " + result.lastName + "</p><p id='profile-btns'><button class='btn btn-sm btn-outline-primary changeSt change-btn easyRead' style='font-size: 16px' data-toggle='modal' data-target='#exampleModal1'><span class='fa fa-pencil-square-o'></span> Edit Profile</button>" + "\xa0" + "<button class='btn btn-sm btn-outline-danger deleteSt easyRead' data-id='" + id + "' style='font-size: 16px'><span class='fa fa-trash-o'></span> Remove Student</button></p>");
                    $("#students").css("display", "block");
                    $(".studentProgress").css("display", "block");
                }

                // Update Student Progress
                let unit1Prog = 0;
                let unit2Prog = 0;
                    SnCProg = 0;
                    letRecProg = 0;

                function activityProg(id) {
                
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
                            $("#SnC").css({"width": (unit1Prog * 25) + "%", "transition": "width 1s ease"});
                            $("#SnC").addClass("bg-success progress-bar-animated");
                        }
                        else {
                            let star = $("<span>").addClass("fa fa-star").css("color", "gold");
        
                            $("#SnCActCount").html("<span class='fa fa-star' style='color: gold'></span> COMPLETE ");
                            $("#SnCActCount").append(star);
                            $("#SnC").removeClass("bg-success progress-bar-animated").css("width", (unit1Prog * 25) + "%");
                        }
                        
                        sessionStorage.setItem("unit1Prog", unit1Prog);
                    }).then(function() {
                        $.get("/unit2/" + id, function(result) {

                            if (result) {
                                let values = Object.values(result);
                                
                                for (let i = 0; i < values.length; i++) {
                                    if (values[i] === true) {
                                        unit2Prog++;
                                    }
                                }
                            }
                        }).done(function() {
                            if (unit2Prog < 4) {
                                $("#letActCount").text(unit2Prog + " / 4");
                                $("#letRec").css({"width": (unit2Prog * 25) + "%", "transition": "width 1s ease"});
                                $("#letRec").addClass("bg-success progress-bar-animated");
                            }
                            else {
                                let star = $("<span>").addClass("fa fa-star").css("color", "gold");
                                
                                $("#letActCount").html("<span class='fa fa-star' style='color: gold'></span> COMPLETE ");
                                $("#letActCount").append(star);
                                $("#letRec").removeClass("bg-success progress-bar-animated").css("width", (unit2Prog * 25) + "%");
                            }
    
                            sessionStorage.setItem("unit2Prog", unit2Prog);                            
                        });
                    });
                }

                activityProg(id);
            });
        });

        $(".studentList").on("mouseleave", function() {
            $(this).css("box-shadow", "none");
        });
    });

    $(".studentAdd input").keyup(function(e) {
        if (e.keyCode === 13) {
            $("#sSubmit").click();
        }
    });

    // Create New Student
    $("#sSubmit").on("click", function() {
        var newStudent = {
            firstName: $("#f1").val().trim(),
            lastName: $("#f2").val().trim(),
            age: $("#f3").val().trim(),
            avatar: $(".avatar input:checked").attr("data-src"),
            userId: user_id
        };

        $.post("/currentStudent", newStudent, function(result) {
            createUnits(result.id);
        }).done(function() {
            $("f1").empty();
            $("f2").empty();
            $("f3").empty();
        }).fail(function(err){
            console.log(err)
            alert("Invalid entry. Please try again.");
        });
    });

    $(".exampleModal").keyup(function(e) {
        if (e.keyCode === 13) {
            $("#eSubmit").click();
        }
    });

    // Update Student Info
    $("#eSubmit").on("click", function() {

        let id = sessionStorage.getItem("studentId");
        
        var changeStudent = {
            firstName: $("#ef1").val(),
            lastName: $("#ef2").val(),
            age: $("#ef3").val(),
            avatar: $(".avatar input:checked").data("src")
        }

        $.post("/student/update/" + id, changeStudent, function(response) {
            console.log(response);
        }).done(function() {
            $("ef1").empty();
            $("ef2").empty();
            $("ef3").empty();
            location.reload();
        }).fail(function(err){
            console.log(err)
            alert("Invalid entry. Please try again.")
        });
    });

    // Delete Student
    $(document).on("click", ".deleteSt", function(event) {

        let id = $(this).attr("data-id");

        $.post("/student/delete/" + id, function(response) {
            console.log(response);
        }).done(function() {
            location.reload();
        });
    });

    $("#logout").on("click", function() {
        sessionStorage.clear();
        localStorage.clear();
    });

    $(".studentProgress a").on("click", function() {
        sessionStorage.setItem("currentUnit", $(this).attr("data-unit"));
    });

    $("#backToStudents").on("click", function() {
        $(this).css("display", "none");
        $("#students").css("display", "block");
        $(".studentProgress").css("display", "none");
        $("#SnC").css({"width": 0, "transition": "none"});
        $("#letRec").css({"width": 0, "transition": "none"});
        sessionStorage.setItem("unit1Prog", 0);
        sessionStorage.setItem("unit2Prog", 0);

        if ($(window).width() <= 991 && $(window).width() > 767) {
            $("#addStudentBtn").css("display", "block");
        } else if ($(window).width() <= 767) {
            $("#newStudentBtn").css("display", "inline-block");
        } else {
            $("#newStudentBtn").css("display", "none");
        }

        $(".studentList").each(function() {
            $(this).css({"cursor": "pointer", "background-color": "white"});
            $(this).css("box-shadow", "none");
            $(".completeCap", this).css("color", "gold");
        });
    });
});

var students= [];
var iProg = 0;

function checkNumStudents() {

    if ($("#currentStudent li").length > 0) {
        $("#firstStudentAdd").hide();
    }

    if ($("#currentStudent li").length > 4) {
        $("#studentPane").css({"overflow-y": "auto"});
    }
}

function createUnits(id) {

    $.post("/unit1/" + id, function(result) {
        console.log(result);
    }).done(function() {
        $.post("/unit2/" + id, function(result) {
            console.log(result);
        });
    }).fail(function(err){
        console.log("Whoops! Something went wrong.");
        console.log(err);
    }).always(function() {
        location.reload();
    });
}

// $(window).on("resize", function() {

//     if ($(this).width() <= 991) {
//         $("#toLetters").attr("href", "");
//         $(".studentList").each(function() {
//             $(this).css({"cursor": "pointer", "background-color": "white"});
//             $(this).css("box-shadow", "none");
//         });

//     } else {
//         $("#studentInfo").css("border-left", "1px dotted black");
//         $("#toLetters").attr("href", "/letter/main");
//     }
// });

function checkWindowSize() {
    if ($(window).width() <= 991) {
        $("#addStudentBtn").html("Add");
        $("#students").css("display", "block");
        $(".studentProgress").css("display", "none");
        $("#toLetters").attr("href", "");
    } else {
        $("#addStudentBtn").html("Add Student");
        $("#toLetters").attr("href", "/letter/main");
    }

    if ($(window).width() <= 767) {
        $("#toLetters").attr("href", "");
    }

    if ($(window).width() <= 480) {
        $("#toLetters").attr("href", "");
    }
}