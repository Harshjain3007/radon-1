const express = require('express');
//const { route } = require('express/lib/application');
const router = express.Router();

const authorController= require("../controllers/authorController")
//const bookController= require("../controllers/bookController")


//router.get("/test-me", function (req, res) {
//    res.send("My first ever api!")
//})

//router.post("/createAuthor", authorController.createAuthor  )

//router.get("/getAuthorsData", authorController.getAuthorsData)

//router.post("/createBook", bookController.createBook  )

//router.get("/getBooksData", bookController.getBooksData)

//outer.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
router.post("/CreateAuthor", authorController.createAuthor)
router.post("/getPublishersData", authorController.getPublishersData)
router.post("/createBook",authorController.createBook)
router.get("/getBooksData",authorController.getBooksData)
router.put("/updatepublisher",authorController.updatepublisher)
router.put("/updaterating",authorController.Updaterating)





module.exports = router;