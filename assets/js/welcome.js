$(document).ready(function () {

    $(".createAccount input").keyup(function(e) {
        if (e.keyCode === 13) {
            $("#submit").click();
        };
    });

    $("#submit").on("click", function (event) {
        event.preventDefault();
        var repPass = $("#psw-repeat").val();
        var password = $("#password").val()
        var newUser = {
            firstName : $("#firstname").val(),
            lastName : $("#lastname").val(),
            email : $("#email").val(),
            password : $("#password").val(),
        };

        $("#exampleModal").hide();
        console.log(newUser);
        if (password === repPass) {
            // send an AJAX POST-request with jQuery
            $.post("/user", newUser)
            // on success, run this callback
            .then(function (result) {
                if (result) {
                    console.log(result);
                    localStorage.setItem("userLogin", JSON.stringify(result));
                    window.location.href = "/student";
                };
            }).fail(function(err){
                alert("Failed to create account. Please try again.");
                $("#exampleModal").show();
            });
        } else {
            alert("Passwords do not match, please re-enter password.");
            location.reload();
        }

        // empty each input box by replacing the value with an empty string
        $("#firstname").val("");
        $("#lastname").val("");
        $("#email").val("");
        $("#password").val("");
        $("#psw-repeat").val("");
    });

    $(".signInAccount input").keyup(function(e) {
        if (e.keyCode === 13) {
            $("#signIn").click();
        };
    });

    $("#signIn").on("click",function(event) {
        event.preventDefault();
        var userLogin = {
            email : $("#semail").val(),
            password : $("#spassword").val()
        };

        $.post("/login", userLogin, function(data) {
          if (data) {
            localStorage.setItem("userLogin", JSON.stringify(data));
            window.location.href = "/student";
          } 
        })
        .fail(function(err) {
            alert("Invalid email/password, please try again.");
        });
    });
});


