const router=require('express').Router()
const verifyToken = require('../middlewares/authentication');
const isAdmin = require('../middlewares/isAdmin')
const orderService = require('../services/order.service')



router.post('/add',verifyToken,async (req,res)=>{
    const userId = req.user.user_id
    const {details}=req.body;
    try {
        const result = await orderService.order(new Date(),userId,details)
        res.json({message:"Order added successfully",data:result})
    } catch (error) {
        res.json({error:error.message})
    }
})
router.put('/:id/approve',verifyToken,isAdmin,async (req,res)=>{
    const id=req.params.id;
    
    try {
        const result = await orderService.approveAnOrder(id)
        res.json({message:"Order Approved",data:result})
    } catch (error) {
        res.json({error:error.message})
    }
})
router.put('/:id/cancel',verifyToken,isAdmin,async (req,res)=>{
    const id=req.params.id;
    
    try {
        const result = await orderService.cancelAnOrder(id)
        res.json({message:"Order Canceled",data:result})
    } catch (error) {
        res.json({error:error.message})
    }
})

router.get('/all',verifyToken,isAdmin,async (req,res)=>{
    try {
       
               
        const result = await orderService.getAllOrders()
        res.json({message:"All Orders",data:result})
    } catch (error) {
        res.json({error:error.message})
    }
})

router.get('/my-orders',verifyToken,async (req,res)=>{
    const userId=req.user.user_id

    try {
        const result = await orderService.getMyOrders(userId)
        res.json({message:"Your Orders",data:result})
    } catch (error) {
        res.json({error:error.message})
    }
})




module.exports=router;