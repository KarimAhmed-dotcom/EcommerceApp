import { FiTrash } from 'react-icons/fi'
import styles from './Cart.module.css'
import { IoMdAddCircle, IoMdRemoveCircle } from 'react-icons/io'
import Button from '../../ui/Button/Button'
import { useContext } from 'react'
import { cartContext } from '../../Context/CartContext'


function CartItem({cartItem}){
    const {removeFromCart,changeQuantity}=useContext(cartContext)
    async function handleDelete(){
        const itemId=cartItem.product._id
        console.log("pid : ",itemId)
        await removeFromCart(itemId)
    }
    
    return(
        <>
        {cartItem &&
        <li className='row border-bottom border-1 py-2 '>
                <div className='col col-10'>
                    <div className='d-flex gap-3 overflow-hidden' >
                         <div className={styles.img}>
                        <img src={cartItem?.product?.imageCover} className='img-fluid'/>
                        </div>
                        <div className={`${styles.text} d-flex flex-column`}>
                            <h3 className='h4 '>{cartItem?.product?.title}</h3>
                            <p><span className='fw-semibold'>price : {cartItem?.price} EGP</span></p>
                            <button className='btn btn-danger mt-auto me-auto'
                            onClick={handleDelete}
                            ><FiTrash /> Remove</button>
                        </div>
                    </div>
                   
                </div>
                <div className='col col-2 d-flex align-items-center justify-content-sm-end mt-3'>
                    <div className={`${styles.quantity} d-flex justify-content-evenly align-items-center flex-column flex-sm-row gap-1 gap-sm-3`}>
                        <Button myStyles={{"--color":"var(--main-color)","--background-color":"#fff",
                            width:'40px',height:'40px',padding:'0',flexShrink:'0'}}
                            myClasses='d-flex justify-content-center align-items-center'
                            handleClick={() => changeQuantity(cartItem.product._id,cartItem.count -1)}
                             >
                            <IoMdRemoveCircle /></Button>
                        <span className='fs-4'>{cartItem.count}</span>
                        <Button myStyles={{"--color":"var(--main-color)","--background-color":"#fff",
                            width:'40px',height:'40px',padding:'0',flexShrink:'0'}} 
                            myClasses='d-flex justify-content-center align-items-center'
                            handleClick={() => changeQuantity(cartItem.product._id,cartItem.count +1)} 
                            >
                            <IoMdAddCircle /></Button>

                    </div>
                </div>
        </li>}</>

    )
}

export default CartItem