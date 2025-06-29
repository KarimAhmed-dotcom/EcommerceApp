import { useContext, useEffect } from "react"
import { cartContext } from "../../Context/CartContext"
import styles from './Cart.module.css'
import { Link } from "react-router-dom"
import Spinner from "../../ui/Spinner/Spinner"

function Orders(){
    const {getOrders,orders,loading}=useContext(cartContext)
    useEffect(() => {

    getOrders();

}, [getOrders]);

    console.log("orders",orders)
    return(
        <>
        {loading && <Spinner />}
        <section className='container '>
            <div>
                {orders?.data?.map(order => (
                    <div className={`${styles.order} border border-2 rounded-2 p-2`} key={order.id}>
                        <ul className="row row-cols-1 row-cols-lg-3 row-cols-xlg-4 ">
                            {order.cartItems.map((cartItem) => (
                                <li className="col d-flex flex-column h-100 flex-grow-0" key={cartItem._id}>
                                    <Link className="d-flex gap-3 border rounded-2" to={`/products/${cartItem.product._id}`}></Link>
                                    <div className=''>
                                        <img src={cartItem.product.imageCover} className="img-fluid w-50 h-50"/>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <h3 className="h5">{cartItem.product.title}</h3>
                                        <p className="mb-0">
                                            <span className="fw-semibold mt-auto">price: </span> {cartItem.price} EGP
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="table-responsive">
                            <table className="table table-sm table-striped border border-1  border-black-subtle mb-0">
                                <tboby>
                                    <tr>
                                        <td>Order ID</td>
                                        <td>{order.id}</td>
                                    </tr>
                                    <tr>
                                        <td>Deliver To</td>
                                        <td>{order.user.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Phone</td>
                                        <td>{order.shippingAddress.details ? order.shippingAddress.details:"not  provided"}</td>
                                    </tr>
                                    <tr>
                                        <td>Paid</td>
                                        <td>{order.isPaid ? 'Yes' : 'No'}</td>
                                    </tr>
                                    <tr>
                                        <td>Payment Method</td>
                                        <td>{order.paymentMethodType}</td>
                                    </tr>
                                    <tr>
                                        <td>Shipping Price</td>
                                        <td>{order.shippingPrice}</td>
                                    </tr>
                                    <tr>
                                        <td>Taxis</td>
                                        <td>{order.taxPrice} EGP</td>
                                    </tr>
                                </tboby>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </section>
        </>

    )
}

export default Orders