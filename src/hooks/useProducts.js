import { useEffect, useState } from "react";
import axios from './../api/common-http'

function useGetProduct() {
    const [products, setProducts] = useState([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)

    async function getAllProducts() {
        axios.get('/product/all')
            .then(response =>response.data)
            .then(data => setProducts(data.data))
            
            .catch(error => {
                setError(error);
                setLoading(false);
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(()=>{
            getAllProducts()
    },[])
  

    return {products,error,loading}
}

export default useGetProduct;