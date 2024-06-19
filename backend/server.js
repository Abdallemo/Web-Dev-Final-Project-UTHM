
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
const { ensureAuthenticated } = require('./middleware/authMiddleware');
require('./config/passportConfig')
const tutorialRouter = require('../backend/router/tutorialRouter')
const path = require('path')
const imageMimeTypes = ['image/jpeg','image/png','image/gif']
const uploadPath = path.join('backend',Reviewsmdl.coverImageBasePath);
const e = require('express')
const { json } = require('express/lib/response')
const bodyParser = require('body-parser')

if(process.env.NODE_ENV !== 'production'){
  
  require('dotenv').config();
}
//* Database Connecttion
const databaseurl = process.env.DATABASE_URL
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

  const jsonLimit = '50mb';  // Example limit for JSON bodies
  const urlEncodedLimit = '50mb'; 

  app.use(bodyParser.json({limit: "50mb"}));
  app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

  console.log(`JSON body limit set to: ${jsonLimit}`);
console.log(`URL-encoded body limit set to: ${urlEncodedLimit}`);

  app.use(session({
      secret: 'H2HSSS$HS',
      resave: false,
      saveUninitialized: false
    }));
    app.use(express.urlencoded({extended:false}))
    app.use(methodOverride('_method'))
    app.use(flash());

    // Middleware to log the current limits
  

//? All setters
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine','ejs')
app.set('views', path.join(__dirname, './views'))

  

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
    res.render('tutorials/review',{review:Reviewsmdl,header: { location: '/review' }});
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

  app.get('/howtouse', (req,res)=>
    {
      res.render('tutorials/howtouse', { header: { location: '/howtouse' } });
    })
  app.get('/admin', async (req,res)=>
    {
      const reviews = await Reviewsmdl.find();
      res.render('tutorials/admin', {reviews:reviews, header: { location: '/admin' } });
    })

  app.post('/review', async (req, res) => {
      const review = new Reviewsmdl({
          reviewEmail: req.body.email,
          reviewmessage: req.body.message
      });
      try {
          saveCover(review,req.body.Media);
          const newReview = await review.save();
          res.redirect('/');
      } catch (error) {
          console.error(error);
          res.redirect('/review');
      }
  });


  function saveCover(review,MediaEncoded)
  {
    if(MediaEncoded== null) return
    const Media = JSON.parse(MediaEncoded)
    if(Media != null && imageMimeTypes.includes(Media.type))
      {
        review.reviewMedia = new Buffer.from(Media.data,'base64');
        review.reviewMediaType = Media.type
      }

  }
   



app.use('/tutorials',tutorialRouter)

app.listen(3000)





