var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var app = express();

var PORT = process.env.PORT || 8000;;

app.use(logger("dev"));
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.json());

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

require("./public/app")(app);


app.listen(PORT, function() {
    console.log("App is running on port " + PORT);
});
