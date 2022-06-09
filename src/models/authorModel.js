const mongoose = require('mongoose');
//const { stringify } = require('nodemon/lib/utils');
//const bookSchema = new mongoose.Schema( {
    
    // " best boook on earth"   [ "Nodejs in detail" , "mongodb in detail", "fronend in detail"] 
    // {
        // "ch1 ": "awesome intro to JS",
        // "ch2" : "intro to nodejs",
        // "ch3" : "intro to db"
    //  }
    //summary :  mongoose.Schema.Types.Mixed,

const authorSchema = new mongoose.Schema({
author_id:{
     type:String,
     unique:true,
     required:true
},
author_name:String,
age:Number,
address:String
},{timestamps: true})

 
module.exports = mongoose.model('Author',authorSchema)



