import axios from "axios";
import { createContext, useCallback, useState } from "react";

export const categoryContext=createContext()


function CategoryProvide({children}){
    const [cat_loading,setLoading]=useState(false)
    const [categories, setCategories] = useState([])
    const [catProducts,setCatProducst]=useState()
    const BASE_URL='https://ecommerce.routemisr.com/api/v1/categories'
    const get_all_catgories =useCallback(async() => {
         try{
            setLoading(true) 
            const res=await axios(BASE_URL)
            console.log(res)
            setCategories(res)
        }
        catch(error){
            return error
        }
        finally{
            setLoading(false) 
        }
    },[])

    const get_category_products = useCallback(async (categoryId) => {
        try {
            setLoading(true);
            const res = await axios(
            `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`
            );
            setCatProducst(res); 
            console.log(res)
        } catch (error) {
            return error;
        } finally {
            setLoading(false);
        }
        }, []);
    

    return(

        <>
            <categoryContext.Provider value={{get_all_catgories,get_category_products,categories,cat_loading,catProducts}}>
                {children}
            </categoryContext.Provider>
        
        </>
    )
}

export default CategoryProvide