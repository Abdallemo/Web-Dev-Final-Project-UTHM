const express = require('express');
const router = express.Router();
const Tutorial = require('./../models/toturialModel');
const User = require('./../models/userModel');
const { ensureAuthenticated, checkTutorialOwnership } = require('../middleware/authMiddleware');
const Reviewsmdl = require('./../models/reviewsModel');
const path = require('path')
const imageMimeTypes = ['images/jpeg','images/png','images/gif']
const uploadPath = path.join('backend',Reviewsmdl.coverImageBasePath);


/* 
?here all the routes for Views its not perfect but this is my level  
                                                                    !for Now!
*/
router.get('/new', ensureAuthenticated,(req, res) => {
    res.render('tutorials/new', { tutorial: new Tutorial() });
});

router.get('/register', (req, res) => {
    res.render('tutorials/register', { user: new User() });
});
router.get('/aboutus', (req, res) => {
    res.render('tutorials/aboutus');
});
router.get('/review',(req,res)=>
    {
        res.render('tutorials/review',{review:Reviewsmdl,header: { location: '/review' }});
    })
router.get('/admin',(req,res)=>
    {
        res.render('tutorials/review',{review:Reviewsmdl,header: { location: '/review' }});
    })


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

  
/** 
    * ?here the saving function to the mongodb database
    * *     easy Right?
*/   
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
