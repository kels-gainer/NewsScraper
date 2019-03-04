var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var db = require("../models");

var Article = require("../models/Article")
var Note = require("../models/Note")

var scrape = function() {
    return axios.get("http://www.nytimes.com").then(function(res) {
        var $ = cheerio.load(res.data);
        var articles = [];

        $("article.css-180b3ld").each(function(i, element) {
            
            var head = $(this).find("h2").text().trim();
            var url = $(this).find("a").attr("href");
            var sum = $(this).find("p").text().trim();

            if(head && sum && url) {
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim(); 
                
                var dataAdded = {
                    headline: headNeat,
                    summary: sumNeat,
                    url: "https://www.nytimes.com" + url
                };

                articles.push(dataAdded);
            }
        });
        return articles;
    });
};
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
}

module.exports = scrape