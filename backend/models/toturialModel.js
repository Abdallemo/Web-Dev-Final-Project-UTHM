const { type } = require('express/lib/response')
const mongoose = require('mongoose')
const { describe } = require('node:test')
const { title } = require('process')
const marked = require('marked')
const slugify = require('slugify')
const { strict } = require('assert')
const createDompurify = require('dompurify')
const {JSDOM} = require('jsdom')
const dompurify = createDompurify(new JSDOM().window)


const tutorialschema = new mongoose.Schema(
    {
        title:
        {
            type:String,
            required:true
        },
        Description:
        {
            type:String
        },
        markdown:
        {
            type:String,
            required:true
        },
        createdAt:
        {
            type: Date,
            default:Date.now
        },
        slug:
        {
            type:String,
            required:true,
            unique:true
        },
        sanatizedHtml:
        {
            type : String,
            required:true
        }
    })
    tutorialschema.pre('validate',function(next)
    {
        if(this.title)
            {
                this.slug= slugify(this.title,
                    {
                        lower:true,strict:true
                    }
                )
            }
        if(this.markdown)
            {
                this.sanatizedHtml = dompurify.sanitize(marked(this.markdown))
            }
        next()
    })
    module.exports= mongoose.model('Tutorial',tutorialschema)