const mongoose=require('mongoose');



const Schema= mongoose.Schema;

const ContactSchema=new Schema({
    email:{
        type: String,
        trim: true,
        required: [true, 'email is required'],
        unique: 'Two users cannot share the same email ({VALUE})',
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true 
    },
    file_upload:{
        type:String,
        required:false
        
    }

})

module.exports=mongoose.model('Contact',ContactSchema);
