const { type } = require('express/lib/response')
const mongoose = require('mongoose')
const { describe } = require('node:test')
const { title } = require('process')
const marked = require('marked')
const slugify = require('slugify')
const { strict } = require('assert')


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
            next()
    })
    module.exports= mongoose.model('Tutorial',tutorialschema)