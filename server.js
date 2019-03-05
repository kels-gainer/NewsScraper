var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
db = require("./models")
var app = express();

var PORT = process.env.PORT || 8000;;

app.use(logger("dev"));
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.json());

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

require("./routes/scrape")(app);


app.listen(PORT, function() {
    console.log("App is running on port " + PORT);
});
