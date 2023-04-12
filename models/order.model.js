const mongoose = require('mongoose')
const User = require('./user.model')
const Product = require('./product.model')

const OrderSchema = new mongoose.Schema({
   orderDate:{
    type : Date,
    required: true
   },
   user:{
     type: mongoose.Schema.Types.ObjectId, ref: 'User' ,
     require: true
   },
   detail:[
    {
        product:{ type: mongoose.Schema.Types.ObjectId, ref: 'Product',required:true },
        qte:{type:Number}
    }
   ],
   status:{
    type:String,
    default: "Pending",
    enum:["Pending","Confirmed","Canceled"]
   }
},
    { timestamps: true }
)

module.exports = mongoose.model("Order", OrderSchema)