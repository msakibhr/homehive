// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

const Banner = () => {
    return (
        <div>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: true,
                }}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide><img src="https://i.ibb.co.com/VW9wtZJ5/slide1.jpg" alt="" className="w-full h-[calc(100vh-64px)] object-cover" /></SwiperSlide>
                <SwiperSlide><img src="https://i.ibb.co.com/pBpKf7zL/slide2.jpg" alt="" className="w-full h-[calc(100vh-64px)] object-cover" /></SwiperSlide>
                <SwiperSlide><img src="https://i.ibb.co.com/NgBkyNj3/slide3.jpg" alt="" className="w-full h-[calc(100vh-64px)] object-cover" /></SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;