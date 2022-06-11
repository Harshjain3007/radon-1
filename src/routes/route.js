const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
// const BookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

//router.post("/createUser", UserController.createUser  )

//router.get("/getUsersData", UserController.getUsersData)

//router.post("/createBook", BookController.createBook  )

//router.get("/getBooksData", BookController.getBooksData)

router.post("/createBooks", UserController.createBooks)
router.get("/booklist",UserController.booklist)
router.get("/getBookInYear",UserController.getBookInYear)
router.get("/getParticularBooks",UserController.getParticularBooks)
router.get("/getXINRBooks", UserController.getParticularBooks) 
router.get("/getRandomBooks",UserController.getRandomBooks) 






module.exports = router;