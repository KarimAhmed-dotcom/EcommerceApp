import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import img_1 from '../../../assets/images/slider-image-1.jpeg'
import img_2 from '../../../assets/images/slider-image-2.jpeg'
import img_3 from '../../../assets/images/slider-image-3.jpeg'




function MainSlider(){
    return(
    <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
            <SwiperSlide><img src={img_1}/></SwiperSlide>
            <SwiperSlide><img src={img_2}/></SwiperSlide>
            <SwiperSlide><img src={img_3}/></SwiperSlide>
    </Swiper>
    )
}

export default MainSlider