const mongoose = require('mongoose');

//const bookSchema = new mongoose.Schema( {
 //   bookName: String, 
 //   authorName: String, 
 //   tags: [String],
    
 //   isPublished: Boolean,
 //   prices: {
 //       indianPrice: String,
 //       europePrice: String,
 //   },
 //   sales: {type: Number, default: 10}
//}, { timestamps: true });

const bookcollectionSchema =new mongoose.Schema({
               bookName: {
                   type:String,
                   required:true,
               },
     prices: {
         indianPrice:String,
         EuropeanPrice:String,
     },
     year: {
         type:Number,
         default:2021,
     },
  tags: [{
         authorName:String,
         totalPages: Number,
         stockAvilable: Boolean
        

  }]   
} ,  {timestamps: true});



module.exports = mongoose.model('collection' , bookcollectionSchema)
//module.exports = mongoose.model('Book', bookSchema) //users

//Validation:
//require:true
//unique
// default

//String
//Number
//Date
//Boolean
// Arrays
// Object
// ObjectId
// Buffer - not cover

