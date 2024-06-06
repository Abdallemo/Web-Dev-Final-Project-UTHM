const express = require('express')
const app = express()
const tutorialRouter = require('../backend/router/tutorialRouter')
const path = require('path')
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
        res.render('index',{tutorials:tutorials})
    })


app.listen(5000)





