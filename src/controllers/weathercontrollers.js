let axios = require("axios");
const e = require("express");

let Londonweather = async (req,res)=>{
try{let london = req.query.q
let apikey = req.query.appid
console.log(`query params are:${london}${apikey}`)
var options = {
 method: "get",
 url : `http://api.openweathermap.org/data/2.5/weather?q=${london}&appid=${apikey}`
}
let result=await axios(options)
console.log(result.data)
res.status(200).send({msg:result.data})
}
catch(error){
    res.status(500).send({status:false,msg:"server error"})
}
}

let Londontemprature = async (req,res)=>{
   try{ let london = req.query.q
    let apikey = req.query.appid
    console.log(`query params are:${london}${apikey}`)
    var options = {
     method: "get",
     url : `http://api.openweathermap.org/data/2.5/weather?q=${london}&appid=${apikey}`
    }
    let result=await axios(options)
    console.log(result.data)
    res.status(200).send({msg:result.data.main["temp"]})
    }catch(error){
        console.log(error)
        res.status(500).send({msg:error.message})
    }
}
    
let citiessorted =  async (req,res)=> {
    try{
let cities = ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
let cityobj = []
for(i=0;i<cities.length;i++){
let obj = {city: cities[i]}
let a = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=0b7d59e9562257395f88615f37746a1e`)
console.log(a.data.main.temp)
obj.temp = a.data.main.temp
cityobj.push(obj)
}
let sorting = cityobj.sort(function(a,b){return a.temp-b.temp})
console.log(sorting)
res.send(200).send({status:true,data:sorting})
}catch(error){
    console.log(error)
    res.status(500).send({msg:error.message})
}
}

















module.exports.Londonweather = Londonweather
module.exports.Londontemprature = Londontemprature
module.exports.citiessorted = citiessorted