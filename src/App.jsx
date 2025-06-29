import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Navbar from './components/ui/Navbar/Navbar'
import Footer from './components/ui/Footer/Footer'
import { Outlet, useNavigation } from 'react-router-dom'
import Spinner from './components/ui/Spinner/Spinner'
import { ToastContainer } from 'react-toastify';
import axios from 'axios'
import { userContext } from './components/Context/UserContext'
import {productsContext} from './components/Context/ProductsContext'
import CartProvider from './components/Context/CartContext'
import WishlistProvider from './components/Context/WishlistContext'
import CategoryProvide from './components/Context/CategoryContext'

function App() {
const {state}=useNavigation()
const [user,setUser]=useState(null)
const token=localStorage.getItem('userToken')
const [products,setProducts]=useState([])
const [loading,setLoading]=useState(false);
useEffect(() => {
  if (token){
    setUser(localStorage.getItem('userToken'))
    console.log("user >> ",user)
  }
},[token])

useEffect(() => {
  async function getProducts() {
      console.log('fetching')
      setLoading(true)
      const res=await axios.get('https://ecommerce.routemisr.com/api/v1/products')
      const {data:{data}}=res
      setProducts(data)
      setLoading(false)
  }
  // if (!user) {
  //   setLoading(false);
  //   return;
  // }
  if (products.length) return;
  getProducts()
},[setProducts,products.length])

  return (
    <>
    <userContext.Provider value={{user,setUser}}>
      <productsContext.Provider value={{products,loading}}>
        <CartProvider>
          <WishlistProvider>
            <CategoryProvide>
          <Navbar />
          <ToastContainer className='d-flex justify-content-center align-items-center w-100'/>
          <main style={{marginBlock:'61px',flexGrow:'1'}}>
            {/* {state === 'loading' && <Spinner />} */}
            {state === 'submitting' && <Spinner />}

            {/* <Spinner /> */}
            <Outlet />
          </main>
          <Footer />
          </CategoryProvide>
          </WishlistProvider>
        </CartProvider>
        </productsContext.Provider>
    </userContext.Provider>
    </>
  )
}

export default App
