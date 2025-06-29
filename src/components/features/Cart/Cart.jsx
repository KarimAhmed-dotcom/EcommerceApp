import styles from './Cart.module.css'
import CartItem from './CartItem'
import { cartContext } from '../../Context/CartContext'
import { useContext, useEffect } from 'react'
import Spinner from '../../ui/Spinner/Spinner'
import Button from '../../ui/Button/Button'
import { IoBagCheckOutline } from "react-icons/io5";
import { FiTrash } from 'react-icons/fi'
import axios from 'axios'
function Cart(){
    
    const {cart,loading,getUserCart,clearCart}=useContext(cartContext)
    
    console.log(cart)
    useEffect(() => {
        (async () =>{
            
            await getUserCart()
           
        })()
    },[getUserCart])
    return(
        <>
        {loading && <Spinner />}
        <section className={`container ${styles.cart}`}>
            <h2>Shopping Cart</h2>
            <p className={styles.price}>Total Cart Price : <span>{cart?.data?.data.totalCartPrice} EGP</span></p>
            <ul className='d-flex flex-column'>
                {cart?.data?.data?.products?.map((cartProduct,i) => <CartItem cartItem={cartProduct} key={i}/>  )}
            </ul>
            {cart?.data?.numOfCartItems > 0 && 
            <div className='d-flex justify-content-between'>
                <button className='btn btn-danger' onClick={clearCart}><FiTrash />  Clear Cart</button>
                <Button type='link' to='checkout'><IoBagCheckOutline /> Checkout</Button>
            </div>}
        </section>
        </>
    )
}

export default Cart