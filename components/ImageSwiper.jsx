'use client'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';

const ImageSwiper = ({ images }) => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={false}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {images.map(image => {
        return <SwiperSlide key={image._id}>
          <Image
            src={image.link}
            alt={image.fileName}
            width={0}
            height={0}
            sizes="100vw"
            className=" object-cover h-[356px] w-full"
            priority={true}
          />
        </SwiperSlide>
      })}
    </Swiper>
  )
}
export default ImageSwiper