import React from 'react'
import { useCart } from '../../hooks/cartContext';
import useGetProducts from '../../hooks/useProducts'

function CartItem({ id, quantity }) {
    const cart = useCart();
    const { products } = useGetProducts()

    function getProductData(id) {
        return products.find(product => product._id === id);
    }

    return (
        <div className='flex w-full'>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <tbody>
                                    <tr className="transition duration-300 ease-in-out bg-white border-b hover:bg-gray-100">

                                        <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                                            {getProductData(id)?.label}
                                        </td>

                                        <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                                            {getProductData(id)?.price.toFixed(3)}
                                        </td>

                                        <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                                            {quantity}
                                        </td>

                                        <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                                            {quantity * getProductData(id)?.price.toFixed(3)}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">
                                            <button className='inline-flex items-center self-end p-3 px-3 py-2 m-4 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800' onClick={() => cart.deleteFromCart(id)}>Remove</button>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem