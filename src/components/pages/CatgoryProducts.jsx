import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { categoryContext } from "../Context/CategoryContext";
import { cartContext } from "../Context/CartContext";
import { wishlistContext } from "../Context/WishlistContext";
import Spinner from "../ui/Spinner/Spinner";
import styles from '../features/Products/ProductsList.module.css'
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaHeartCirclePlus } from "react-icons/fa6";
import Button from "../ui/Button/Button";


function CatgegoryProducts(){

    const {categoryId}=useParams()
    const {catProducts,get_category_products,cat_loading}=useContext(categoryContext)

    const {addToCart,removeFromCart,changeQuantity,loading}=useContext(cartContext)
    const {add_to_wishlist}=useContext(wishlistContext)
    async function handleAddToCart(e,proudctId){
        e.preventDefault();
        console.log(proudctId)
        const res=await addToCart(proudctId)
        console.log(res)
    }

    async function handleAddToWish(e,proudctId){
        e.preventDefault();
        console.log(proudctId)
        const res=await add_to_wishlist(proudctId)
        console.log(res)}
    
    useEffect(() => {
        get_category_products(categoryId)
    },[get_category_products])
    return(
        <div className="container">
        <Button type="link" to="/" myStyles={{position: "fixed",top: "100px",right: "20px",zIndex: 1000}}>Back</Button>
        {loading && <Spinner />}
        <ul className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 list-unstyled g-4 mt-2">
                {catProducts?.data?.data.map((product) =>{
                    return(
                        <>
                        <li key={product.id} className={`${styles.products} mb-3 col`}>
                           <div>
                                <Link to={`/products/${product.id}`}>
                                 <div className={`mb-3 ${styles.productImg}`}>
                                    <img src={product.images[0]} alt={product.title} className="objectFitCover"/>
                                    </div>
                                    <small className="main-color">{product.subcategory[0].name}</small>
                                    <h5 className="mb-3">
                                        {product.title.split(' ').length >4 ?`${product.title.split(' ').slice(0,4).join(' ')}...` :product.title}
                                    </h5>
                                    <div className="d-flex justify-content-between align-items-center mt-auto">
                                    <p className="mb-0 " style={{fontWeight:'500'}}>{product.price} EGP</p>
                                    <span>{product.ratingsAverage}⭐</span>
                                </div>
                                <div className={styles.buttons}>
                                    <div className={styles.addToCart} onClick={(e) => handleAddToCart(e,product.id)}>
                                        <button><IoIosAddCircleOutline className="fs-large"/></button>
                                        <small><span>Add To Cart</span></small>
                                    </div>
                                    <div className={styles.addToWish} onClick={(e) => handleAddToWish(e,product.id)}>
                                        <button><FaHeartCirclePlus /></button>
                                        <small><span>Add To Wishlist</span></small>
                                    </div> 
                                </div>
                                </Link>
                           </div>
                        </li>
                        </>
                    )
                   
                })}
            </ul>
            </div>
    )
}

export default CatgegoryProducts