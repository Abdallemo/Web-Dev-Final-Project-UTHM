const express = require('express');
const router = express.Router();
const Tutorial = require('./../models/toturialModel');
const User = require('./../models/userModel');
const { ensureAuthenticated, checkTutorialOwnership } = require('../middleware/authMiddleware');
const Reviewsmdl = require('./../models/reviewsModel');
const multer = require('multer');
const path = require('path')
const imageMimeTypes = ['images/jpeg','images/png','images/gif']
const uploadPath = path.join('backend',Reviewsmdl.coverImageBasePath);


router.get('/new', (req, res) => {
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
        res.render('tutorials/review',{header: { location: '/review' }});
    })

// Multer configuration
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadPath);
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, callback) => {
//         callback(null, imageMimeTypes.includes(file.mimetype));
//     }
// });

// router.get('/review', (req, res) => {
//     res.render('tutorials/review', { header: { location: '/review' } });
// });

// router.post('/review', upload.single('cover'), async (req, res) => {
//     const fileName = req.file != null ? req.file.filename : null;
//     const review = new Reviewsmdl({
//         reviewEmail: req.body.email,
//         reviewMedia: fileName,
//         reviewmessage: req.body.message
//     });
//     try {
//         const newReview = await review.save();
//         res.redirect('/');
//     } catch (error) {
//         console.error(error);
//         res.redirect('/review');
//     }
// });

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
