const express = require('express');
require('./../models/article')
const config = require('../config');
const Article = require('mongoose').model('Article');
const router = new express.Router();

router.post('/back/dashboard', (req, res) => {
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

router.post('/back/createArticle', (req, res) => {
    const validationResult = checkArticleForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

    let updatedCorpus = req.body.corpus;
    updatedCorpus = updatedCorpus.replace(/\*/g, "+");

    Article.find({}, function (err, res) {
        if (err) console.log(err);
        if (res) {
            let count = res.length+1;
            var ArticleModel = new Article({
                date: req.body.date,
                hour: req.body.hour,
                title: req.body.title,
                corpus: updatedCorpus,
                mainImg: req.body.mainImg,
                tags: eval(req.body.tags),
                isVisible: "false",
                order: count
            });
        }

        ArticleModel.save(function (err) {
            if (err) return console.log(err);
            // Bob now has his story
        });
    });
    return res.status(200).end('Success');
});

router.post('/back/getArticles', (req, res) => {
//looks at our Article Schema
    Article.find(function (err, articles) {
        if (err)
            res.send(err);
        //responds with a json object of our database comments.
        res.json(articles)
    }).sort({order: -1});
});

router.post('/front/getArticles', (req, res) => {
//looks at our Article Schema
    Article.find({isVisible: "true"}, function (err, articles) {
        if (err)
            res.send(err);
        //responds with a json object of our database comments.
        res.json(articles)
    }).sort({order: -1});
});

router.delete('/back/deleteArticle', (req, res) => {
    Article.find({_id: req.query._id}).remove().exec()
    return res.status(200).end('Success');
});

router.post('/back/getArticle', (req, res) => {
    Article.findById({_id: req.body.params._id}, function (err, article) {
        if (err)
            res.send(err);
        //responds with a json object of our database comments.
        res.json(article)
    });
});


router.post('/back/updateArticle', (req, res) => {
    const validationResult = checkArticleForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }
    let updatedCorpus = req.body.corpus;
    updatedCorpus = updatedCorpus.replace(/\*/g, "+");

    console.log('lil', req.body)

    var update = {
        updateDate: req.body.updateDate,
        updateHour: req.body.updateHour,
        title: req.body.title,
        corpus: updatedCorpus,
        mainImg: req.body.mainImg,
        tags: eval(req.body.tags),
        isVisible: "false"
    };

    var query = {"_id": req.get('key')};
    var options = {new: false};

    Article.findOneAndUpdate(query, update, options, function (err) {
        if (err) {
            console.log('got an error');
        }

        // at this point person is null.
    });
    return res.status(200).end('Success');
});

router.post('/back/previewArticle', (req, res) => {
    let key = req.body.params.title.split("-");
    key = key[key.length - 1];
    Article.findById({_id: key}, function (err, article) {
        if (err)
            res.send(err);
        //responds with a json object of our database comments.
        res.json(article)
    });
});

router.post('/front/Article', (req, res) => {
    let key = req.body.params.title.split("-");
    key = key[key.length - 1];
    Article.findById({_id: key}, function (err, article) {
        if (err)
            res.send(err);
        //responds with a json object of our database comments.
        res.json(article)
    });
});


module.exports = router;
