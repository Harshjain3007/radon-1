const { trusted } = require("mongoose")
const authorModel = require("../models/authorModel")
const AuthorModel= require("../models/authorModel")
const bookModel = require("../models/bookModel")
const bookPublisher = require("../models/bookPublisher")
//const createAuthor= async function (req, res) {
   // let author = req.body
  //  let authorCreated = await AuthorModel.create(author)
   //res.send({data: authorCreated})
//}

//const getAuthorsData= async function (req, res) {
 //   let authors = await AuthorModel.find()
 //   res.send({data: authors})
//}

//module.exports.createAuthor= createAuthor
//module.exports.getAuthorsData= getAuthorsData
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const createAuthor = async function (req,res){
let data = req.body
let saveddata = await AuthorModel.create(data)
res.send({data:saveddata});
}

const getPublishersData = async function (req,res){
let data = req.body
let saveddata = await bookPublisher.create(data)
res.send({data:saveddata})
}

const createBook = async function(req,res){
let book = req.body
let authorId = req.body.author_id
let publisherId = req.body.publisher_id
 if(!authorId){res.send({Error:"Please enter the author Id"})
 }
const authorInfo = await authorModel.findById(authorId)
if(!authorInfo){
    res.send({Error:"Please enter a valid author ID"})
}
if (!publisherId) {
    res.send({Error:"Please enter the publisher Id"})
}
const publisherInfo = await bookPublisher.findById(publisherId)
if(!publisherInfo){
    res.send({Error:"Please enter avalid publisher Id"})
}
let bookcreated = await bookModel.create(book);
res.send(bookcreated);
}

 const getBooksData = async function (req,res){
  let books = await bookModel.find().populate("author_id").populate("publisher_id")
  res.send({data: books})
 }
const updatepublisher= async function(req,res){
let data = await bookModel.updateMany({publisher:"HaperCollins",publisher:"pegeuin"},{isHardCover:true})
res.send({update:data})
}

const Updaterating= async function(req,res){
let data = await bookModel.updateMany({rating:{gt:3.5}},{$inc:{price:10}},{new:true})
res.send({update:data})
}



 







module.exports.createAuthor = createAuthor
module.exports.getPublishersData = getPublishersData
module.exports.createBook = createBook
module.exports.getBooksData = getBooksData
module.exports.updatepublisher = updatepublisher
module.exports.Updaterating = Updaterating