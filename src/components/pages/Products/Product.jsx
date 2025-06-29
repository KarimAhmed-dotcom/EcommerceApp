import axios from "axios"
import { useLoaderData } from "react-router-dom"
import Button from "../../ui/Button/Button"
import { useContext } from "react"
import { cartContext } from "../../Context/CartContext"
import Spinner from "../../ui/Spinner/Spinner"

function Product (){
    const product=useLoaderData()
    const {addToCart,loading}=useContext(cartContext)
    console.log(product)
    async function handleAdd(e,product_id){
        e.preventDefault()
        const res=await addToCart(product_id)
        console.log(res)
    }
    return(
        <>
        {loading && <Spinner />}
        <section className="container mt-4 " >
            <div className="row">
                <div className="col col-12 col-md-4">
                    <div className="overflow-hidden">
                        <img src={product.images[0]} alt={product.title} className="img-fluid"/>
                    </div>
                </div>
                <div className="col col-12 col-md-8 position-relative overflow-hidden">
                    <div className="d-flex flex-column h-100">
                        {/* <img src={product.imageCover} className="position-absolute w-100 h-100 top-0 start-0" style={{opacity: 0.1, zIndex: 0,objectPosition:'center'}}/> */}

                        <h3 className="fw-semibold">{product.title}</h3>
                        <p className="text-secondary">{product.description}</p>
                        <p className="mb-1" style={{color:'var(--main-color)'}}>
                            <span className="fw-semibold" style={{color:'#000'}}>category: </span> {product.category.name}
                        </p>
                       <div className="d-flex justify-content-between align-items-center mt-auto">
                                    <h4 className="mb-0 " style={{fontWeight:'500'}}>{product.price} EGP</h4>
                                    <h4>{product.ratingsAverage}⭐</h4>
                        </div>
                        <Button myClasses='mt-3 mb-3' type="button" handleClick={(e) => {handleAdd(e,product._id)}}>Add To Cart</Button>
                        
                    </div>
                </div>
            </div>

        </section>
        </>
    )
}


export async function loader({params}){
    const res=await axios(`https://ecommerce.routemisr.com/api/v1/products/${params.productId}`)
    if (res.statusText==='OK') return res.data.data
    return null
}
export default Product