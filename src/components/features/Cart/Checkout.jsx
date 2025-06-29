import styles from './Cart.module.css'
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
import { PiCityDuotone } from "react-icons/pi";
import Button from '../../ui/Button/Button';
import { FaSquareArrowUpRight } from "react-icons/fa6";
import { useContext } from 'react';
import { cartContext } from '../../Context/CartContext';
function Checkout(){
    const {checkout} =useContext(cartContext)
    async function handleSubmit(e){
        e.preventDefault()
        const data=new FormData(e.target)
        const formData=(Object.fromEntries(data))
       await checkout(formData)
      
    }   
    return(
        <form className={`container ${styles.form} d-flex flex-column gap-4`} onSubmit={handleSubmit}>  
            <div className={`input-group ${styles.inputGroup}`}>
                <label htmlFor='phone' className='form-label'><FaPhoneAlt /></label>
                <input name="phone" type='tel' id='phone' placeholder='phone number' className='form-control' aria-label='phone number'/>
            </div>
            <div className={`input-group ${styles.inputGroup}`}>
                <label htmlFor='city' className='form-label'><PiCityDuotone /></label>
                <input name="city" type='text' id='city' placeholder='city' className='form-control' aria-label='city'/>
            </div>
            <div className={`input-group ${styles.inputGroup}`}>
                <textarea name="address" type='text' id='details' placeholder='provide your details address' className='form-control' aria-label='address' ></textarea>
            </div>
            <Button type='submit' myClasses='mx-auto'
            >procced to payment <FaSquareArrowUpRight /></Button>
        </form>
    )
}

export default Checkout