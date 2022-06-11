//const { get } = require("express")
const bookModel = require("../models/bookModel")
const UserModel= require("../models/bookModel")

const createUser= async function (req, res) {
    let data= req.body
    let savedData= await UserModel.create(data)
    res.send({msg: savedData})
}

const getUsersData= async function (req, res) {
    let allUsers= await UserModel.find()
    res.send({msg: allUsers})
}
//>>>>>>>>>>>>>>>>>
const createBooks = async function(req,res){
let count = req.body
let xyz = await bookModel.create(count)
   res.send({msg: xyz})
}
//>>>>>>>>>>>>>>>>>
const booklist = async function(req,res){
let  abc = await bookModel.find().select({bookName:1,tags:{authorName:1},_id:0})
   res.send({msg:abc})
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const getBookInYear = async function (req,res) {
    //let years = req.body.year
    let allBooks=await bookModel.find(req.body.year)
    res.send({msg:allBooks})
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const getParticularBooks = async function (req,res) {
    let rst = await bookModel.find(req.body.Book2)
    res.send({msg:rst})
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const getXINRBooks= async function(req,res){
    let inrBooks =await bookModel.find({$or:[{"prices.indianprice":"100"},{"prices.indianpriceprice":"200"},{"prices.indianprice":"300"}]})
    res.send({msg:inrBooks})
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const getRandomBooks = async function(req,res){
let rst = await bookModel.find({$or:[{totalpages:{$gt:"500"}},{stockavailable:true}]})
 res.send({msg:rst})
}













//module.exports.createUser= createUser
//module.exports.getUsersData= getUsersData

module.exports.createBooks = createBooks
module.exports.booklist =  booklist
module.exports.getBookInYear = getBookInYear
module.exports.getParticularBooks = getParticularBooks
module.exports.getXINRBooks = getXINRBooks
module.exports.getRandomBooks= getRandomBooks