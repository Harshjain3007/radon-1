const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const blogSchema = new mongoose.Schema
({
    title:{
        type:String,
        required:true
    },
    author_id:{
        type:ObjectId,
        ref:'author'
    },
    body:{
       type:String,
       required:true
    },
   tags:
     [String],
  
  category:
  {
   type:String,
   required:true
  },
  subcategory:
  {
type:String,
},
deletedata:{
type:Boolean,
default:false
},
isPublished:{
    type:Boolean,
    default:false
},
ispublishedat:Date
},
{timestamps:true})  
module.exports = mongoose.model('blog',blogSchema)