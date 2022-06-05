const express = require('express');
const myHelper = require('../util/helper')
const underscore = require('underscore')

const router = express.Router();

router.get('/test-me', function (req, res) {
    myHelper.printDate()
    myHelper.getCurrentMonth()
    myHelper.getCohortData()
    let firstElement = underscore.first(['Sabiha','Akash','Pritesh'])
    console.log('The first element received from underscope function is '+firstElement)
    res.send('My first ever api!')
});

router.get('/hello', function (req, res) {
   
    res.send('Hello there!')
});

router.get('/candidates', function(req, res){
    console.log('Query paramters for this request are '+JSON.stringify(req.query))
    let gender = req.query.gender
    let state = req.query.state
    let district = req.query.district
    console.log('State is '+state)
    console.log('Gender is '+gender)
    console.log('District is '+district)
    let candidates = ['Akash','Suman']
    res.send(candidates)
})

router.get('/candidates/:canidatesName', function(req, res){
    console.log('The request objects is '+ JSON.stringify(req.params))
    console.log('Candidates name is '+req.params.canidatesName)
    res.send('Done')
})
//1>>>>>>>>>>>>>>>>>>>>>>>>.
router.get('/movies',function(req,res){
    const movies = ['Rang De Basanti', 'The shining','Lord of the rings', 'Batman begins'] 
    res.send(movies)

})

//2 and 3 >>>>>>>>>>>>
router.get('/movies/:indexNumber', function(req,res){
let movies = ['Rang De Basanti', 'The shining','Lord of the rings', 'Batman begins'] 
if(req.params.indexnumber<4){
    console.log(movies[req.params.indexnumber])
res.send(movies[req.params.indexnumber])}
else{
console.log('invalid movie not availabe')
res.send(movies['invalid movie not available'])
}
})
//4
router.get('/films', function(req,res){
let movies=    [ {
                "id":1,
                 "name":"Rang de Basanti"},
                 {
                     "id":2,
                     "name":"Incendies",
                  },

                  {
                      "id3":3,
                      "name": "The shining",

                 },
                 {
                     "id":4,
                     "name":"Finding nemo",
                 }

    
             ]
       res.send(movies)
})









module.exports = router;
// adding this comment for no reason









