const mongoose = require('mongoose');
//const { stringify } = require('nodemon/lib/utils');

// const userSchema = new mongoose.Schema( {
//     firstName: String,
//     lastName: String,
//     mobile: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     emailId: String,
//     gender: {
//         type: String,
//         enum: ["male", "female", "LGBTQ"] //"falana" will give an error
//     },
//     age: Number,
    // isIndian: Boolean,
    // parentsInfo: {
    //     motherName: String,
    //     fatherName: String,
    //     siblingName: String
    // },
    // cars: [ String  ]
//}, 
// { timestamps: true });
const bookSchema = new mongoose.Schema({
    bookname:String,
    authorname:String,
    category: String,
    year:{
        type:Number,
        required:true
    },
 },
  {  timestamps: true  });          



//module.exports = mongoose.model('User', userSchema)
module.exports = mongoose.model('Name', bookSchema) //users



// String, Number
// Boolean, Object/json, array