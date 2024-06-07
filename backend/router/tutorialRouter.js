const express = require('express');
const router = express.Router();
const Tutorial = require('./../models/toturialModel');

router.get('/new', (req, res) => {
    res.render('tutorials/new', { tutorial: new Tutorial() });
});

router.get('/edit/:id', async (req, res) => {
    const tutorial = await Tutorial.findById(req.params.id);
    if (tutorial == null) res.redirect('/'); 
    res.render('tutorials/edit', { tutorial: tutorial }); // Use found tutorial
});

router.get('/:slug', async (req, res) => {
    const tutorial = await Tutorial.findOne({ slug: req.params.slug });
    if (tutorial == null) res.redirect('/');
    res.render('tutorials/show', { tutorial: tutorial });
});

router.post('/', async (req, res, next) => {
    req.tutorial = new Tutorial();
    next();
}, saveArticleThenRedirect('new'));

router.put('/:id', async (req, res, next) => {
    req.tutorial = await Tutorial.findById(req.params.id);
    if (req.tutorial == null) res.redirect('/'); // Added check for null
    next();
}, saveArticleThenRedirect('edit'));

router.delete('/:id', async (req, res) => {
    await Tutorial.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

function saveArticleThenRedirect(path) {
    return async (req, res) => {
        let tutorial = req.tutorial;
        tutorial.title = req.body.title;
        tutorial.Description = req.body.Description; // Fixed case
        tutorial.markdown = req.body.markdown;
        try {
            tutorial = await tutorial.save();
            res.redirect(`/tutorials/${tutorial.slug}`);
        } catch (e) {
            res.render(`tutorials/${path}`, { tutorial: tutorial });
        }
    };
}

module.exports = router;
