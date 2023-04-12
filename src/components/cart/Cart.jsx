import React, { useEffect, useState } from 'react'
import { useCart } from '../../hooks/cartContext'
import useGetProduct from '../../hooks/useProducts';
import CartItem from './CartItem';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from '../../api/common-http'
function Cart() {
    const { user } = useAuth()
    const cart = useCart()
    const navigate=useNavigate()
   
    const { products,error, isLoading } = useGetProduct();

    
   
    const  ValidOrder = async()=>{
        if(!user)
        {
            
            Swal.fire({
                title: 'You are not a User',
                text: 'Please Login to Benefit',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
              setTimeout(() => {
                navigate('/login')
              window.location.reload(false);
              }, "1000")
              
              
              
              
        }
        else{
        
        const response = await axios.post('/order/add',{details:cart.items.map(t=>{
            return {product:t.id,qte:t.quantity}})},{headers:{'x-access-token':user.token}}
                
        );
        const json=await response.data;
        if(json.status==="Error"){
            
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
                
         
              }
    navigate('/')
    window.location.reload(false);
            }
    }
    
    const productsCount = cart.items.reduce((sum, p) => sum + p.quantity, 0);

    function getProductData(id) {
        return products.find(product => product._id === id);
    }

    const totalCost = cart.items.reduce((sum, currentProduct) => sum + getProductData(currentProduct.id)?.price, 0);


    if(isLoading){
        return <h1>Il Loading ...</h1>
    }

    if(error){
        return <h1>Error</h1>
    }

    return (
        
        <div className="flex justify-center w-full">
            <div className="max-w-xl text-center bg-white rounded-lg shadow-lg">
                <div className="px-6 py-3 border-b border-gray-300">
                    Shopping Cart
                </div>
                <div className="flex flex-col w-auto p-2 m-1">
                    {
                        productsCount > 0 ?
                            (<>
                                <p className='text-gray-700'>Items in your cart:</p>
                                {
                                    cart.items.map(currentProduct => {
                                        return (<CartItem key={currentProduct.id} id={currentProduct.id} quantity={currentProduct.quantity} />)
                                    })
                                }
                                <h1>Total Cost : {totalCost.toFixed(3)}</h1>
                                <button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white 
                    font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 
                    hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                    active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={()=>{ValidOrder()}}
                    >
                        
                                    Order Now !
                                </button>
                            </>)
                            :
                            (<>
                                <h1 className='text-gray-700'>There are no items in your cart!</h1>
                            </>)

                    }
                </div>
                <div className="px-6 py-3 text-gray-600 border-t border-gray-300">
                    Cart ({productsCount}) items
                </div>
            </div>
        </div>
    )
    
}

export default Cart
