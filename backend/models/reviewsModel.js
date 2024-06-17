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
        type: String,
        
        
    },
    reviewmessage: 
    {   
        type: String,
        required: true

    }

});


module.exports= mongoose.model('Review',reviewSchema)
module.exports.coverImageBasePath = coverImageBasePath;