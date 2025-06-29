import {Link, NavLink} from 'react-router-dom'
import styles from './Navbar.module.css'
import logo from '../../../assets/images/freshcart-logo.svg'
import { FaInstagram, FaTwitter,FaFacebook, FaLinkedin } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { TbLogout } from "react-icons/tb";
import Button from '../Button/Button';
import { TbLogin } from "react-icons/tb";
import { useContext } from 'react';
import { userContext } from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import { TiShoppingCart } from "react-icons/ti";
import { cartContext } from '../../Context/CartContext';


function Navbar(){
  const {user,setUser}=useContext(userContext)
  const {cart}=useContext(cartContext)
  console.log(cart)
  const navigate=useNavigate();
  function handleLogout(){
    setUser(null)
    localStorage.removeItem('userToken')
    navigate('/login')
  }
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
  <div className="container-fluid">
    <Link className="navbar-brand" href="#"><img src={logo}/></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/products">Products</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/categories">Categories</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/brands">Brands</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/wishlist">Wishlist</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/allorders">Orders</NavLink>
        </li>
      </ul>
      <div className='d-flex align-items-center gap-4'>
        <ul className='d-flex list-unstyled gap-3 fs-5 m-0 h-100 align-items-center'>
            <li className={styles.socialIcon}><a href='https://www.instagram.com/'><FaInstagram /></a></li>
            <li className={styles.socialIcon}><a href='https://www.facebook.com/'><FaFacebook /></a></li>
            <li className={styles.socialIcon}><a href='https://www.twitter.com/'><FaTwitter /></a></li>
            <li className={styles.socialIcon}><a href='https://www.linkedin.com/'><FaLinkedin /></a></li>
        </ul>
        <Link to='/cart' style={{fontSize:'1.8rem',color:'var(--main-color)'}} className={styles.cartButton} data-cart-items={cart?.data?.numOfCartItems?cart?.data?.numOfCartItems:0}><TiShoppingCart /></Link>
        {/* {user && <p>Hello {user?.user?.name}</p>} */}
        {user ? 
        <Button
        handleClick={handleLogout}
        // myStyles={}
        > Logout <TbLogout /></Button>
        :
        <Button
        // myStyles={}
        type='link'
        to='/login'
        ><TbLogin /> Login</Button>}
      </div>

    </div>
  </div>
</nav>


    )
}

export default Navbar

{/* <AiOutlineLogout /> */}