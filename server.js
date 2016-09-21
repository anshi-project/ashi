var path=require("path")
var express=require("express");
var app=express();
app.use(express.static(path.resolve(__dirname, 'public')));

app.listen(process.env.PORT||3030,function(err){
   console.log("Server running on port " + process.env.PORT)
});

// var express = require('express');
//  var app = express();
//  app.get('/', function(req, res) {
//      res.sendFile('path-to-file');
//  });