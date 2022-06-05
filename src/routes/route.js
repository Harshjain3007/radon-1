const express = require('express');
const router = express.Router();
const aap = require('aap')
router.get('/students/:name', function(req, res) {
    let studentName = req.params.name
    console.log(studentName)
    res.send(studentName)
})

router.get("/random" , function(req, res) {
    res.send("hi there")
})


router.get("/test-api" , function(req, res) {
    res.send("hi FunctionUp")
})


router.get("/test-api-2" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API")
})


router.get("/test-api-3" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's ")
})


router.get("/test-api-4" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
})



router.get("/test-api-5" , function(req, res) {
    res.send("hi FunctionUp5. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
})

router.get("/test-api-6" , function(req, res) {
    res.send({a:56, b: 45})
})

router.post("/test-post", function(req, res) {
    res.send([ 23, 45 , 6])
})


router.post("/test-post-2", function(req, res) {
    res.send(  { msg: "hi" , status: true }  )
})

router.post("/test-post-3", function(req, res) {
    // let id = req.body.user
    // let pwd= req.body.password

    // console.log( id , pwd)

    console.log( req.body )

    res.send(  { msg: "hi" , status: true }  )
})



router.post("/test-post-4", function(req, res) {
    let arr= [ 12, "functionup"]
    let ele= req.body.element
    arr.push(ele)
    res.send(  { msg: arr , status: true }  )
})

app.get("/sol1", function (req, res) {
let array = [11,12,13,14,16,17]
let t = 0;
for(var i  in array){
    total = total + array[i];
}
let lastdigit = array.pop()
let consecutivesum = lastdigit*(lastdigit+1)/2
let missingnumber = consecutivesum -t
 res.send(missingnumber);

}) 
app.get("/sol1", function (req, res) {
    let array = [33,34,35,336,37]
    let t = 0;
    for(var i  in array){
        total = total + array[i];
    }
    let lastdigit = array.pop()
    let consecutivesum = lastdigit*(lastdigit+1)/2
    let missingnumber = consecutivesum -t
     res.send(missingnumber);
    
    }) 

module.exports = aap;
module.exports = router;