var express = require("express");
var logger = require("morgan");
var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

var db = require("./models");
var PORT = 8000;
var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get("/scrape", function(req, res) {
    axios.get("https://www.nytimes.com/").then(function(response) {
        var $ = cheerio.load(resonse.data);

        $("article h2").each(function(i, element) {
            var result = {};

            result.title = $(this)
            .children("a")
            .text();
            result.link = $(this)
            .children("a")
            .attr("href");

            db.Headlines.create(result)
            .then(function(dbHeadlines) {
                console.log(Headlines);
            })
            .catch(function(err) {
                console.log(err);
            });
        });

        res.send("Scrape Complete");
    });
});

app.get("/newsdb", function(req, res) {
    db.Headlines.find({})
    .then(function(dbHeadlines) {
        res.json(dbHeadlines)
    })
    .catch(function(err) {
        res.json(err);
    });
});

app.post("/newsdb/:id", function(req, res) {
    db.Note.create(req.body)
    .then(function(dbNote) {
        return db.Headlines.findOneAndUpdate({_id: req.params.id}, {note: dbNote._id}, {new:true});
    })
    .then(function(dbHeadlines){
        res.json(dbHeadlines);
    })
    .catch(function(err) {
        res.json(err);
    });

});

app.listen(PORT, function() {
    console.log("App is running on port " + PORT);
});
