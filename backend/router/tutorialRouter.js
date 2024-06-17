const express = require('express');
const router = express.Router();
const Tutorial = require('./../models/toturialModel');
const User = require('./../models/userModel');
const { ensureAuthenticated, checkTutorialOwnership } = require('../middleware/authMiddleware');




router.get('/new', (req, res) => {
    res.render('tutorials/new', { tutorial: new Tutorial() });
});

router.get('/register', (req, res) => {
    res.render('tutorials/register', { user: new User() });
});
router.get('/aboutus', (req, res) => {
    res.render('tutorials/aboutus');
});

router.get('/login', (req, res) => {
    res.render('tutorials/login', { user: new User() });
});

router.get('/edit/:id', async (req, res) => {
    const tutorial = await Tutorial.findById(req.params.id);
    if (tutorial == null) res.redirect('/');
    res.render('tutorials/edit', { tutorial: tutorial ,header: { location: '/edit' }});
});

router.get('/:slug', async (req, res) => {
    const tutorial = await Tutorial.findOne({ slug: req.params.slug });
    if (tutorial == null) res.redirect('/');
    res.render('tutorials/show', { tutorial: tutorial ,header: { location: '/show' }});
});

router.post('/', ensureAuthenticated, async (req, res, next) => {
    req.tutorial = new Tutorial();
    req.tutorial.user = req.user.id;
    next();
  }, saveArticleThenRedirect('new'));

  router.put('/:id', ensureAuthenticated, checkTutorialOwnership, async (req, res, next) => {
    req.tutorial = await Tutorial.findById(req.params.id);
    next();
  }, saveArticleThenRedirect('edit'));

  router.delete('/:id', ensureAuthenticated, checkTutorialOwnership, async (req, res) => {
    await Tutorial.findByIdAndDelete(req.params.id);
    res.redirect('/');
  });

  

function saveArticleThenRedirect(path) {
    return async (req, res) => {
        let tutorial = req.tutorial;
        tutorial.title = req.body.title;
        tutorial.Description = req.body.Description;
        tutorial.markdown = req.body.markdown;
        // tutorial.user = req.body.user;

        try {
            tutorial = await tutorial.save();
            res.redirect(`/tutorials/${tutorial.slug}`);
        } catch (e) {
            res.render(`tutorials/${path}`, { tutorial: tutorial });
        }
    };
}

module.exports = router;
