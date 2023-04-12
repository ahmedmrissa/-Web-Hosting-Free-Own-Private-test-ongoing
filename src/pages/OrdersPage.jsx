
import OrderAdminList from '../components/product/OrderAdminList'
import OrderUserList from '../components/product/OrderUserList';
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../hooks/useAuth";
import axios from './../api/common-http'





function OrdersPage() {
    const {user,isAuthenticated}=useAuth()
    const token = useRef()
    const role = useRef()
    
    
    const [allOrders, setallOrders] = useState([])
    const [myOrders, setMyOrders] = useState([]) 
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const [approveOrders, setApproveOrders] = useState(false)
   
useEffect(() => {
    
  
    isAuthenticated()
},[approveOrders])
const approveOrder=async (id)=>{
    
  await fetch(`https://myfirstweb-udeq.onrender.com/order/${id}/approve`, {method:"Put",headers: {
    'Content-Type': 'application/json',
    'x-access-token': token.current
}})
.then(data=>data.json())
.then(json=>{
 if(json.Error){
   Swal.fire({
     title: 'Error!',
     text: json.Error,
     icon: 'error',
     confirmButtonText: 'Ok'
   })
 }else{
   Swal.fire({
     title: 'Valided Order',
     text: 'Order Valided succesfully',
     icon: 'success',
     confirmButtonText: 'Ok'
   })
   setApproveOrders(prev=>!prev);

 }
})
}
 const cancelOrder=async (id)=>{
    
  await fetch(`https://myfirstweb-udeq.onrender.com/order/${id}/cancel`, {method:"Put",headers: {
    'Content-Type': 'application/json',
    'x-access-token': token.current
}})
  .then(data=>data.json())
  .then(json=>{
   if(json.Error){
     Swal.fire({
       title: 'Error!',
       text: json.Error,
       icon: 'error',
       confirmButtonText: 'Ok'
     })
   }else{
       Swal.fire({
         title: 'Cancel Order',
         text: 'Order Succesfully Canceled',
         icon: 'success',
         confirmButtonText: 'Ok'
       })
       setApproveOrders(prev=>!prev);

     }
   })
 }
const getAllOrders = async () => { 
   
        if((user !== null && user.role==="Admin" && token.current===undefined)||approveOrders===true){
            token.current =user.token
            role.current=user.role
          
            await axios.get('/order/all', {headers:{'x-access-token':token.current}})
            .then(response=> response.data)
            .then(data => setallOrders(data.data))

            .catch(error => {
                setError(error);
                setLoading(false);
            })
            .finally(() => {
                setLoading(false)
            })
    }

}
getAllOrders()

const getMyOrders = async () => { 
    if (user !== null && token.current===undefined){ 
         token.current =user.token
         role.current=user.role
        
         await axios.get('/order/my-orders',{headers:{'x-access-token':token.current}})
        .then(response=> response.data)
        .then(data => setMyOrders(data.data))

        .catch(error => {
            setError(error);
            setLoading(false);
        })
        .finally(() => {
            setLoading(false)
        })
    }
    
}
getMyOrders()
if(role.current!=="Admin" && role.current!=="User" ){
    return( <div>
        <h2 className='text-center text-blue-700'> Please Register to benefit</h2>
    
       
       </div>
       )  
}

if(role.current==="Admin"){
   return( <div>
    <h2 className='text-center text-blue-700'>{role.current} This is All Orders</h2>

   <OrderAdminList allOrders={allOrders} cancelOrder={cancelOrder} approveOrder={approveOrder}/> 
   </div>
   )
}  

else{
    return (
        
         

        <div>
            <h2 className='text-center text-blue-700'>{myOrders.map(p=>{return (<div><h1 key={p._id}> {p.user.fullName}</h1></div>)})[0]} This is Your Orders</h2>

            <OrderUserList myOrders={myOrders} />
        </div>)

    
}
}

export default OrdersPage

