const express = require('express');

const router = new express.Router();

router.post('/dashboard', (req, res) => {
    res.status(200).json({
        message: "Vous êtes autorisé à consulter cette page.",
    });
});

module.exports = router;