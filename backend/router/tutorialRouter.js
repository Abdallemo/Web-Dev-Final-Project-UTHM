const express = require('express')
const router = express.Router()
const Tutorial = require('./../models/toturialModel')

router.get('/new',(req, res)=>
    {
        res.render('tutorials/new')
    })
router.get('/:id',(req,res)=>
    {

    })    

router.post('/', async (req,res)=>
    {
        const tutorial = new Tutorial(
            {
                title: req.body.title,
                Description: req.body.Description,
                markdown: req.body.markdown,
            })
            try
            {
                tutorial = await tutorial.save()
                res.redirect(`/tutorials/${tutorial.id}`)
            }catch(e)
            {
                res.render('tutorials/new',{tutorial:tutorial})
            }
    })

module.exports = router