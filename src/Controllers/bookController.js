const bookModel = require("../models/bookModel");
const awsController= require("../Controllers/awsController")

const {
  isValidReqBody,
  isValid,
  isValidSubcategory,
  isValidObjectId,
  isValidRelAt,
  isValidISBN,
} = require("../validator/validation");
const userModel = require("../models/userModel");
const reviewModel = require("../models/reviewModel");
const { default: mongoose } = require("mongoose");

//------------------------------------------------------------------------------------------------------------------------------------------------------

const createBook = async function (req, res) {
  try {
    // book details sent through request body
    const data = req.body;
    let files= req.files
        
          
    const {
      title,
      excerpt,
      userId,
      ISBN,
      category,
      subcategory,
      isDeleted,
      releasedAt,
     
    } = data;


    // VALIDATIONS:

    // if request body is empty
    if (!isValidReqBody(data)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide the book details" });
    }

    // if title is empty
    if (!isValid(title)) {
      return res.status(400).send({
        status: false,
        message: "Please provide the title (required field)",
      });
    }
    // title duplication check
    const isDuplicateTitle = await bookModel.findOne({ title: title });
    if (isDuplicateTitle) {
      return res
        .status(400)
        .send({ status: false, message: "Title is already used!" });
    }

    // if excerpt is empty
    if (!isValid(excerpt)) {
      return res.status(400).send({
        status: false,
        message: "Please provide the excerpt (required field)",
      });
    }

    // if userId is empty
    if (!isValid(userId)) {
      return res.status(400).send({
        status: false,
        message: "Please enter userId (required field)",
      });
    }
    // if userId is invalid
    if (!isValidObjectId(userId)) {
      return res.status(400).send({
        status: false,
        message: "userId is invalid!",
      });
    }
    // if userId does not exist (in our database)
    const userIdInDB = await userModel.findById(userId);
    if (!userIdInDB) {
      return res
        .status(404)
        .send({ status: false, message: "UserId does not exist" });
    }
    // 📌 AUTHORISATION: if userId (in token) !== userId (in req.body)
    if (userId !== req.userId) {
      return res.status(401).send({
        status: false,
        message: `Authorisation Failed: You are logged in as ${req.userId} not ${userId}`,
      });
    }

    // if ISBN is empty
    if (!isValid(ISBN)) {
      return res.status(400).send({
        status: false,
        message: "Please provide the ISBN (required field)",
      });
    }
    // if ISBN is invalid
    if (!isValidISBN(ISBN)) {
      return res.status(400).send({
        status: false,
        message: "ISBN is invalid",
      });
    }
    // ISBN duplication check
    const isDuplicateISBN = await bookModel.findOne({ ISBN: ISBN });
    if (isDuplicateISBN) {
      return res
        .status(400)
        .send({ status: false, message: "ISBN is already used!" });
    }

    // if category is empty
    if (!isValid(category)) {
      return res.status(400).send({
        status: false,
        message: "Please provide the category (required field)",
      });
    }

    //  // if subcategory is an array then validating each element
    //  if (Array.isArray(subcategory)) {
    //   for (let i = 0; i < subcategory.length; i++) {
    //     element = subcategory[i];
    //     if (!isValid(element)) {
    //       return res.status(400).send({
    //         status: false,
    //         message: 'subcategory is (required field) format like: ["Fiction","Classic"]',
    //       });
    //     }
    //   }
    // }

    // // if subcategory is empty
    // if (!isValidSubcategory(subcategory)) {
    //   return res.status(400).send({
    //     status: false,
    //     message: "Please provide the subcategory (required field)",
    //   });
    // }

    // if releasedAt is empty
    if (!isValid(releasedAt)) {
      return res.status(400).send({
        status: false,
        message: "Please provide the book release date (required field).",
      });
    }
    // if releasedAt is invalid (format)
    if (!isValidRelAt(releasedAt)) {
      return res.status(400).send({
        status: false,
        message: "Please follow the format YYYY-MM-DD for book release date",
      });
    }

    // if "isDeleted": true
    if (isDeleted) {
      return res.status(400).send({
        status: false,
        message: "isDeleted cannot be true during creation!",
      });
    }

    // if deletedAt is entered
    delete data.deletedAt;
data.bookCover=req.awsurl
    //creating book
    const createdBook = await bookModel.create(data);

    // response
    res.status(201).send({
      status: true,
      message: "Sucess",
      data: createdBook,
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};


 const getBooks = async function(req,res){
  try {
         const query = {isDeleted:false,deletedAt:null}
   
         const getQuery = req.query;
       
         const {userId,category,subcategory,...rest}
        = getQuery;
        if (Object.keys(rest).length>0)
        res.status(400).send({status:false,message: "Please enter the required field"})

if (isValid(category)) {
          query.category = category.trim();
        }
  
     if(isValid(subcategory)){
           query.subcategory = subcategory.trim();
             } 

        if (isValid(userId) && isValidObjectId(userId)){
          
             query.userId = userId.trim();
                 } 


  const getBook = await bookModel.find(query).select({book_id:1,title:1, excerpt: 1,userId:1,category:1,releasedAt:1,}).sort({title:1})
getBook.sort((a,b)=>a.title.localeCompare(b.title))
if(getBook.length==0) return res.status(404).send({status : false, msg : "No data found"})
 



 console.log(getBook)
 res.status(200).send({status : true, data : getBook})
        
         }






        
    
 catch(error){
     res.status(500).send({
         status: false,
        message: "Internal Server Error",
         error: error.message,
     });
 }
}





















//===========*==================*===============[GET BOOK BY ID]===============*===============*=============*
let getBooksById= async(req,res)=>{
    try {
        let bookId=req.params.bookId
        //-----------validations====>>>>
        bookId.isDeleted=false
        if(!mongoose.Types.ObjectId.isValid(bookId)){
            return res.status(400).send({status:false,message:'Invalid UserId Format'})
        }
        let checkBook=await bookModel.findById(bookId)
        if(!checkBook){
            return res.status(404).send({status:false,message:'Book Not Found'})
        }
        //-------------Check  Reviews----------
        let reviewsData=await reviewModel.find({_id:bookId,isDeleted:false})
        let {_id,title,category,subcategory,excerpt,reviews,updateedAt,createdAt,releasedAt,isDeleted}=checkBook
        //------------Send Response------------
        let data ={_id,title,category,subcategory,excerpt,reviews,updateedAt,createdAt,releasedAt,isDeleted,reviewsData}
        return res.status(200).send({status:true,message:'Book list',data:data})
    } catch (error) {
        return res.status(500).send({status:false,message:error.message})
    }
}

//======================================[Update Book]======================================================


const updateBook = async function (req, res) {
    try {
      // bookId sent through path params
      const bookId = req.params.bookId;
  
      // bookId VALIDATIONS: handled by middleware
  
      // book details (to be updated) sent through request body
      const bodyFromReq = req.body;
  
      // if request body is empty
      if (!isValidReqBody(bodyFromReq)) {
        return res.status(400).send({
          status: false,
          message: "Please provide book details to update!",
        });
      }
  
      // update fields sent through request body
      const { title, excerpt, releasedAt, ISBN } = bodyFromReq;
  
      // if title is present in req checking through hasOwnProperty
      if (bodyFromReq.hasOwnProperty("title")) {
        // if title is empty
        if (!isValid(title)) {
          return res
            .status(400)
            .send({ status: false, message: "title is not valid!" });
        }
        // title duplication check
        const isPresentTitle = await bookModel.findOne({ title: title });
        if (isPresentTitle) {
          return res.status(400).send({
            status: false,
            message: `${title.trim()} is already exists.Please try a new title.`,
          });
        }
      }
  
      // if excerpt is present in req checking through hasOwnProperty
      if (bodyFromReq.hasOwnProperty("excerpt")) {
        // if excerpt is empty
        if (!isValid(excerpt)) {
          return res
            .status(400)
            .send({ status: false, message: "excerpt is not valid!" });
        }
      }
  
      // if releasedAt is present in req checking through hasOwnProperty
      if (bodyFromReq.hasOwnProperty("releasedAt")) {
        // if releasedAt is empty or invalid format
        if (!isValidRelAt(releasedAt)) {
          return res.status(400).send({
            status: false,
            message: "releasedAt is not valid.Please use (YYYY-MM-DD) format",
          });
        }
      }
  
      // if ISBN is present in req checking through hasOwnProperty
      if (bodyFromReq.hasOwnProperty("ISBN")) {
        // if ISBN is empty or invalid format
        if (!isValidISBN(ISBN)) {
          return res.status(400).send({
            status: false,
            message: "ISBN is not valid.Please use 10 or 13 digits ISBN format",
          });
        }
        // ISBN duplication check
        const isPresent_ISBN = await bookModel.findOne({ ISBN: ISBN });
        if (isPresent_ISBN) {
          return res.status(400).send({
            status: false,
            message: `${ISBN.trim()} is already registered.`,
          });
        }
      }
  
      //updating book details
      const updatedBook = await bookModel.findOneAndUpdate(
        { _id: bookId },
        { ...bodyFromReq },
        { new: true }
      );
      return res.status(200).send({ status: true, data: updatedBook });
    } catch (err) {
      res.status(500).send({ status: false, message: err.message });
    }
}
  
  //============Delete a book================
  // bookId VALIDATION (handled by middleware)
      // CASES:
      // CASE-1: bookId does not exist (handled by middleware)
      // CASE-2: bookId exists but is deleted (handled by middleware)
      // CASE-3: bookId exists but is not deleted
  const deleteBook = async function (req, res) {
    try {
      // bookId sent through path params
      let bookId = req.params.bookId;
  
      
      let check = await bookModel.findOne({ _id: bookId }); // database call
      if (check && !check.isDeleted) {
        // deletion of blog using findOneAndUpdate
        await bookModel.findOneAndUpdate(
          {
            _id: bookId,
          },
          {
            isDeleted: true,
            deletedAt: new Date(), //deletedAt is added using Date() constructor
          }
        );
        return res.status(200).send({
          status: true,
          message: "Deletion Successful",
        });
      }
    } catch (err) {
      res.status(500).send({
        status: false,
        message: "Internal Server Error",
        error: err.message,
      });
    }
  };
  

module.exports={createBook,getBooks,getBooksById,updateBook,deleteBook}
