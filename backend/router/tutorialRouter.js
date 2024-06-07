const express = require('express')
const router = express.Router()
const Tutorial = require('./../models/toturialModel')

router.get('/new',(req, res)=>
    {
        res.render('tutorials/new',{tutorial:new Tutorial()})
    })
router.get('/:slug', async (req,res)=>
    {
        const tutorial= await Tutorial.findOne( {slug: req.params.slug})
        if(tutorial==null) res.redirect('/')
        res.render('tutorials/show',{tutorial:tutorial})

    })    

router.post('/', async (req,res)=>
    {
        let tutorial = new Tutorial(
            {
                title: req.body.title,
                Description: req.body.Description,
                markdown: req.body.markdown,
            })
            try
            {
                tutorial = await tutorial.save()
                res.redirect(`/tutorials/${tutorial.slug}`)
            }catch(e)
            {
                console.log(e)
                res.render('tutorials/new',{tutorial:tutorial})
            }
    })

router.delete('/:id',async (req,res)=>
    {
        await Tutorial.findByIdAndDelete(req.params.id)
        res.redirect('/')
    })

module.exports = router