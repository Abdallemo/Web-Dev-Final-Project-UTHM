const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//review mongodb schema

const coverImageBasePath = 'uploads/reviewIssue';
const reviewSchema = new mongoose.Schema
({
  reviewEmail: 
    { 
        type: String, 
        required: true
        
    },
    reviewMedia: 
    {   
        type: Buffer,
        
    },
    reviewMediaType: 
    {   
        type: String,
        
    },
    reviewmessage: 
    {   
        type: String,
        required: true

    }

});
reviewSchema.virtual('MediaImageActual').get(function()
{
    if(this.reviewMedia != null && this.reviewMediaType != null)
        {
            return `data:${this.reviewMediaType};charset=utf-8;base64,${this.reviewMedia.toString('base64')}`
        } 
})

module.exports= mongoose.model('Review',reviewSchema)
module.exports.coverImageBasePath = coverImageBasePath;