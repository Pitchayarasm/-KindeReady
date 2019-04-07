var path = require('path')

module.exports = function(app) {
    // ====================== HTML Routes ====================== //

     app.get("/letter/main",function(req,res) {
          res.sendFile(path.join(__dirname,"../assets/html/activities/letters/letterMain.html"))
     });
 
     app.get("/letter/act1",function(req,res) {
          res.sendFile(path.join(__dirname,"../assets/html/activities/letters/letterAct1.html"))
     });
  
     app.get("/letter/act2",function(req,res) {
          res.sendFile(path.join(__dirname,"../assets/html/activities/letters/letterAct2.html"))
     });
  
     app.get("/letter/act3",function(req,res) {
          res.sendFile(path.join(__dirname,"../assets/html/activities/letters/letterAct3.html"))
     });

     app.get("/letter/sum1",function(req,res) {
          res.sendFile(path.join(__dirname,"../assets/html/activities/letters/letterSumA-L.html"))
     });

     app.get("/letter/sum2",function(req,res) {
          res.sendFile(path.join(__dirname,"../assets/html/activities/letters/letterSumM-Z.html"))
     });
      
     // ====================== API Routes ====================== //
    
  
 };
 
