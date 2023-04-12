const mongoose=require('mongoose');

const categoryEnumeration = ["Phone","Smart Phone","Tablet","Laptop"]

const Schema= mongoose.Schema;

const ProductSchema=new Schema({
    label:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    category:{
        type:String,
        enum:{values:categoryEnumeration, message : '{VALUE} is not supported'}
    },
    price:{
        type:Number,
        min:0,
        max:99999
        
    },
    photo_url:{
        type:String,
    }

})

module.exports=mongoose.model('Product',ProductSchema);
