const express = require('express');
const _ = require('lodash');

const externalModule = require('../logger/logger')
const dateModule =require('../util/helper')
const caseModule =require('../validator/formatter')

const router = express.Router();

router.get('/test-me', function (req, res) {
   
   
     
     console.log( externalModule.welcome)
    dateModule.printDate()
    dateModule.printMonth()
    dateModule.getBatchInfo()
    caseModule.trim()
    caseModule.changeToLowerCase()
    caseModule.changeToUpperCase()

    res.send('My First ever API')
    
})

router.get("/hello",function(req,res) {
let array= ['January','February','March','April','May','June','July','August','September','October','November','December']
console.log(
   _.chunk(['January','February','March','April','May','June','July','August','September','October','November','December'], 4));

let odd = [1,3,5,7,9,11,13,15,17,19]
console.log(_.tail(odd))

let a = [2,4,5,6,34,23,65,]
let b = [7,4,15,42,44,12,11,]
let c = [13,36,41,73,12,27,67,]
let d = [19,29,35,46,36,63,65,]
let e = [39,29,37,48,54,66,62,]
console.log(_.union(a,b,c,d,e))

let pairs = [
['horror', 'The Shining'],
['drama','Titanic'],
['thriller','Shutter Island'],
['fantas','Pans Labyrinth']
]


console.log(_.fromPairs(pairs))



res.send('hay')
})





module.exports = router;
// adding this comment for no reason
