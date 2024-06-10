const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Tutorial = require('./models/toturialModel')
const methodOverride = require('method-override')
const User = require('./models/userModel');
const passport = require('passport');
const session = require('express-session');
const { ensureAuthenticated } = require('./middleware/authMiddleware');



require('./config/passportConfig')

const tutorialRouter = require('../backend/router/tutorialRouter')
const path = require('path')

//* Database Connecttion

mongoose.connect('mongodb://localhost/Tutorial')

  app.use(session({
      secret: 'H2HSSS$HS',
      resave: false,
      saveUninitialized: false
    }));
    app.use(express.urlencoded({extended:false}))
    app.use(methodOverride('_method'))
  

//? All setters
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine','ejs')
app.set('views', path.join(__dirname, '../frontend/views'))

  

  app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));
  
  app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        
        const newUser = new User({ username, password });
        await newUser.save();
        res.redirect('/login');
    } catch (error) {
        // Handle errors appropriately
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
        const tutorials = await Tutorial.find().sort({createdAt:'desc'})
        res.render('tutorials/index',{tutorials:tutorials,user:req.user})
    })

app.get('/login', (req, res) => 
  {
        res.render('tutorials/login');
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
  
      

app.use('/tutorials',tutorialRouter)

app.listen(3000)





