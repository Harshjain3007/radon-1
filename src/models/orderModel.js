const moment = require('moment');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema ({ 
      userId:{
          type:ObjectId,
          ref:'User'
    },
    productId:{
        type:ObjectId,
        ref:'product' 
    },
    amount: Number,
    freeaapuser: true,
    date: moment().format()
},
{timeStamps:true})
module.exports = mongoose.model('order',orderSchema)
