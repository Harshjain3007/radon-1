const mongoose = require('mongoose');
const publisherSchema = new mongoose.Schema({

name:String,
headQuater: String,
});  ({timeStamps:true})
module.exports= mongoose.model("publisher", publisherSchema)