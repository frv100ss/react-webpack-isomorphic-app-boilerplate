const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define the User model schema
const ArticleSchema = new Schema({
    date: Date,
    hour:Date,
    title: String,
    corpus: String,
    tags: Array,
    mainImg:String,
    isVisible:Boolean,
    order:Number
});

module.exports = mongoose.model('Article', ArticleSchema);