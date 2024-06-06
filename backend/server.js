const express = require('express')
const app = express()
const mongoose = require('mongoose')

const tutorialRouter = require('../backend/router/tutorialRouter')
const path = require('path')

//* Database Connecttion

mongoose.connect('mongodb://localhost/Tutorial')

//? All setters

app.set('view engine','ejs')
app.set('views', path.join(__dirname, '../frontend/views'))
app.use('/tutorials',tutorialRouter)


app.get('/',(req,res)=>
    {
        const tutorials =
        [
            {
                title: 'Test tutorial 1',
                createAt: new Date(),
                description: 'this the first tutorial'

            },
            {
                title: 'Test tutorial 2',
                createAt: new Date(),
                description: 'this the second tutorial'

            }
        ]
        res.render('tutorials/index',{tutorials:tutorials})
    })


app.listen(5000)





