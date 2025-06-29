import { useContext } from "react"
import { Link } from "react-router-dom"
import { wishlistContext } from "../../Context/WishlistContext"

function WishlistItem({product}){

    const {remove_from_wishlist}=useContext(wishlistContext)

    async function handleRemove(e,product_id){
        e.preventDefault()
        const res=await remove_from_wishlist(product_id)
        console.log(res)
    }
    return(
        
        <div className="d-flex flex-column gap-1 h-100">
            <div className="position-relative">
                <img src={product.imageCover} className="img-fluid"/>
                {product.title.split(" ").length >5 
                ? `${product.title.split(" ").slice(0,5).join(" ")}...`
                :product.title}
                <p>Price : {product.price} EGP</p>
                <Link className="stretched-link" to={`/products/${product._id}`}></Link>
            </div>
            
            <div className="mt-auto">
                <button className="btn btn-danger w-100" onClick={(e) => {handleRemove(e,product._id)}}>Remove</button>
            </div>
        </div>    

        

    )
}

export default WishlistItem