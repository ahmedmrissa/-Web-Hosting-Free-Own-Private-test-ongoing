const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
require('dotenv').config()

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID
  
};
console.log(process.env.APIKEY)
const firebaseApp = initializeApp(firebaseConfig);


module.exports = getStorage(firebaseApp );