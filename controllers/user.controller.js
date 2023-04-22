const router=require('express').Router();
const userService=require('../services/user.service');
const formatResponse=require('../utilities/format.response')
const authentication=require('../middlewares/authentication');
const { avatarUpload } = require('../middlewares/multer')
const User = require('../models/user.model')
require('dotenv').config()
const {
    ref,
    uploadBytes,
    listAll,
    deleteObject,
    getDownloadURL
} = require("firebase/storage");
const storage = require("../middlewares/firebase");
const verifyToken = require('../middlewares/authentication');


router.post('/register',async (req,res)=>{
    const {fullName,email,password}=req.body;
    
    try {
        const result = await userService.register(fullName,email,password);
        res.json(result);        
    } catch (error) {
        res.json(formatResponse('ERROR',error.message))
    }
})

router.post('/login',async (req,res)=>{
    const {email,password}=req.body;
    try {
        const result = await userService.login(email,password);
        res.json(result);        
    } catch (error) {
        res.json(formatResponse('ERROR',error.message))
    }
})

router.get('/all', authentication,async (req,res)=>{
    try {
        const result = await userService.getAllUsers();
        res.json(result);
    } catch (error) {
        res.json(formatResponse('ERROR','500 Error Server'))
    }
})
router.get('/one/:id',verifyToken,async (req,res)=>{
    const id = req.params.id;
    try {
        const result = await userService.getOneUser(id);
        res.json(result);
    } catch (error) {
        res.json(formatResponse('ERROR','500 Error Server'))
    }
})
router.put('/update/:id',verifyToken, async (req, res) => {
    const id = req.params.id;
    const { fullName, email, password } = req.body;
    try {
        const result = await userService.updateUser(id, { fullName, email, password })
        res.json(result)
    } catch (error) {
        res.json(formatResponse('ERROR', error.message))
    }
})
router.put('/upload/:id',verifyToken, async (req, res, next) => {
    await avatarUpload(req, res, async (error) => {
        if (error) {
            res.status(500).json({ error: error.message })
        }
        try {
            const id = req.params.id;
            const upLoadedPhoto = req.file;

            const path = upLoadedPhoto.fieldname + '-' + Date.now() + '.' + upLoadedPhoto.originalname.split('.')[upLoadedPhoto.originalname.split('.').length - 1]
            const storageRef = ref(storage);
            const imgRef = ref(storageRef, 'avatar');
            const imageRef = ref(imgRef, path);
            
                
                
            const metatype = { contentType: upLoadedPhoto.mimetype, name: upLoadedPhoto.filename };
           const snapshot= await uploadBytes(imageRef, upLoadedPhoto.buffer, metatype)
           const rt=await getDownloadURL(snapshot.ref)         


            const result = await User.findByIdAndUpdate(id, { avatar_url: rt })
            res.json(result)
        } catch (error) {
            console.log(error)
            next(error)
        }
    })
}
)

module.exports=router;