import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'
import Home from './components/pages/Home/Home.jsx'
import Register from './components/features/Authentication/Register/Register.jsx'
import 'react-toastify/dist/ReactToastify.css';
import Login ,{action as loginAction}from './components/features/Authentication/Login/Login.jsx'
import Products from './components/pages/Products/Products.jsx'
import ProductsLayout from './components/pages/Products/ProductsLayout.jsx'
import Product,{loader as productLoader} from './components/pages/Products/Product.jsx'
import Cart from './components/features/Cart/Cart.jsx'
import Checkout from './components/features/Cart/Checkout.jsx'
import CartLayout from './components/pages/CartLayout.jsx'
import Orders from './components/features/Cart/Orders.jsx'
import Wishlist from './components/features/Wishlist/Wishlist.jsx'
import CatgegoryProducts from './components/pages/CatgoryProducts.jsx'

const router=createBrowserRouter([

  {path:"/",element:<App />,children:[
    {index:true,element:<Home />},
    {path:"products",element:<ProductsLayout />,children:[
      {index:true,element:<Products />},
      {path:':productId',element:<Product />,loader:productLoader}
    ]},
    {path:"register",element:<Register />},
    {path:"login",element:<Login/>,action:loginAction},
    {path:"cart",element:<CartLayout />,children:[
      {index:true,element:<Cart />},
      {path:'checkout',element:<Checkout />}
    ]},
    {path:"allorders",element:<Orders />},
    {path:"wishlist",element:<Wishlist />},
    {path:"/products/category/:categoryId",element:<CatgegoryProducts />}
  ]}
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />    
  </StrictMode>,
)
