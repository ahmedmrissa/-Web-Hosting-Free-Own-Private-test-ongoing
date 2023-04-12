import React from 'react'
import { useState } from 'react'
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import axios from '../../api/common-http'
function AddProductForm() {
  const [product,setProduct] = useState({
    label:"",
    brand:"",
    category:"",
    price:0
  })

  const navigate=useNavigate()

  const postNewProductHandler=async ()=>{
    await axios.post('/product/add',product)
    .then(response => response.data)
  
    .then(data=>{
      if(data.Error){
        Swal.fire({
          title: 'Error!',
          text: data.Error,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }else{
        Swal.fire({
          title: 'Add Product',
          text: 'Product Added Successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        navigate('/products')

      }
    })
    .catch(error=>console.log(error))
  }

  return (
    <div className='container flex flex-col items-center justify-center p-6 m-4 rounded-md shadow-md'>
      <h1 className='p-2 m-2 text-blue-700 stroke-slate-500'>Add New Product</h1>
      <form className='w-full max-w-lg'>
        <div className="flex flex-wrap p-3 mb-6 -mx-3">
          <label htmlFor="label" className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">Label</label>
          <input 
            type="text" 
            className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded ppearance-none focus:outline-none focus:bg-white" 
            required
            value={product.label}
            onChange={(event)=>{
              setProduct({...product,label:event.target.value})
            }}
            />
        </div>

        <div className="flex flex-wrap p-3 mb-6 -mx-3">
          <label htmlFor="brand" className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">Brand</label>
          <input 
            type="text" 
            className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded ppearance-none focus:outline-none focus:bg-white" 
            required
            value={product.brand}
            onChange={(event)=>{
              setProduct({...product,brand:event.target.value})
            }}
            />
        </div>

        <div className="flex flex-wrap p-3 mb-6 -mx-3">
          <label htmlFor="category" className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">Category</label>
          <input 
            type="text" 
            className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded ppearance-none focus:outline-none focus:bg-white" 
            required
            value={product.category}
            onChange={(event)=>{
              setProduct({...product,category:event.target.value})
            }}
            />
        </div>

        <div className="flex flex-wrap p-3 mb-6 -mx-3">
          <label htmlFor="price" className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">Price</label>
          <input 
            type="Number" 
            className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded ppearance-none focus:outline-none focus:bg-white" 
            required
            value={product.price}
            onChange={(event)=>{
              setProduct({...product,price:event.target.value})
            }}
            />
        </div>

        
       
       {/* { <pre><code>{JSON.stringify(product,null,2)}</code></pre> } */}
        <button 
          type="button" 
          className="self-center w-1/2 p-2 m-2 text-blue-300 bg-blue-800 rounded-md shadow-md hover:bg-blue-400"
          onClick={()=>{
            postNewProductHandler();
          }}
          required
          >Save Product</button>
      </form>
    </div>
  )
}

export default AddProductForm;

