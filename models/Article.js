var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    },
    saved: {
        type: Boolean,
        required: true
    },
    img: {
        tyep: String,
        required: true
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;