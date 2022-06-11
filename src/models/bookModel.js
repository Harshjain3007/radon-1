const mongoose = require('mongoose');
///const ObjectId = mongoose.Schema.Types.ObjectId

//const bookSchema = new mongoose.Schema( {
  //  name: String,
  //  author_id: {
   //     type: ObjectId,
   //     ref: "Author"
   // },
    //price: Number,
   // ratings: Number


//},// { timestamps: true });


//module.exports = mongoose.model('LibraryBook', bookSchema)
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const ObjectId = mongoose.Schema.Types.ObjectId
const bookSchema = new mongoose.Schema ({
       name:String,
       author_id:{
          type:ObjectId,
          ref: "Newauthor"
       },
       
       price: Number,
       rating: Number,
       publisher_id:{
          type: ObjectId,
           ref:"publisher"
         }
              } ,     {timestamps:true}) ;
     module.exports = mongoose.model("newbook" ,bookSchema)
