const UserModel= require("../models/userModel")

/*const createUser= async function (req, res) {
  let data= req.body
    let savedData= await UserModel.create(data)
    res.send({msg: savedData})
}

const getUsersData= async function (req, res) {
    let allUsers= await UserModel.find()
    res.send({msg: allUsers})
}*/
const getbookSchema = async function (req, res){
    let data =req.body
    let savedData =await UserModel.create(data)
    res.send({msg: savedData})
}
const  getbookSchemadata = async function (req,res){
     let allviewrs = await UserModel.find()
    res.send({msg: allviewrs})
}
 


//module.exports.createUser= createUser
//module.exports.getUsersData= getUsersData
module.exports.getbookSchema= getbookSchema
module.exports.getbookSchemadata= getbookSchemadata