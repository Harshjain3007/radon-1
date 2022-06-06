const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})
router.post("/created", async function (req,res){
    let data = req.body
  let saveData = await UserModel.create(data)
   res.send({msg:saveData})
})



//router.post("/createUser", UserController.createUser  )
//router.get("/getUsersData", UserController.getUsersData)
router.post("/abc", UserController.getbookSchema)                                       
 router.get("/getbookSchemadata",UserController.getbookSchemadata)                               

module.exports = router;