var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var eHBS = require("express-handlebars");
var path = require('path');


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/guyanachronicle";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;


var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

 

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

//HandleBars
app.engine("handlebars", eHBS({defaultLayout: "main" }));
app.set("view engine", "handlebars");


//Server access to
require("./controller/routes")(app);


// Start the server
mongoose.connect(MONGODB_URI || "mongodb://localhost/guyanachronicle")
.then(function () {
  app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
  })
});
