var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");


var Article = require("../models/Article")
var Note = require("../models/Note")

module.exports = function (app) {

    app.get("/scrape", function(req, res) {
        axios.get("https://www.nytimes.com/").then(function(res) {
            var $ = cheerio.load(res.data);
    
            $("article h2").each(function(i, element) {
                var result = {};
    
                result.title = $(this)
                .children("a")
                .text();
                result.link = $(this)
                .children("a")
                .attr("href");
    
                db.Article.create({result})
                .then(function(dbHeadlines) {
                    console.log(dbHeadlines);
                })
                .catch(function(err) {
                    console.log(err);
                });
            });
    
            res.send("Scrape Complete");
        });
    });
    
    app.get("/articles", function(req, res) {
        db.Article.find({})
        .then(function(dbHeadlines) {
            res.json(dbHeadlines)
        })
        .catch(function(err) {
            res.json(err);
        });
    });

    app.get("/articles/:id", function(req, res) {
        db.Article.findOne({ _id: req.params.id })
        .populate("note")
        .then(function(dbHeadlines) {
            res.json(dbHeadlines);
        })
        .catch(function(err) {
            res.json(err);
        });
    });
    
    app.post("/articles/:id", function(req, res) {
        db.Note.create(req.body)
        .then(function(dbNote) {
            return db.Article.findOneAndUpdate({_id: req.params.id}, {note: dbNote._id}, {new:true});
        })
        .then(function(dbHeadlines){
            res.json(dbHeadlines);
        })
        .catch(function(err) {
            res.json(err);
        });
    
    });
}