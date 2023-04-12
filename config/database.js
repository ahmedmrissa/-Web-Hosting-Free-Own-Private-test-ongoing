const mongoose=require('mongoose');
mongoose.set('strictQuery', true);

const MONGO_DB=process.env.MONGO_DB 

const connect=()=>{
    mongoose.connect(MONGO_DB)
    .then(_ =>{
        console.log('Successfully Connected to Database')
    })
    .catch(error => {
        console.error(error.message);
        console.log('Fail to connect to Database');
    })
}

exports.connect=connect;