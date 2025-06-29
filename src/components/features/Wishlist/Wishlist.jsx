import { useContext, useEffect } from "react"
import { wishlistContext } from "../../Context/WishlistContext"
import Spinner from "../../ui/Spinner/Spinner"
import WishlistItem from "./WishlistItem"

function Wishlist(){

    const {wishlist,loading,getWishlist,wish_loading}=useContext(wishlistContext)

    useEffect(() => {getWishlist()},[getWishlist])
    return(
        <section className="container">
            {wish_loading && <Spinner />}
            wish_loading
            <div>
                <h2 className="fw-semi-bold border-bottom pb-2 mb-4">My WishList</h2>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-2">
               {wishlist?.data?.data?.map((product) => {
                return (
                    <div className="col flex-grow" key={product._id}>
                        <WishlistItem product={product}/>
                    </div>
                    
                )
               })}
            </div>
        </section>
    )
}

export default Wishlist