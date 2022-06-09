const mongoose = require('mongoose');



const bookSchema = new mongoose.Schema({
    author_id:{
            type:String,
            required: true
},
name : {
    type: String,
  },


prices: Number,
ratings: Number

},
     {timestamps:true})

     module.exports  = mongoose.model('Book',bookSchema)



