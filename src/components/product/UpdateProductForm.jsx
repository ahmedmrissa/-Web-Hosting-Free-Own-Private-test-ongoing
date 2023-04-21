
import React from 'react'
import { useRef, useEffect } from 'react'
import { useParams,useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from '../../api/common-http'
function UpdateProductForm() {
  const { id } = useParams()
  const label = useRef();
  const brand = useRef();
  const category = useRef();
  const price = useRef();
  const form = useRef();
  const navigate=useNavigate();

  useEffect(() => {
    const getProductById = async (id) => {
      await axios.get(`/product/${id}`)
        .then( response =>response.data )
        .then(data => data.payload)
        .then(products => {

          label.current.value = products[0].label;
          brand.current.value = products[0].brand;
          category.current.value = products[0].category;
          price.current.value = products[0].price
        })
        .catch(error => console.log(error))

    }
    getProductById(id)

  }, [id])

  const updateProductHandler = async (e) => {
    e.preventDefault();
    const newProduct = {
      label: label.current.value,
      brand: brand.current.value,
      category: category.current.value,
      price: price.current.value
    }
   

    await axios.put(`/product/${id}`,newProduct)
    .then(response=>response.data)
     .then(data=>{
     if(data.status="success"){
           Swal.fire({
        title: 'Success',
        text: "Successfully Updated",
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    }else if(data.status="error"){
      Swal.fire({
        title: 'Error',
        text: "Failed to Update the Product",
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
      navigate("/products")
     })
     .catch(error=>{
      Swal.fire({
        title: 'Error',
        text: "Failed to Update the Product",
        icon: 'error',
        confirmButtonText: 'Ok'
      })
     })

  }

  return (
    <div className='container flex flex-col items-center justify-center p-2 m-4'>
    <h1 className='p-2 m-2 text-blue-700 stroke-slate-500'>Update Product</h1>
    <form 
    onSubmit={updateProductHandler} 
    ref={form}
    className="w-full max-w-lg">
      <div className="flex flex-wrap p-3 mb-6 -mx-3">
        <label 
        htmlFor="label" 
        className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">Label</label>
        <input
          ref={label}
          name="label"
          type="text"
          className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded ppearance-none focus:outline-none focus:bg-white" 
          required
          placeholder='Type here'
        />
      </div>

      <div className="flex flex-wrap p-3 mb-6 -mx-3">
        <label 
        htmlFor="brand" 
        className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">Brand</label>
        <input
          ref={brand}
          name="brand"
          type="text"
          className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded ppearance-none focus:outline-none focus:bg-white" 
          required
          placeholder='Type here'
        />
      </div>

      <div className="flex flex-wrap p-3 mb-6 -mx-3">
        <label 
        htmlFor="category" 
        className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">Category</label>
        <input
          ref={category}
          name="category"
          type="text"
          className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded ppearance-none focus:outline-none focus:bg-white" 
          required
          placeholder='Type here'
        />
      </div>

      <div className="flex flex-wrap p-3 mb-6 -mx-3">
        <label 
        htmlFor="price" 
        className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">Price</label>
        <input
          ref={price}
          name="price"
          type="Number"
          className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded ppearance-none focus:outline-none focus:bg-white" 
          required
          placeholder='Type here'
        />
      </div>
     
      {/* <pre><code>{JSON.stringify(car,undefined,3)}</code></pre> */}
      <button
        type="submit"
        className="self-center w-1/2 p-2 m-2 text-blue-300 bg-blue-800 rounded-md shadow-md hover:bg-blue-400"
      >Update Product</button>
    </form>
  </div>
  )
}

export default UpdateProductForm

