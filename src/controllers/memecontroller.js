let axios = require("axios");

let allmeme = async function (req,res){
     try{
var options = {
     method:'get',
     url: `https://api.imgflip.com/get_memes`
}
let result = await axios(options);
console.log(result)
let data = result.data
res.status(200).send({msg:data,status:true})
}catch(error){
     console.log(error)
     res.status(500).send({msg:error.message})
}
}

let pickid = async(req,res)=>{
     try{
  let template_id = req.querry.template_id
  let text0 = req.querry.text0
  let text1 = req.querry.text1
  let username = req.querry.username
  let password = req.querry.password
  let body = req.body
  var options = {
     method: 'post',
     url: `https://api.imgflip.com/get_memes?template_id=${template_id}&text_0=${text0}&text1=${text1}&username=${username}&password=${password}`
}
let result = await axios(options)
console.log(result.data)
let data = result.data
res.send({ msg: result.data })
}catch(error){
     console.log(error)
     res.status(500)({msg:error.message})
}
}
module.exports.allmeme = allmeme
module.exports.pickid = pickid
