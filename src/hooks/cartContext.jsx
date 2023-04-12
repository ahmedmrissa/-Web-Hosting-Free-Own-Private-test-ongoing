import {createContext,useContext,useState} from 'react'


export const cartContext=createContext({
    items:[],
    addOneToCart:()=>{},
    removeOneFromCart:()=>{},
    getQuantityById:()=>{},
    removeFromCart:()=>{},
    getTotalQuantity:()=>{}
})

export const CartProvider = ({children})=>{
    const [items,setItems] = useState([])

    function addOneToCart(id){
        const quantity = getQuantityById(id);

        if(quantity===0){
            setItems([...items,{id:id,quantity:1}])
        }else{
            setItems(items.map(item=>{
                if(item.id===id){
                    return ({id,quantity:item.quantity+1})
                }else{
                    return item
                }
            }))
        }
    }

    function removeOneFromCart(id){
        const quantity = getQuantityById(id);

        if(quantity===1){
            removeFromCart(id)
        }else{
            setItems(items.map(item=>{
                if(item.id===id){
                    return ({id,quantity:item.quantity-1})
                }else{
                    return item
                }
            }))
        }

    }
    function getQuantityById(id){
        const quantity = items.find(item=>item.id === id)?.quantity
        if(quantity === undefined){
            return 0;
        }
        return quantity;
    }

    function removeFromCart(id){
        setItems(items.filter(item=>item.id !== id))
    }

    function getTotalQuantity(){
        const totalQuantity = items.reduce(
            (sum,item)=>sum+item.quantity,0
        )
        return totalQuantity;
    }

    const cartContextValue = {
        items:items,
        addOneToCart,
        removeOneFromCart,
        getQuantityById,
        removeFromCart,
        getTotalQuantity
    }

    return(
        <cartContext.Provider value={cartContextValue}>
            {children}
        </cartContext.Provider>
    )
}

export const useCart = ()=>useContext(cartContext)
