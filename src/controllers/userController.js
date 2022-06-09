const authorModel= require("../models/authorModel")
const bookModel= require("../models/bookModel")

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
let createAuthor = async(req,res) =>{
  let data = req.body
  let savedData = await authorModel.create(data)
  res.send({msg:savedData})
}

let createBook = async(req,res) =>{
    let data = req.body
    let savedData = await bookModel.create(data)
    res.send({msg:savedData})
}

let BooksbyChetanBhagat = async(req,res)=>{
    let data = await authorModel.find({author_name:"Chetan Bhagat"}).select("author_id")
    let getbooksData = await bookModel.find({author_id:data[0].author_id})
    res.send({msg:getbooksData})
    }

let authorofBook = async(req,res)=>{
let data = await  bookModel.findOneAndUpdate({name:"Two States"},{$set:{prices:100}},{new:true})
let authorData = await authorModel.find({author_id:data.author_id}).select("author_name")
let price = data.prices
res.send({msg:authorData, price})
}


let getBookbyCost = async(req,res)=>{
let data = await bookModel.find({price:{$gte:50,$lte:100}}).select({author_id:1,_id:0});
let arr1 = data.map((ele)=>ele.author_id)
console.log(arr1)
let authorData = await authorModel.find({author_id:{$in:arr1}}).select({author_name:1,_id:0})
console.log(authorData)
    
}







module.exports.createAuthor = createAuthor
module.exports.createBook = createBook
module.exports.BooksbyChetanBhagat = BooksbyChetanBhagat
module.exports.authorofBook = authorofBook
module.exports.getBookbyCost = getBookbyCost












