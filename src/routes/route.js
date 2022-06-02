const express = require('express');
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
module.exports = router;
// adding this comment for no reason