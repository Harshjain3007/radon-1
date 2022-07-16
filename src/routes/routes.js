const express = require('express');
const router = express.Router();
const userController = require("../Controllers/userController")
const bookController = require("../controllers/bookController");
const reviewController = require("../controllers/reviewController");
const middleware = require("../middlewares/middleware");
const awsController=require("../Controllers/awsController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})
//===============>>===============[[[[[[[APIS FOR PROJECT3 Books Management]]]]]]]=============<<==================//

//====================Api to create a user=================================//

router.post("/register", userController.registerUser)

//======================Api to login a user================================//

router.post("/login", userController.loginUser)

//==============================Api to create a book=======================//

router.post("/books", middleware.authentication,awsController.aws1, bookController.createBook);

//==========================Api to get books============================//

router.get("/books", middleware.authentication, bookController.getBooks);

//=========================api to get the book data========================//

router.get("/books/:bookId", middleware.authentication, bookController.getBooksById);

//==================Api for updating books by bookId in path params========//

router.put("/books/:bookId", middleware.authentication, middleware.authorisation, bookController.updateBook);

//Api for deleting books by bookId in path params
router.delete("/books/:bookId",middleware.authentication,middleware.authorisation,bookController.deleteBook);

//Api for posting review  by bookId in path params
router.post("/books/:bookId/review", reviewController.createReview);

//Api for updating review  by bookId and review id in path params
router.put("/books/:bookId/review/:reviewId", reviewController.reviewUpdate);

//Api for deleting review  by bookId and review id in path params
router.delete("/books/:bookId/review/:reviewId", reviewController.deleteReview);


// if api is invalid OR wrong URL
router.all("/*", function (req, res) {
  res
    .status(404)
    .send({ status: false, msg: "The api you requested is not available" });
});

module.exports = router;
