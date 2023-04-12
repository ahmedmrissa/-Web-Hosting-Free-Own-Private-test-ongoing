import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/cartContext';
import getPhotoUrl from '../../utils/getPhotoUrl';
import FileUpload from '../FileUpload'


function ProductList({ products,deleteProduct ,setRemoveProduct}) {
  const navigate=useNavigate()
  
  const {
    getQuantityById,
    addOneToCart,
    removeOneFromCart,
    removeFromCart } = useCart()
  return (
    <div className="w-full">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className='"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"'>
          <tr className='p-2 m-1'>
            <th scope="col" className="px-6 py-3">#</th>
            <th scope="col" className="px-6 py-3">Upload Photo</th>
            <th scope="col" className="px-6 py-3">Photo</th>
            <th scope="col" className="px-6 py-3">Label</th>
            <th scope="col" className="px-6 py-3">Brand</th>
            <th scope="col" className="px-6 py-3">Category</th>
            <th scope="col" className="px-6 py-3">Price</th>
            <th scope="col" className="px-6 py-3">Add To Cart</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? <tr><td>No Products Found</td></tr> :
            (
              products.map((product, index) => (
                <tr key={product._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</th>
                 <td className="px-6 py-4"> <FileUpload id={product._id} setRemoveProduct={setRemoveProduct}/></td>
                 <td className="px-6 py-4">
                    <img src={getPhotoUrl(product.photo_url)} alt='cover'
                    className=' rouded  shadow-md'
                    /></td>
                  <td className="px-6 py-4">{product.label}</td>
                  <td className="px-6 py-4">{product.brand}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">{product.price.toFixed(3)}</td>
                  <td className="px-6 py-4">{
              getQuantityById(product._id) === 0 ?
                (<>
                  <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white w-20 py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => {
                    addOneToCart(product._id)
                  }}>Add To Cart</button>
                </>)
                :
              (<>
              <div className='flex flex-row '>
                <div >
                    <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      onClick={() => {
                        addOneToCart(product._id)
                      }}> + </button>
                      </div>
                      <div>
                    <h6 className="mb-2 p-4 text-2xl py-2 px-4 font-bold tracking-tight text-gray-900 dark:text-white">{getQuantityById(product._id)} </h6>
                    </div>
                    <div>
                    <button className="bg-transparent hover:bg-blue-500 text-blue-700 p4 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      onClick={() => {
                        removeOneFromCart(product._id)
                      }}> - </button>
                  </div>
                  </div>
                  <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white p-4 py-2 px-4 border border-red-500 hover:border-transparent rounded" onClick={() => (
                    removeFromCart(product._id)
                  )}>Clear</button>
                  
               </>
            )
          }</td>
                  <td className="px-6 py-4">
                    <div className='flex flex-row'>
                      <div>
                    <button
                      className='p-2 m-2 bg-red-700 rounded-md py-2 px-4 border-l shadow-md cursor-pointer text-gray-50 hover:bg-red-500'
                      onClick={(e) => { 
                        deleteProduct(product._id)
                      }}
                    >delete</button>
                    </div>
                    <div>
                    <button
                      className='p-2 m-2 bg-green-700 rounded-md  py-2 px-4 border-l shadow-md cursor-pointer text-gray-50 hover:bg-green-500'
                      onClick={() => {
                        navigate(`/product/update/${product._id}`)
                       }}
                    >update</button>
                    </div>
                    </div>
                  </td>
                </tr>)
              )
            )}
        </tbody>
      </table>


    </div>
  )
}

export default ProductList;

