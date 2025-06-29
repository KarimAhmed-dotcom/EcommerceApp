import { createContext, useCallback, useState } from "react";
import axios from "axios";
import { userContext } from "./UserContext";
import { useContext } from "react";

export const wishlistContext=createContext()

function WishlistProvider({children}){

    const [wishlist,setWishlist]=useState(null)
    const [wish_loading,setLoading]=useState(false)
    const BASE_URL='https://ecommerce.routemisr.com/api/v1/wishlist'
    const {user}=useContext(userContext)

    const getWishlist=useCallback(async () => {
        try{
            setLoading(true)
            const res=await axios(BASE_URL, { headers: { token: user?.token || user ||localStorage.getItem('userToken')} })
            console.log(res)
            setWishlist(res)
        }catch(error){
            return error
        }
        finally{
            setLoading(false)
        }
    },[user?.token ])

    // add to wishlist
    async function add_to_wishlist(product_id){
        try{
            setLoading(true)
            const res=await axios.post(BASE_URL, {"productId":product_id},{ headers: { token: user?.token || user ||localStorage.getItem('userToken')} }
        
        )
            console.log(res)
        }catch(error){
            return error
        }
        finally{
            setLoading(false)
        }
    }
    async function remove_from_wishlist(product_id){
        try{
            setLoading(true)
            const res=await axios.delete(`${BASE_URL}/${product_id}`,{ headers: { token: user?.token || user ||localStorage.getItem('userToken')} }
            
        )
            console.log(res)
            getWishlist()
        }catch(error){
            return error
        }
        finally{
            setLoading(false)
        }
    }

    return (

        <wishlistContext.Provider value={{wishlist,setWishlist,getWishlist,wish_loading,setLoading,add_to_wishlist,remove_from_wishlist}}>
        {children}
        </wishlistContext.Provider>
    )
   
}

export default WishlistProvider