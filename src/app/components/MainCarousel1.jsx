"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Navigation, EffectCoverflow} from 'swiper/modules';
import { BsArrowRight } from 'react-icons/bs'
import { GrPrevious, GrNext } from 'react-icons/gr';


export default function MainCarousel() {
  return (
    <section className='w-[100%]'>
        <div className='w-[90%] mx-auto'>
          <Swiper 
            effect={'coverflow'}
            grabCursor={true}
            slidesPerView={3}
            centeredSlides={true}
            loop={true}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
              clickable: true,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
           
            pagination={{el:'.swiper-pagination', clickable:true}}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className='swiper_container py-12'
          >
            <SwiperSlide>
                <img src='./assets/img/a.jpg' alt='Image' />
        
            </SwiperSlide>
            <SwiperSlide>
              <img src='./assets/img/b.jpg' alt='Image' />
            </SwiperSlide>
            <SwiperSlide>
              <img src='./assets/img/c.jpg' alt='Image' />
            </SwiperSlide>
            <SwiperSlide>
              <img src='./assets/img/d.jpg' alt='Image' />
            </SwiperSlide>
            <SwiperSlide>
              <img src='./assets/img/e.jpg' alt='Image' />
            </SwiperSlide>

           <section className='slider-controler'>
              <div className='swiper-pagination'></div>
              <div className='swiper-button-prev slider-arrow'>
                Prev<GrPrevious className='text-xl' />
              </div>
              <div className='swiper-button-next slider-arrow'>
                Next<GrNext className='text-xl' />
              </div>
            </section>

          </Swiper>
        </div>
    </section>
  )
}
