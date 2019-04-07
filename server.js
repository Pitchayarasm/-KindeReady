var express = require("express");
var app = express();
var session = require("express-session");
var PORT = process.env.PORT || 3000;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: "yolo", 
  resave: false,
  saveUninitialized: true,
  cookie: {secure: "auto"}
}));

app.use(express.static("assets"));

// Routes
// =============================================================
var kindeReadyController = require("./controller/kindeReadyControl.js");
    kindeReadyController(app);
var lettercontrol = require("./controller/letterandcontrol.js");
    lettercontrol(app);
var shapescontrol = require("./controller/shapesandcontrol.js");
    shapescontrol(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});



