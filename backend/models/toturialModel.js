const { type } = require('express/lib/response')
const mongoose = require('mongoose')
const { describe } = require('node:test')
const { title } = require('process')

const tutorialschema = new mongoose.Schema(
    {
        title:
        {
            type:String,
            required:true
        },
        descrpition:
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
        }
    })
    module.exports= mongoose.model('Tutorial',tutorialschema)