import React, { useEffect } from 'react'
import getPhotoUrl from '../../utils/getPhotoUrl';
import { useCart } from '../../hooks/cartContext';


function ProductCard(props) {
  const { id,label, brand, category, price, photo_url } = props;

  const {
    getQuantityById,
    addOneToCart,
    removeOneFromCart,
    removeFromCart } = useCart()
    
  return (
    <>

      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">

        <img className="rounded-t-lg w-50" src={getPhotoUrl(photo_url)} alt="product" />

        <div className="p-5">
        <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{brand}</h3>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{label}</h5>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{category}</p>
          <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {price.toFixed(3)}
           
          </p>
        </div>
        {
          
             getQuantityById(id) === 0   ?
                (<>
                  <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => {
                    addOneToCart(id)
                  }}>Add To Cart</button>
                </>)
                :
                
              (<>
              
              <div className='flex flex-row '>
                <div >
                    <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      onClick={() => {
                        addOneToCart(id)
                      }}> + </button>
                      </div>
                      <div>
                    <h6 className="mb-2 p-4 text-2xl py-2 px-4 font-bold tracking-tight text-gray-900 dark:text-white">{getQuantityById(id)} </h6>
                    </div>
                    <div>
                    <button className="bg-transparent hover:bg-blue-500 text-blue-700 p4 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      onClick={() => {
                        removeOneFromCart(id)
                      }}> - </button>
                  </div>
                  </div>
                  <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white p-4 py-2 px-4 border border-red-500 hover:border-transparent rounded" onClick={() => (
                     removeFromCart(id)
                  )}>Clear</button>
                  
               </>
            )
          }
      </div>

    </>
  )
}

export default ProductCard;

