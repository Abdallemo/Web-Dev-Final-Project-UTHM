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
const hljs = require('highlight.js');

marked.setOptions({
    gfm: true,
    breaks: true,
    tables: true,
    sanitize: false, // This is not a recommended setting, as it might introduce XSS vulnerabilities. Use with caution.
    highlight: function (code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(lang, code).value;
        } else {
            return hljs.highlightAuto(code).value;
        }
    }
  });

  // Add hooks to dompurify for HTML sanitization
dompurify.addHook('afterSanitizeAttributes', function(node) {
    // Whitelist attributes for <code> elements
    if ('nodeName' in node && node.nodeName.toLowerCase() === 'code') {
        node.setAttribute('class', 'language-markup'); // Example: Add class for syntax highlighting
        // Add more allowed attributes if necessary
    }
});

dompurify.addHook('afterSanitizeElements', function(node) {
    // Whitelist elements
    if ('nodeName' in node) {
        const nodeName = node.nodeName.toLowerCase();
        if (nodeName === 'pre' || nodeName === 'code') {
            // Allow <pre> and <code> elements
            // Add more allowed elements if necessary
        }
    }
});



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
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
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