const { count } = require("console")
const authorModel= require("../models/authorModel")
const productModel = require("../models/productModel")
const orderModel = require("../models/orderModel")
const userModel = require("../models/userModel")
const moment = require("moment");

const createAuthor= async function (req, res) {
    let data = req.body
    let authorId = data.dauthor_id
    if(!authorId) return res.send({msg: 'AuthorId is mandatory in the request'})

    let savedData= await authorModel.create(data)
    res.send({data: savedData})
}

module.exports.createAuthor= createAuthor
///>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const createProduct = async function (req,res) {
 let data = req.body
 let savedData = await productModel.create(data)
 res.send({msg:savedData})
}
const getProducts = async function(req,res){
    let allproducts = await productModel.find()
    res.send({msg:allproducts})
}


const createUser = async function(req,res){
   req.body.freeaapuser = req.headers.freeaapuser
   let data = req.body;
   let saveddata = await userModel.create(data);
   res.send(saveddata);
}

const createOrder = async function (req,res){
req.body.freeaapuser = req.headers.freeaapuser
let data  = req.body;
if(!data.userId)res.send("Please enter the user ID");
let user = await userModel.findById(date.userId);
if(!user)res.send("entered userID is not valid");

if(!data.productId)res.send("Please enter the product ID");
let product = await productModel.findById(data.productId);
if(!product)res.send("entered productID id not valid");

if (data.freeaapuser === "true"){
amount = 0;
}else{
    amount = product.price;
}


const date = new Date();
if (amount>user.balance)res.send("Insufficent Balance");
else {
user = await userModel.findById(data.userId).updateOne({$inc:{balance: -amount}});
data["amount"] = amount;
data["date"] = date.toLocaleDateString("en-US");
let savedData = await orderModel.create(data);
res.send(savedData);
}
}










module.exports.createUser =   createUser
module.exports.createProduct =  createProduct
module.exports.getProducts =   getProducts
module.exports.createOrder = createOrder
