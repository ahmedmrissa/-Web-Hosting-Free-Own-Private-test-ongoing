const router=require('express').Router();
const userService=require('../services/user.service');
const formatResponse=require('../utilities/format.response')
const authentication=require('../middlewares/authentication');

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

module.exports=router;