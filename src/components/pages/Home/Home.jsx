import MainSlider from "./MainSlider"
import img_1 from '../../../assets/images/grocery-banner.png'
import img_2 from '../../../assets/images/grocery-banner-2.jpeg'
import styles from './Home.module.css'
import CategoriesSlider from "./CategoriesSlider"
// import { useLoaderData,Link } from "react-router-dom"
// import axios from "axios"
import ProductsList from "../../features/Products/ProductsList"
import { useContext } from "react"
import { productsContext } from "../../Context/ProductsContext"
import Spinner from "../../ui/Spinner/Spinner"
import { wishlistContext } from "../../Context/WishlistContext"

function Home(){
    const {products,loading}=useContext(productsContext)
    const {wish_loading} = useContext(wishlistContext)
    return(
        <>
        {loading && <Spinner />}
        {wish_loading && <Spinner />}
        <section className={`${styles.mainSlider}`}>
                <MainSlider />
                <div className={styles.images}>
                    <div>
                        <img src={img_1} />
                    </div>
                    <div>
                        <img src={img_2} />
                    </div>
                </div>
        </section>
        <section className={`container ${styles.categoriesSlider}`}>
            <h2 className="fs-normal">Categories Slider</h2>
            <CategoriesSlider />
        </section>
        <section className="container">
            <ProductsList products={products}/>
        </section>
        </>
        
    )
}

// export async function loader(){
//     const res=await axios.get('https://ecommerce.routemisr.com/api/v1/products')
//     const {data:{data}}=res
//     return data
// }

export default Home