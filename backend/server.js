const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Tutorial = require('./models/toturialModel')
const methodOverride = require('method-override')


const tutorialRouter = require('../backend/router/tutorialRouter')
const path = require('path')

//* Database Connecttion

mongoose.connect('mongodb://localhost/Tutorial')

//? All setters

app.set('view engine','ejs')
app.set('views', path.join(__dirname, '../frontend/views'))

app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))



app.get('/', async (req,res)=>
    {
        const tutorials = await Tutorial.find().sort({createdAt:'desc'})
        res.render('tutorials/index',{tutorials:tutorials})
    })

app.use('/tutorials',tutorialRouter)

app.listen(5000)





