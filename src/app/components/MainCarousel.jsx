"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Navigation, Coverflow, Scrollbar, A11y} from 'swiper/modules';
import { BsArrowRight } from 'react-icons/bs'
import { GrPrevious, GrNext } from 'react-icons/gr';
import { FaRegHeart } from "react-icons/fa6";
import { useState } from 'react';



export default function MainCarousel() {
  const [data, setData] = useState([
    {city: 'Harare', img:'a.jpg'},
    {city: 'Bulawayo', img:'b.jpg'},
    {city: 'Mutare', img:'c.jpg'},
    {city: 'Hwange', img:'d.jpg'},
    {city: 'Chitungwiza', img:'e.jpg'},
    {city: 'Plumtree', img:'a.jpg'},
    {city: 'Inyanga', img:'b.jpg'},
    {city: 'Bindura', img:'c.jpg'},
]);


  return (
    <section className='w-[100%]'>
        <div className='w-[90%] mx-auto pt-12 pb-[5rem]'>
        <section className='hidden lg:block'>
          <Swiper 
             modules={[Navigation, Pagination, Scrollbar, A11y]}
             effect="fade"
             spaceBetween={0}
             slidesPerView={3}
             navigation
             pagination={{ clickable: true }}
             scrollbar={{ draggable: true }}
             onSwiper={(swiper) => console.log(swiper)}
             onSlideChange={() => console.log('slide change')}
            className='h-[70vh]'
          >
            {data.map((i, key) => (
            <SwiperSlide key={key} className='h-[60vh] aspect-[10/7] overflow-hidden hover:drop-shadow-md'>
                <div className='group w-[100%] h-[100%] relative'>
                  <img src={`./assets/img/${i.img}`} className='w-[100%] transition-all ease-in-out duration-200 group-hover:scale-110 h-[100%] object-cover absolute z-30' alt='Image' />
                  <div className='absolute z-30 w-[100%] h-[50%] bottom-0 left-0 bg-gradient-to-b from-transparent to-black opacity-75 group-hover:opacity-25 transition-all ease-in-out duration-200'>
                  </div>
                  <div className='absolute z-40 bottom-0 left-0 p-8 text-white drop-shadow-md'>
                    <h6 className='text-3xl font-bold mb-2'>{i.city}</h6>
                   {/*  <p className='text-lg mb-2'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, cumque.
                    </p> */}
                    <button className='px-4 py-3 rounded-full border border-slate-50 hover:bg-gradient-to-br hover:from-green-400 group-hover:to-blue-500'>
                      Click for more
                    </button>
                  </div>
                </div>
            </SwiperSlide>      

            ))}
           
          </Swiper>
        </section>
        {/* RESPONSIVE */}
        <section className='lg:hidden block'>
          <Swiper 
             modules={[Navigation, Pagination, Scrollbar, A11y]}
             effect="fade"
             spaceBetween={0}
             slidesPerView={1}
             navigation
             pagination={{ clickable: true }}
             scrollbar={{ draggable: true }}
             onSwiper={(swiper) => console.log(swiper)}
             onSlideChange={() => console.log('slide change')}
             className='h-[70vh]'>
            {data.map((i, key) => (
            <SwiperSlide key={key} className='h-[60vh] aspect-[10/7] overflow-hidden hover:drop-shadow-md'>
                <div className='group w-[100%] h-[100%] relative'>
                  <img src={`./assets/img/${i.img}`} className='w-[100%] transition-all ease-in-out duration-200 group-hover:scale-110 h-[100%] object-cover absolute z-30' alt='Image' />
                  <div className='absolute z-30 w-[100%] h-[50%] bottom-0 left-0 bg-gradient-to-b from-transparent to-black opacity-75 group-hover:opacity-25 transition-all ease-in-out duration-200'>
                  </div>
                  <div className='absolute z-40 bottom-0 left-0 p-8 text-white drop-shadow-md'>
                    <h6 className='text-3xl font-bold mb-2'>{i.city}</h6>
                   {/*  <p className='text-lg mb-2'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, cumque.
                    </p> */}
                    <button className='px-4 py-3 rounded-full border border-slate-50 hover:bg-gradient-to-br hover:from-green-400 group-hover:to-blue-500'>
                      Click for more
                    </button>
                  </div>
                </div>
            </SwiperSlide>      
            ))}
          </Swiper>
        </section>
        </div>
    </section>
  )
}
