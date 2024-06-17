const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Tutorial = require('./models/toturialModel')
const methodOverride = require('method-override')
const User = require('./models/userModel');
const Reviewsmdl = require('./models/reviewsModel');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const multer = require('multer');
const { ensureAuthenticated } = require('./middleware/authMiddleware');
require('./config/passportConfig')
const tutorialRouter = require('../backend/router/tutorialRouter')
const path = require('path')
const imageMimeTypes = ['images/jpeg','images/png','images/gif']
const uploadPath = path.join('backend',Reviewsmdl.coverImageBasePath);
const e = require('express')

//* Database Connecttion

mongoose.connect('mongodb://localhost/Tutorial')

  app.use(session({
      secret: 'H2HSSS$HS',
      resave: false,
      saveUninitialized: false
    }));
    app.use(express.urlencoded({extended:false}))
    app.use(methodOverride('_method'))
    app.use(flash());
  

//? All setters
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine','ejs')
app.set('views', path.join(__dirname, '../frontend/views'))

  

  app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
    
  }));
  
  app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        
        const newUser = new User({ username, password });
        await newUser.save();
        res.redirect('/login');
    } catch (error) {
        // Handle errors appropriately
        req.flash('error', 'An error occurred. Please try again later.');
        console.error(error);
        res.redirect('/register');
    }
});

  app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
  });

app.get('/', async (req,res)=>
    {
        let searchOptions = {}
        if(req.query.search != null && req.query.search !== '')
          {
            searchOptions.title = new RegExp('^'+req.query.search, 'i')
          }
        const tutorials = await Tutorial.find(searchOptions).populate('user').sort({createdAt:'desc'})
        res.render('tutorials/index',{
          tutorials:tutorials,
          searchOptions:req.query,
          user:req.user,
          header: { location: '/' }
        })
        
    })

app.get('/login', (req, res) => 
  {
        res.render('tutorials/login');
  });

app.get('/review', (req, res) => 
  {
    res.render('tutorials/review',{header: { location: '/review' }});
  });  

app.get('/register', (req, res) => 
  {
        res.render('tutorials/register');
  });

  app.get('/logout', (req, res) => {
    req.logout(err => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  });
  
  app.get('/aboutus', (req,res)=>
    {
      res.render('tutorials/aboutus', { header: { location: '/aboutus' } });
    })

    const upload = multer(
      {
        dest: uploadPath,
        fileFilter:(req,file,callback) =>
          {
            callback(null,imageMimeTypes.includes(file.mimetype))
          }
  
      })
  
  //
  
  app.post('/review',upload.single('cover'),async(req,res)=>
      {
        console.log()
        try{
            const fileName = req.file !=null ? req.file.filename : null;
            const review = new Reviewsmdl(
            {
                reviewEmail:req.body.email,
                reviewMedia: fileName,
                reviewmessage: req.body.message
            })
            const newReview = await review.save();
            res.redirect('/');
          }catch(error)
          {
            console.log(error);
          }
      })
  

app.use('/tutorials',tutorialRouter)

app.listen(3000)





