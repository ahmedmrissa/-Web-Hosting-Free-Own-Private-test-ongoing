import React from 'react'
import { useState,useEffect } from 'react';
import ProductCard from '../components/product/ProductCard';
import useGetProduct from '../hooks/useProducts';




function Home() {
  
 const { products } = useGetProduct()
 




  const [prod, setProd] = useState([]);
  const [search, setSearch] = useState(null);
  const [selection, setSelection] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const [selectionPrice, setSelectionPrice] = useState(null)
  
  useEffect(() => {
   
   const SelectProduct = ()=>{
      let tmp= [...products];
      
     
      
      tmp=tmp.filter(t=>t.category===selection)
      
     setProd(tmp)
     
    }
    const priceSelect=async ()=>{
      let tmp= [...products];
      if(selectionPrice==='LowHigh'){
        tmp=tmp.sort((a, b) => a.price - b.price);
       
     
        
     
      
     setProd(tmp)
    }
    else{
      tmp=tmp.sort((a, b) =>   b.price - a.price);
       
     console.log(tmp)
        
     
      
     setProd(tmp) 
    }
    }
    if(selection){
    SelectProduct()
    }
    if(selectionPrice){
    priceSelect()
     
    }
    
    
  }, [selection,refresh,selectionPrice])


  const searchProduct=async ()=>{
    let tmp= [...products];
      
     
      
    tmp=tmp.filter(t=>t.category===search||t.label===search ||t.brand===search || t.price===Number(search))
    
   setProd(tmp)
   
  }
  
  if(selection===null && selectionPrice===null&& search===null){  
    return (
      
      <>
      
        <div >
          <div className='flex flex-row'>
          <div className='w-1/2 p-1 m-1 font-mono text-gray-800 rounded-md border-spacing-2 '>
            
        <select className='w-1/2 p-1 m-1 font-mono text-gray-800 rounded-md border-spacing-2 ' value={selection}
           onChange={(e) => {
            
            
            setSelection(e.target.value);
          }
          }>
            <option value="Smart Phone" >Smart Phone</option>
            <option value="Phone" >Phone</option>
            <option value="Tablet" >Tablet</option>
            <option value="Laptop" >Laptop</option>
        </select>
     </div>
     <div className='w-1/2 p-1 m-1 font-mono text-gray-800 rounded-md border-spacing-2 '>
        <select className='w-1/2 p-1 m-1 font-mono text-gray-800 rounded-md border-spacing-2 ' value={selectionPrice}
           onChange={(e) => {
            
            
            setSelectionPrice(e.target.value);
          }
          }>
             <option value="LowHigh" >Show me from Low to High  Price</option>
                <option value="HighLow" >Show me from High to Low Price</option>
           
        </select>
        </div>
        
  
  <form>   
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative">
          <div className="absolute inset-y-3 right-1/2  flex items-center pl-3  pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5   text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          
          <input type="search" id="default-search"  value={search}
     
          onChange={(e) => {
            setSearch( e.target.value)
           
          }
        } className="block  w-full p-2 pl-10 text-xl text-blue-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="      Search..." required />
          
          <button type="button" onClick={() => {
      
                        searchProduct()
                      }} className="text-white absolute right-2.5 bottom-1 bg-blue-700 hover:bg-blue-800  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
      </div>
  </form>
  
  
  </div>  
        
       
         
                       </div>           
      
      
      
      <div className='flex flex-wrap self-center justify-center flex-grow gap-2 p-2 m-1 md:flex-row sm:flex-col'>
        
       
          {             
       
          products.map(product=>(
            <ProductCard key={product._id} 
            id={product._id}
            label={product.label} 
            brand={product.brand}
            category={product.category}
            price={product.price}
            photo_url={product.photo_url || 'https://guide-images.cdn.ifixit.com/igi/o4OjCNmNeOhvsS1P.standard'}
          />))}
          </div>
      </>)}
      else{
        return (
      
          <>
          
            <div >
              <div className='flex flex-row'>
              <div className='w-1/2 p-1 m-1 font-mono text-gray-800 rounded-md border-spacing-2 '>
                
            <select className='w-1/2 p-1 m-1 font-mono text-gray-800 rounded-md border-spacing-2 ' value={selection}
               onChange={(e) => {
                
                
                setSelection(e.target.value);
              }
              }>
                <option value="Smart Phone" >Smart Phone</option>
                <option value="Phone" >Phone</option>
                <option value="Tablet" >Tablet</option>
                <option value="Laptop" >Laptop</option>
            </select>
         </div>
         <div className='w-1/2 p-1 m-1 font-mono text-gray-800 rounded-md border-spacing-2 '>
            <select className='w-1/2 p-1 m-1 font-mono text-gray-800 rounded-md border-spacing-2 ' value={selectionPrice}
               onChange={(e) => {
                
                
                setSelectionPrice(e.target.value);
              }
              }>
                <option value="LowHigh" >Show me from Low to High  Price</option>
                <option value="HighLow" >Show me from High to Low Price</option>
                
               
            </select>
            </div>
            
      
      <form>   
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
              <div className="absolute inset-y-3 right-1/2  flex items-center pl-3  pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5   text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              
              <input type="search" id="default-search"  value={search}
         
              onChange={(e) => {
                setSearch( e.target.value)
               
              }
            } className="block  w-full p-2 pl-10 text-xl text-blue-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="      Search..." required />
              
              <button type="button" onClick={() => {
          
                            searchProduct()
                          }} className="text-white absolute right-2.5 bottom-1 bg-blue-700 hover:bg-blue-800  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
      </form>
      
      
      </div>  
            
           
             
                           </div>           
          
          
          
          <div className='flex flex-wrap self-center justify-center flex-grow gap-2 p-2 m-1 md:flex-row sm:flex-col'>
            
         
              {             
          
              prod.map(product=>(
                <ProductCard key={product._id} 
                id={product._id}
                label={product.label} 
                brand={product.brand}
                category={product.category}
                price={product.price}
                photo_url={product.photo_url || 'https://guide-images.cdn.ifixit.com/igi/o4OjCNmNeOhvsS1P.standard'}
              />))}
              </div>
          </>)}
        
    }
  


export default Home

