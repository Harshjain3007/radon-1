const authorModel = require("../Models/authormodel")
const mongoose = require('mongoose');
const blogsmodel = require("../Models/blogsmodel");
const jwt = require("jsonwebtoken");
const authormodel = require("../Models/authormodel");
const objectId = mongoose.Schema.Types.objectId

//EDGE CASE FUNCTION
const valid = function(value){
    if(typeof value === "ündefined" || value===null) return false
    if(typeof value === "string" && value.trim().length===0) return false
    if(typeof value === Number && value.trim().length===0) return false
    return true
    }

//VALID OBJECTID FUNCTION
    const isValidObjectId=function(objectId){
      return mongoose.Types.ObjectId.isValid(objectId)
  }
  


  //CREATE AUTHOR POST API
    const createAuthor = async function (req, res) {
    try {
        let data = req.body;
        let email =req.body.email
        let password = req.body.password
       //EDGE CASES 
        if(Object.keys(data).length===0){
            return res.status(400).send({status:false,msg:'BAD REQUEST',reason:"body cannot be empty"})
        }
        let title = ['Mr','Mrs','Miss']
        if(!valid(req.body.fname)) return res.status(400).send({status:false,msg:"fname is mandatory"})
        if(!valid(req.body.lname)) return res.status(400).send({status:false,msg:"lname is mandatory"})
        if(title.indexOf(req.body.title)== -1) return res.status(400).send({status : false, msg : "Please enter title [Mr, Mrs or Miss]"})
        if(!valid(req.body.email)) return res.status(400).send({status:false,msg:"email is mandatory"})
        if(!valid(req.body.password)) return res.status(400).send({status:false,msg:"password is mandatory"})

     //REGEX FOR FNAME AND LNAME
      function validname(pass)
      {
        let c =  /[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/
        return c.test(pass)

      }
      const fnamecheck = validname(req.body.fname)
      if(!fnamecheck) return res.status(400).send({status:false, msg:"only letter, space and dot is allowed"})
      const lnamecheck = validname(req.body.lname)
     if(!lnamecheck) return res.status(400).send({status:false,msg:"only letter, space and dot is allowed"})

        //REGEX FOR EMAIL   
        function verifyemail(check)
        {
            let a = /\S+@\S+\.\S+/
            return a.test(check)
        }
        const emailvalidity = verifyemail(req.body.email)
        if(!emailvalidity) return res.status(400).send({status:false, msg:'not a valid email'})
        const uniqueemail = await authormodel.find({email:email})
        if(uniqueemail.length!=0) return  res.status(400).send({status:false,msg:'Id already in use'})

      //REGEX FOR PASSWORD
        function verifypassword(pass)
        {
           let b = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
           return b.test(pass)
        }
        const passwordcheck = verifypassword(req.body.password)
    if(!passwordcheck) res.status(400).send({status:false,msg:'Minimum eight characters, at least one letter, one number and one special character'})
       const uniquepassword= await authormodel.find({password:password})
      if(uniquepassword.length!=0) res.status(400).send({status:false,msg:'password already exist'})

        const savedata = await authorModel.create(data)
        res.status(201).send({ status: true,msg:'Author is created successfully',msg: savedata })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}
//AUTHOR LOGIN
const authorlogin = async function(req,res){
    let authorname = req.body.email;                             //EMAIL AND PASSWORD MANDATORY
    if(!authorname) return res.status(404).send('No such author')
    let password = req.body.password;
  if (!password) return res.send(404).send('password not found')
    let user = await blogsmodel.findOne({ emailId: authorname, password: password });
    if (!user) 
      return res.send({                                   //CHECK WEATHER PASSWORD OR EMAIL IS VALID
        status: false,
        msg: "authorname or the password is not correct",
})
//JWT TOKEN CREATION
let token = jwt.sign(
    {
      authorId: user._id.toString(),
      batch: "radon",
      organisation: "FunctionUp",
    },
    "functionup-radon"
  );
  res.setHeader("x-api-key", token);
  res.send({ status: true, token: token });
}









module.exports.createAuthor= createAuthor
module.exports.authorlogin=authorlogin