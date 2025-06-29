import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import electronice from '../../../assets/images/electronicsjfif.jfif'
import baby from '../../../assets/images/baby.jfif'
import men from '../../../assets/images/men.jfif'
import women from '../../../assets/images/women.jfif'
import mobile from '../../../assets/images/mobile.jfif'
import { useContext, useEffect } from 'react';
import { categoryContext } from '../../Context/CategoryContext';
import { Link } from 'react-router-dom';


function CategoriesSlider(){
    const {loading,get_all_catgories,categories}=useContext(categoryContext)
    useEffect(() => {
        get_all_catgories()
    },[get_all_catgories])
    return(
        <>
            <Swiper pagination={true} modules={[Pagination]} className="mySwiper" breakpoints={{
            320: {
            slidesPerView: 1,
            },
            576: {
            slidesPerView: 2,
            },
            768: {
            slidesPerView: 3,
            },
            992: {
            slidesPerView: 4,
            },
            1200: {
            slidesPerView: 6,
            },
        }}>
                {categories.data?.data?.map((category) => {
                return (
                    <SwiperSlide key={category._id}>
                    <img src={category.image} alt={category.name} 
                    style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "10px", 
                    }}/>
                    <h4>{category.name}</h4>
                    <Link className='stretched-link' to={`/products/category/${category._id}`}></Link>
                    </SwiperSlide>
                );
                })}
            </Swiper>
        </>
    
            
    )
}

export default CategoriesSlider


{/* <SwiperSlide><img src={electronice}/><h4>electronice</h4></SwiperSlide>
                <SwiperSlide><img src={baby}/><h4>baby</h4></SwiperSlide>
                <SwiperSlide><img src={men}/><h4>men</h4></SwiperSlide>
                <SwiperSlide><img src={women}/><h4>women</h4></SwiperSlide>
                <SwiperSlide><img src={mobile}/><h4>mobile</h4></SwiperSlide> */}