const authorModel = require("../Models/authormodel")
const blogsModel = require("../Models/blogsmodel")
const mongoose = require('mongoose')
const blogsmodel = require("../Models/blogsmodel")
const { query } = require("express")
const objectId = mongoose.Schema.Types.objectId

const valid = function(value){
if(typeof value === "ündefined" || value===null) return false
if(typeof value === "string" && value.trim().length===0) return false
if(typeof value === Number && value.trim().length===0) return false
return true
}

const isValidObjectId=function(objectId){
  return mongoose.Types.ObjectId.isValid(objectId)
}



const createBlog = async function(req,res) {
try{
const data = req.body
if(!valid(req.body.title)) return res.status(400).send({status:false,msg:"title is mandatory"})
if(!valid(req.body.body)) return res.status(400).send({status:false,msg:"body is mandatory"})
if(!valid(req.body.tags)) return res.status(400).send("tags is mandatory")
if(!valid(req.body.category))return res.status(400).send("tags is category")
if(!valid(req.body.subcategory)) return res.status(400).send("subcategory is mandatory")
if(!valid(req.body.author_id)) return res.status(400).send("author_id is mandatory")
const authorvalidation = await authorModel.findById(req.body.author_id)
if (!authorvalidation)  return res.status(400).send('not a valid author')
const saveddata = await blogsmodel.create(data)
res.status(201).send({status:true,msg:saveddata})
}
catch(error){
    res.status(500).send({status:false,msg:error.message})
}
}

const getblogs = async function(req,res){
try{
 let querydata = req.query
 if(!querydata) return res.status(404).send({status:false,msg:"no query found"})
 let authorid = req.query.author_id
 if(req.query.authorid){

 }
  const data = await blogsmodel.find({$and: [{isPublished:true,deleteddata:false,...querydata}]})
if(data.length==0) return res.status(404).send({status: false,msg: "No data found"})
res.status(200).send({status:true,msg:data})
}catch(error){
  res.status(500).send({status:false.valueOf,msg:error.message})
}
}



const putblogs=async function(req,res){
try{
const title = req.body.title
const body = req.body.body
const tags = req.body.tags
const subcategory = req.body.subcategory
const blog_id = req.params.blog_id
const ispublishedat =req.body.ispublishedat
//let data = req.body
//let {title,body,tags,subcategory,ispublishedat} = data
const newdata = await blogsmodel.findOneAndUpdate(
             {_id:blog_id}, {$set:{title:title,body:body,tags:tags,subcategory:subcategory}},{new:true})
if(newdata.deletedata===true) return res.send({msg:"blog does not exist"})
if(ispublishedat){
const newdata2 = await blogsmodel.findOneAndUpdate({_id:blog_id},{$set:{title:title,body:body,tags:tags,subcategory:subcategory,isPublished:true,
     ispublishedat:ispublishedat}},{new:true})
     if(!newdata2) return res.status(404).send({status:false,msg:"no data found"})
   res.status(200).send({msg:newdata2})
}
res.status(200).send({msg:newdata})
}catch(error){
     res.status(500).send({msg:error.message})
}
}






const deletedblog = async function(req,res){
try{
  const blogId = req.params.blog_id
  if(!blogId) return res.status(404).send('No such id exist')
const valid = await blogsmodel.findById(blogId)
if(!valid)  return res.status(404).send('No such blg exist')
const data = await blogsmodel.findOneAndUpdate({_id:blogId},{$set:{deletedata:true}},{new:true})
res.status(200).send({msg:data})
}catch(error){
  res.send({msg:error.message})
}
}

const deletedquerryblog = async(req,res)=>{
  try{
let category = req.query.category
let author_id = req.query.author_id
let tags= req.query.tags
let subcategory = req.query.subcategory
let isPublished = req.query.isPublished
const newdocuments = await blogsModel.updateMany({$or :[{author_id:author_id},{category:category},{isPublished:isPublished},
         {tags:tags}]}, {$set:{deletedata:true}},{new:true})
res.status(200).send({msg:newdocuments})

}catch(error){
  res.send({msg:error.message})
}
}                                        


module.exports.createBlog = createBlog
module.exports.getblogs = getblogs
module.exports.putblogs = putblogs
module.exports.deletedblog = deletedblog
module.exports.deletedquerryblog =deletedquerryblog





