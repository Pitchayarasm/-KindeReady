var path = require('path')

module.exports = function(app) {
   // ====================== HTML Routes ====================== //
    app.get("/change",function(req,res) {
        res.sendFile(path.join(__dirname,"../assets/html/user.html"))
    });
 
    app.get("/shapes/main",function(req,res) {
         res.sendFile(path.join(__dirname,"../assets/html/activities/shapesncolors/shapesMain.html"))
    });

    app.get("/shapes/act1",function(req,res) {
         res.sendFile(path.join(__dirname,"../assets/html/activities/shapesncolors/shapesAct1.html"))
    });
 
    app.get("/shapes/act2",function(req,res) {
         res.sendFile(path.join(__dirname,"../assets/html/activities/shapesncolors/shapesAct2.html"))
    });
 
    app.get("/shapes/act3",function(req,res) {
         res.sendFile(path.join(__dirname,"../assets/html/activities/shapesncolors/shapesAct3.html"))
    });
 
    app.get("/shapes/sum",function(req,res) {
         res.sendFile(path.join(__dirname,"../assets/html/activities/shapesncolors/shapesSum.html"))
    });
     
    // ====================== API Routes ====================== //
   
 
};

