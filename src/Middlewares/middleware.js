const jwt = require("jsonwebtoken");
const blogsmodel = require("../Models/blogsmodel");

const validateToken = function(req, res, next) {
    try{
    let token = req.headers["x-api-key"];
    if (!token) token = req.headers["x-api-key"];
    if (!token) return res.status(401).send({ status: false, msg: "token must be present" });
  console.log(token);
  let decodedToken = jwt.verify(token, "functionup-radon");
    if (!decodedToken) {
      return res.status(401).send({ status: false, msg: "token is invalid" });
    }
    next()
}catch(error){
    res.status(500).send({status:false,msg:error.message})
}
}



const authorization =  async function(req,res,next) {
    try{
    let token = req.headers["x-api-key"];
    let decodedToken = jwt.verify(token, "functionup-radon");
 let blogid = req.params.blogid
let bloggersDetails = await blogsmodel.findById(blogid)
   let userLoggedIn = decodedToken.author_id
  if(bloggersDetails!= userLoggedIn)
   return res.status(401).send({status: false, msg: 'User logged is not allowed to modify the requested users data'})
       next()
 }catch(error){
    res.status(500).send({status:false,msg:error.message})
 }
}




module.exports.validateToken = validateToken
module.exports.authorization = authorization