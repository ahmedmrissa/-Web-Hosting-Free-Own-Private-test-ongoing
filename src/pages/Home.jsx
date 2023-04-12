import React from 'react'

import ProductCard from '../components/product/ProductCard';
import useGetProduct from '../hooks/useProducts';


function Home() {
 const { products } = useGetProduct()

if( !products || !products.length )
{
  return (<div><h1>Welcome</h1></div>)
}
else{
  return (
    
    
      
    
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
        />))
      }
      
    </div>
  
  )
    }
}

export default Home

