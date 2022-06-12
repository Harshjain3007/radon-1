const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const { application } = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://HarshJain:harsh321@cluster0.dwkz9.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

//app.use (
 //function (req, res, next) {
    //    console.log ("inside GLOBAL MW");
     //   next();
  //}
 // );

//app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

const middleware = function(req,res,next){
var currentdate = new Date()
var dateTime = currentdate.getDate() + " "
+ (currentdate.getMonth()+1) + " "
+ currentdate.getFullYear() + " "
+ currentdate.getHours()+ " "
+ currentdate.getMinutes() + ":"
+ currentdate.getSeconds();
let ip = req.ip
let url = req.url
console.log(dateTime+ ","+ ip+","+url);

next();
}
app.use(middleware)


