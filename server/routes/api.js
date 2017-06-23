const express = require('express');
require('./../models/article')
const config = require('../config');

const Article = require('mongoose').model('Article');

const router = new express.Router();

router.post('/dashboard', (req, res) => {
    res.status(200).json({
        message: "Vous êtes autorisé à consulter cette page.",
    });
});

const checkArticleForm = (payload) => {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (payload.date === '[object Object]' || payload.date === 'undefined') {
        isFormValid = false;
        errors.date = 'Veuillez renseigner une date';
    }

    if (payload.hour === '[object Object]' || payload.hour === 'undefined') {
        isFormValid = false;
        errors.hour = 'Veuillez renseigner l\'heure de publication';
    }

    if (payload.title === "undefined" || !payload.title) {
        isFormValid = false;
        errors.title = 'Veuillez renseigner le titre de l\'article';
    }

    if (payload.corpus === "undefined" || !payload.corpus) {
        isFormValid = false;
        errors.corpus = 'Veuillez renseigner le corps de l\'article';
    }

    if (payload.mainImg === "undefined" || !payload.mainImg || payload.mainImg === 'null') {
        isFormValid = false;
        errors.mainImg = 'Veuillez renseigner l\'image principale de l\'article';
    }

    if (payload.tags === "undefined" || payload.tags.length === 0) {
        isFormValid = false;
        errors.tags = 'Veuillez renseigner au moins un tag pour l\'article';
    }

    if (!isFormValid) {
        message = 'Le formulaire comporte des erreurs';
    }

    return {
        success: isFormValid,
        message,
        errors,
    };
};

router.post('/createArticle', (req, res) => {
    const validationResult = checkArticleForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

    var ArticleModel = new Article({
        date: req.body.date,
        hour: req.body.hour,
        title: req.body.title,
        corpus: req.body.corpus,
        mainImg: req.body.mainImg,
        tags: eval(req.body.tags)
    });
    ArticleModel.save(function (err) {
        if (err) return console.log(err);
        // Bob now has his story
    });
    return res.status(200).end('Success');
});

router.post('/getArticles', (req, res) => {

//looks at our Article Schema
    Article.find(function (err, articles) {
        if (err)
            res.send(err);
        //responds with a json object of our database comments.
        res.json(articles)
    });

});

router.delete('/deleteArticle', (req, res) => {
    Article.find({_id: req.query._id}).remove().exec()
    return res.status(200).end('Success');
});

router.post('/getArticle', (req, res) => {
    Article.findById({_id: req.body.params._id}, function (err, article) {
        if (err)
            res.send(err);
        //responds with a json object of our database comments.
        res.json(article)
    });
});

router.post('/updateArticle', (req, res) => {
    const validationResult = checkArticleForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

    var update = {
        date: req.body.date,
        hour: req.body.hour,
        title: req.body.title,
        corpus: req.body.corpus,
        mainImg: req.body.mainImg,
        tags: eval(req.body.tags)
    };

    console.log('corpus', req.body.corpus)


    var query = {"_id": req.get('key')};
    var options = {new: true};

    Article.findOneAndUpdate(query, update, options, function(err, person) {
        if (err) {
            console.log('got an error');
        }

        // at this point person is null.
    });
    return res.status(200).end('Success');
});

router.post('/previewArticle', (req, res) => {
    Article.findById({_id: req.body.params._id}, function (err, article) {
        if (err)
            res.send(err);
        //responds with a json object of our database comments.
        res.json(article)
    });
});


module.exports = router;
