// Requiring our models
var db = require("../models");
var path = require('path');
var bcrypt = require("bcryptjs");

module.exports = function(app) {

    app.get("/",function(req,res) {
        if (req.session.user) {
            res.sendFile(path.join(__dirname,"../assets/html/user.html"));
        } else if (req.headers.cookie && req.headers.cookie.indexOf("token=") !== -1) {
            // use regex to grab cookie from headers string
            var cookie = req.headers.cookie.match(/(?<=token=)[^ ;]*/);
            // compare cookie against db records
            db.User.findOne({
                where : {
                    token : cookie
                }
            }).then(function(data) {
                if (data) {
                    // save user object on session 
                    req.session.user = data;
                    res.redirect("/");
                } else {
                    // no match, so clear cookie
                    res.clearCookie("token");
                    res.redirect("/");
                }
            });    
            // if no session or cookie, send to log in/create account
        } else {
            res.sendFile(path.join(__dirname,"../assets/html/welcome.html"))
        }
    });
    
    app.get("/student",function(req,res) {
        res.sendFile(path.join(__dirname,"../assets/html/user.html"))
    });

     // POST route for saving a new user
    app.post("/user", function (req, res) {
        db.User.findOne({
             where: {
                 email: req.body.email
            }
        })
        .then(function(result) {
            if (result) {
                res.status(404).send("Invalid email. Account already exists. Please try again.");
            } else {
                bcrypt.hash(req.body.password, 10 , function(err,hash) {
                    if (err) throw err;
                    db.User.create({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash
                    })
                    .then(function (dbUser) {
                        res.json(dbUser);
                        console.log(dbUser);
                    })
                    .catch(function (err) {
                        if (err.errors[0].message === "Validation isEmail on email failed") {
                            res.status(500).send("Please enter a valid email format.");
                        } else {
                            res.status(500).send("Please complete all of the required fields.");
                        }
                    });
                });     
            }
        });
    });

    // User login
    app.post("/login",function(req,res) {
        var logEmail = req.body.email;
        var logPassword = req.body.password;

        db.User.findOne({
            where : {
                email : logEmail,
            }
        }).then(function(result) {
            bcrypt.compare(logPassword, result.password, function(err, response) {
                if (response) {
                    // create random token and "save" in database
                    var newToken = "t" + Math.random();
                        // stored token in detabase
                        db.User.update({
                            token : newToken
                        },{
                            where : {
                                email : logEmail
                            }
                        }).then(function(data) {
                            console.log("token saved");
                             // set token as a cookie that browser can read
                            res.cookie("token", newToken, {expires: new Date(Date.now() + 999999999999)});
                            var userLogin = {
                                id : (result.dataValues.id),
                                firstName : (result.dataValues.firstName),
                                lastName : (result.dataValues.lastName),
                            }
                            // save user object on session for back-end to continue to use
                            req.session.user = result;
                            console.log(userLogin)
                            res.send(userLogin);
                        });
                } else {
                    res.status(404).send("Invalid email/password, please try again.");
                }
            });
        }).catch(function(err) {
            res.status(404).send("Invalid email/password, please try again.");
        })
    });

    // display student names list in browser
    app.get("/student/create/:id",function(req,res) {
        db.Student.findAll({
            where : {
                userId : req.params.id
            }
        },{
            include: [db.User]
        }).then(function(result) {
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        });
    });

    // display student names list in browser
    app.get("/currentStudent/:id",function(req,res) {
        db.Student.findOne({
            where: { 
                id: req.params.id 
            },
            include: [db.User] 
        })
        .then(function(result) {
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        });
    });

    // create a new student
    app.post("/currentStudent", function(req,res) {
        db.Student.create({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            age : req.body.age,
            avatar : req.body.avatar,
            userId : req.body.userId
        })
        .then(function(result) {
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        });
    });

    // create a new entry for unit1
    app.post("/unit1/:id",function(req,res) {

        db.Unit1.create({
            act1: false,
            act2: false,
            act3: false,
            summary: false,
            studentId: req.params.id
        })
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        });
    });

    // create a new entry for unit2
    app.post("/unit2/:id",function(req,res) {
        db.Unit2.create({
            act1: false,
            act2: false,
            act3: false,
            summary: false,
            studentId: req.params.id
        })
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        });
    });

    // Pull Unit1 Activity Values
    app.get("/unit1/:id", function(req, res) {
        db.Unit1.findOne({where: {id: req.params.id}})
        .then(function(result) {
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        });
    });

    // Pull Unit2 Activity Values
    app.get("/unit2/:id", function(req, res) {
        db.Unit2.findOne({where: {id: req.params.id}})
        .then(function(result) {
            res.json(result);
        })
        .catch(function(err){
            res.status(500).json(err);
        });
    });

    // Update Unit Activity values
    app.put("/activity/:id", function(req, res) {

        if (parseInt(req.body.unit) === 1) {
            switch (req.body.act) {
                case "act1":
                    db.Unit1.update({
                        act1: true
                    }, {
                        where: {
                            id: req.params.id
                        }
                    }).then(function() {
                        res.send("Activity Completed");
                    }).catch(function(err) {
                        res.status(500).json(err);
                    });
                break;

                case "act2":
                    db.Unit1.update({
                        act2: true
                    }, {
                        where: {
                            id: req.params.id
                        }
                    }).then(function() {
                        res.send("Activity Completed");
                    }).catch(function(err) {
                        res.status(500).json(err);
                    });
                break;

                case "act3":
                    db.Unit1.update({
                        act3: true
                    }, {
                        where: {
                            id: req.params.id
                        }
                    }).then(function() {
                        res.send("Activity Completed");
                    }).catch(function(err) {
                        res.status(500).json(err);
                    });
                break;

                case "summary":
                    db.Unit1.update({
                        summary: true
                    }, {
                        where: {
                            id: req.params.id
                        }
                    }).then(function() {
                        res.send("Activity Completed");
                    }).catch(function(err) {
                        res.status(500).json(err);
                    });
                break;
            }
        }

        if (parseInt(req.body.unit) === 2) {
            switch (req.body.act) {
                case "act1":
                    db.Unit2.update({
                        act1: true
                    }, {
                        where: {
                            id: req.params.id
                        }
                    }).then(function() {
                        res.send("Activity Completed");
                    }).catch(function(err) {
                        res.status(500).json(err);
                    });
                break;

                case "act2":
                    db.Unit2.update({
                        act2: true
                    }, {
                        where: {
                            id: req.params.id
                        }
                    }).then(function() {
                        res.send("Activity Completed");
                    }).catch(function(err) {
                        res.status(500).json(err);
                    });
                break;

                case "act3":
                    db.Unit2.update({
                        act3: true
                    }, {
                        where: {
                            id: req.params.id
                        }
                    }).then(function() {
                        res.send("Activity Completed");
                    }).catch(function(err) {
                        res.status(500).json(err);
                    });
                break;

                case "summary":
                    db.Unit2.update({
                        summary: true
                    }, {
                        where: {
                            id: req.params.id
                        }
                    }).then(function() {
                        res.send("Activity Completed");
                    }).catch(function(err) {
                        res.status(500).json(err);
                    });
                break;
            }
        }
    });

    // Update Student Info
    app.post("/student/update/:id", function(req, res) {
        db.Student.update(
            req.body,
        {
            where: {
                id: req.params.id
            }
        }).then(function(result) {
            res.send("Student Updated");
        })
        .catch(function(err){
            res.status(500).json(err);
        });
    })

    // Delete a Student
    app.post("/student/delete/:id", function(req, res) {
        db.Student.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(result) {
            res.send("Student Deleted");
        });
    });

    // Log Out
    app.get("/logout", function(req, res) {
        // clear cookie and session
        console.log("log out");
        res.clearCookie("token");
        req.session.destroy();
        res.redirect("/");
      });

}
