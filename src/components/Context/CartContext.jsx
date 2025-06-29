import { createContext, useCallback, useContext, useEffect,useState } from "react";
import { userContext } from "./UserContext";
import axios from "axios";

export const cartContext=createContext()

const BASE_URL='https://ecommerce.routemisr.com/api/v1/cart'

function CartProvider({children}){
    const [cart,setCart]=useState([])
    const {user}=useContext(userContext)
    const [loading,setLoading]=useState()
    const [orders,setOrders]=useState(null)
    const [cartOwnerId, setCartOwnerId] = useState(null);
    console.log("user: ",user)


    const getOrders=useCallback(async () => {
        try{
            if(!cartOwnerId){
                await getUserCart()
            }
            setLoading(true)
            const res=await axios(
                `https://ecommerce.routemisr.com/api/v1/orders/user/${localStorage.getItem('cartOwnerId')}`,
                { headers: { token: user?.token || user|| localStorage.getItem('userToken') }}
                
            )
            setOrders(res)
            console.log("orders : ",res)
        }
        catch (error){
            return error
        }
        finally{
            setLoading(false)
        }
    },[user?.token,cartOwnerId]);
    
    
    async function addToCart(productId){
        try{
            setLoading(true)
            const res=await axios.post(BASE_URL,{productId}, { headers: { token: user?.token || user ||localStorage.getItem('userToken')} })
            console.log(res)
            await getUserCart();
        }catch(error){
            return error
        }
        finally{
            setLoading(false)
        }
    }

    async function removeFromCart(productId){
        try{
            const res = await axios.delete(`${BASE_URL}/${productId}`, {
            headers: { token: user?.token || user || localStorage.getItem('userToken') }
            });            console.log(res)
            await getUserCart();
        }catch(error){
            return error
        }
    }

    async function changeQuantity(productId,count){
        
        try{
            setLoading(true)
           const res=await axios.put(`${BASE_URL}/${productId}`,
            {count},
            { headers: { token: user?.token || user|| localStorage.getItem('userToken') }
        })
        setCart(res)
        console.log('change quainity response : ',res)
        await getUserCart()
            
        }catch(error){
            return error
        }
        finally{
            setLoading(false)
        }
    }

    async function checkout(formData){
        try{
        setLoading(true)
        console.log("cartowner : ",cart?.data?.data?.cartOwner)
        const res=await axios.post(
            `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart?.data?.data?._id}?url=http://localhost:5173`,
            {shippingAddress:formData},
            { headers: { token: user?.token || user|| localStorage.getItem('userToken') }}
            
        )
         console.log("checkout response : ",res)
         if (res.statusText=="OK") window.location.replace(res.data.session.url);
        }
        catch (error){
            return error
        }
        finally{
            setLoading(false)
        }

    }

    async function clearCart(){
        try{
            setLoading(true)
            await axios.delete(`${BASE_URL}`,{ headers: { token: user?.token || user|| localStorage.getItem('userToken') }})  
            setCart(null)
            await getUserCart();
            
        }catch(error){
            return error
        }
        finally{
            setLoading(false)
        }
        
    }

   
    const getUserCart=useCallback(
        async function getUserCart(){
        try{
            setLoading(true)
            const res=await axios(BASE_URL,{ headers: { token: user?.token || user|| localStorage.getItem('userToken') }})
            console.log('get cart data c : ',res)
            setCart(res)

            const ownerId = res?.data?.data?.cartOwner;
            if (ownerId) {
            setCartOwnerId(ownerId);
            localStorage.setItem('cartOwnerId', ownerId);
            }
            console.log('cart data : ',res)
            setLoading(false)
        }
        catch(error){
            console.log(error)
        }
       
    },[user?.token || user|| localStorage.getItem('userToken')])
    useEffect(() => {
    (async () => {
        await getUserCart();
    })();
}, [getUserCart]);
    return(
        <cartContext.Provider value={{addToCart,removeFromCart,getUserCart,clearCart,changeQuantity,checkout,orders,getOrders,cart,loading}}>
            {children}
        </cartContext.Provider>

    )
}

export default CartProvider