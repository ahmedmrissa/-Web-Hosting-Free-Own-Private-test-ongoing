import React from 'react';
import { useEffect, useState } from 'react'
import ProductList from '../components/product/ProductList';
import {useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";
import axios from './../api/common-http'
function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [prod, setProd] = useState([]);
  const [removeProduct,setRemoveProduct]=useState(false)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [paginationInfo, setPaginationInfo] = useState({ next: null, previous: null })
  const [limitChoice, setLimitChoice] = useState(5)
  const [selection, setSelection] = useState("")
 
  const navigate = useNavigate()
  useEffect(() => {
    const SelectProduct = ()=>{
      let tmp= [...products];
      
     
      
      tmp=tmp.filter(t=>t.category===selection)
      
     setProd(tmp)
     
    }
    
    
    SelectProduct()
  }, [selection])

  const deleteProduct=async (id)=>{
    await axios.delete(`/product/${id}`)
    .then(response=>response.data)
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
          title: 'Delete Product',
          text: 'Product deleted succesfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        setRemoveProduct(prev=>!prev);

      }
    })
  }

  useEffect(() => {
    const getProducts = async () => {
      await axios.get(`/product/all?page=${page}&limit=${limit}`)
        .then(response => response.data)
        .then(data => data.data)
        .then(products => setProducts([...products]))
        .catch(error => console.log(error.message))

    }
    getProducts()
  }, [limit,page,limitChoice,removeProduct])
  return (
    
    <div className="container fluid">
    <nav className="nav nav-bar inline-flex">
      <button className="nav-item  bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
        disabled={paginationInfo.previous === undefined}
        onClick={() => {
          setPage(prev => prev - 1)
         
          setSelection("")
        }}
      >Prev
      </button>
      <button className="nav-item bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold  py-2 px-4 rounded-r"
        disabled={!paginationInfo?.next}
        onClick={() => {
          setPage(prev => prev + 1)
         setSelection("")
        }}
      >Next
      </button>
      
      <select
        name="limit"
        className='w-1/2 p-1 m-1 font-mono text-gray-800  text-center rounded-md border-spacing-2 p-2 m-3'
        value={limitChoice}
        onChange={(e) => {
          console.log(parseInt(e.target.value))
          setLimitChoice(parseInt(e.target.value));
          setLimit(parseInt(e.target.value))
        }
        }>
        <option value={5}>5</option>
        <option value={7}>7</option>
        <option value={10}>10</option>
      </select>
    </nav>
    <hr />
    <div>
      <h1 className='text-center text-blue-700'>All Products</h1>
      <div className='flex flex-row p-2 m-2'>
        <button 
        className='w-1/4 p-1 m-1 text-blue-200 bg-blue-700 rounded-md hover:bg-blue-300'
        onClick={()=>{
         navigate('/product/add')
        }}
        >
          Add Product
        </button>
        <select className='w-1/2 p-1 m-1 font-mono text-gray-800 rounded-md border-spacing-2 ' value={selection}
         onChange={(e) => {
          
          
          setSelection(e.target.value);
        }
        }>
          <option value="Smart Phone" >Smart Phone</option>
          <option value="Tablet" >Tablet</option>
      </select>
      </div>
      
      {selection===""  ?  <ProductList products={products} setRemoveProduct={setRemoveProduct} deleteProduct={deleteProduct}/>:
         ( 
     <ProductList products={prod} deleteProduct={deleteProduct}/>)
         }
   
    </div>
    </div>
  )
}

export default ProductsPage

