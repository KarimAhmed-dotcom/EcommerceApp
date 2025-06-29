import { useContext, useState,useEffect } from "react"
import ProductsList from "../../features/Products/ProductsList"
import { productsContext } from "../../Context/ProductsContext"
import Spinner from "../../ui/Spinner/Spinner"
import { wishlistContext } from "../../Context/WishlistContext"
function Products(){
    const {products,loading}=useContext(productsContext)
    console.log("products",products)
    const [filteredProducts,setFiltredProducts]=useState(products)
    console.log("filteredProducts",filteredProducts)
    const [query,setQuery]=useState()
    const {wish_loading} = useContext(wishlistContext)
    useEffect(() => {
        if (products && products.length > 0) {
            setFiltredProducts(products)
        }
    }, [products])

    function handleChange(e){
        console.log(e.target.value)
        setQuery(e.target.value)
        const data=products.filter((product) => product.title.toLowerCase().includes(e.target.value.toLowerCase()))
        setFiltredProducts(data)
    }
    return(
        
        <>
        {loading && <Spinner />}
        {wish_loading && <Spinner />}
        <form className="container mt-5 mb-5">
            <div>
                <label htmlFor='search' className='form-label visually-hidden'>search for a prodcut</label>
                <input name="search" type='search' className="form-control"
                  id="search" placeholder="search for a product" value={query} onChange={handleChange}></input>
            </div>
        </form>
        <section className="container">
            <ProductsList products={filteredProducts}/>
        </section>
        
        </>

    )
}

export default Products