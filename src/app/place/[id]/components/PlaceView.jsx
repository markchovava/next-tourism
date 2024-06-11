"use client"
import { baseURL } from '@/api/baseURL';
import Link from 'next/link';
import React, { useState } from 'react'
import { FaRegHeart, FaHeart, FaRegStar, FaStar, FaArrowRightLong, FaAngleRight } from "react-icons/fa6";




export default function PlaceView({place}) {
    const [isActive, setIsActive] = useState({image: place.data?.place_images[0]?.image})
    const [data, setData] = useState(place.data);
    console.log(place)


  return (
    <div>
        <section className='w-[100%]'>
            <div className='mx-auto w-[90%] border-b border-slate-200'>
                <ul className='flex items-center justify-start gap-2 px-3 py-2'>
                    <li><Link href='/'>Home</Link></li>
                    <li><FaAngleRight /></li>
                    <li><Link href='/place'>Places</Link></li>
                    <li><FaAngleRight /></li>
                    <li><Link href={`/place/${data.id}`}>{data?.name}</Link></li>
                    
                </ul>
            </div>
      </section>
        <section className='w-[100%]'>
            <div className='w-[90%] mx-auto pt-[2rem] flex items-center justify-between'>
                <h5>{data.name}</h5>
                <div className='text-xl cursor-pointer text-green-600 flex items-center justify-center gap-1'>
                    <FaRegHeart />
                    <FaHeart />
                </div>
            </div>
        </section>
        <section className='w-[100%] mb-[5rem]'>
            {/* IMAGE AREA */}
            <div className='w-[90%] mx-auto grid lg:grid-cols-4 grid-cols-2 gap-4 mb-[2rem]'>
                <div className='w-[100%] h-[100%] col-span-2 row-span-2 rounded-lg aspect-[10/7] overflow-hidden bg-green-200'>
                    <img 
                        src={baseURL + isActive.image } 
                        className='w-[100%] h-[100%] object-cover transition-all duration-200 ease-in-out' />
                </div>
                <div className='w-[100%] h-[100%] rounded-lg aspect-[10/7] bg-blue-200 overflow-hidden'>
                    <img 
                        onClick={() => setIsActive({image: data.place_images[0].image})}
                        src={baseURL + data.place_images[0].image} 
                        className='w-[100%] h-[100%] hover:scale-110 object-cover transition-all duration-200 ease-in-out' />
                </div>
                <div className='w-[100%] h-[100%] rounded-lg aspect-[10/7] bg-orange-200 overflow-hidden'>
                    <img 
                        onClick={() => setIsActive({image: data.place_images[1].image})}
                        src={baseURL + data.place_images[1].image} 
                        className='w-[100%] h-[100%] hover:scale-110 object-cover transition-all duration-200 ease-in-out' />
                </div>
                <div className='w-[100%] h-[100%] rounded-lg aspect-[10/7] bg-pink-200 overflow-hidden'>
                    <img 
                        onClick={() => setIsActive({image: data.place_images[2].image})}
                        src={baseURL + data.place_images[2].image} 
                        className='w-[100%] h-[100%] hover:scale-110 object-cover transition-all duration-200 ease-in-out' />
                </div>
                <div className='w-[100%] h-[100%] rounded-lg aspect-[10/7] bg-green-200 overflow-hidden'>
                    <img 
                        onClick={() => setIsActive({image: data.place_images[3].image})}
                        src={baseURL + data.place_images[3].image} 
                        className='w-[100%] h-[100%] object-cover hover:scale-110 transition-all duration-200 ease-in-out' />
                </div>
            </div>
            {/* DEscription */}
            <div className='mx-auto w-[80%] mb-[2rem]'>
                <p className='text-xl mb-[1rem]'>
                    {data.description}
                </p>
                <div className=' mb-[1rem] flex items-center justify-between gap-6'>
                    <div>
                        <div className='flex items-center justify-start gap-3 mb-2'>
                            <div>Address:</div>
                            <div className='font-semibold'>{data.address}</div>
                        </div>
                        <div className='flex items-center justify-start gap-3 mb-2'>
                            <div>Phone:</div>
                            <div className='font-semibold'>{data.phone}</div>
                        </div>
                        <div className='flex items-center justify-start gap-3 mb-2'>
                            <div>Email:</div>
                            <div className='font-semibold'>{data.email}</div>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center justify-start gap-3 mb-2'>
                            <div>Website:</div>
                            <div className='font-semibold'>{data.website}</div>
                        </div>
                        <div className='flex items-center justify-start gap-3 mb-2'>
                            <div>City:</div>
                            <div className='font-semibold'>{data.city?.name}</div>
                        </div>
                        <div className='flex items-center justify-start gap-3 mb-2'>
                            <div>Province:</div>
                            <div className='font-semibold'>{data.province?.name}</div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className='mx-auto w-[80%]'>
                <h5 className='mb-4'>Write your Review</h5>
                {/*  EMAIL */}
                <div className='mb-4'>
                    <div className='font-semibold mb-1'>Email:</div>
                    <input 
                    type='text' 
                    placeholder='Enter Email here...'
                    className='outline-none border border-slate-300 px-5 py-4 rounded-xl w-[100%]' />
                </div>
                {/* REVIEW */}
                <div className='mb-4'>
                    <div className='font-semibold mb-1'>Review out of 5:</div>
                    <p className='text-xl cursor-pointer mb-2 flex items-center justify-start gap-3'>
                        <FaRegStar />
                        <FaRegStar />
                        <FaRegStar />
                        <FaRegStar />
                        <FaRegStar />
                    </p>
                </div>
                {/* TEXT AREA */}
                <div className='mb-4'>
                    <div className='font-semibold mb-1'>Review:</div>
                    <textarea  
                    placeholder='Write your Review here...'
                    className='outline-none border border-slate-300 h-[10rem] px-5 py-4 rounded-xl w-[100%]'></textarea>
                </div>
                {/* BUTTON */}
                <div className='w-[100%] flex items-center justify-center mb-4'>
                    <button className='flex items-center justify-center gap-3 group text-white duration-200 transition-all ease-in-out text-lg rounded-full px-5 py-6 w-[20rem] bg-gradient-to-br from-green-600 to-cyan-700 hover:bg-gradient-to-br hover:from-cyan-700 hover:to-green-600'>
                        Submit <FaArrowRightLong className='group-hover:translate-x-2 duration-200 transition-all ease-in-out' />
                    </button>
                </div>
            </div>

            {/*  */}
            <div className='mx-auto w-[80%]'>
                {/* COMMENT */}
                <section className='flex items-center justify-start gap-8 border-b border-slate-300'>
                    <div className=' py-[2rem]'>
                        <div className='w-[10rem] aspect-square rounded-full overflow-hidden bg-green-400'>
                            <img src='http://localhost:3000/assets/img/a.jpg' className='w-[100%] h-[100%] object-cover' />
                        </div>
                    </div>
                    <div className=''>
                        <div className='text-xl cursor-pointer mb-3 flex items-center justify-start gap-3'>
                            <FaRegStar />
                            <FaRegStar />
                            <FaRegStar />
                            <FaRegStar />
                            <FaRegStar />
                        </div>
                        <p className='w-[90%] mb-2'>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus molestiae 
                            vitae earum sit sint. Quis deserunt molestiae sit possimus a!
                        </p>
                        <div className='italic text-lg'>
                            mark@email.com
                        </div>
                    </div>
                </section>
                {/* COMMENT */}
                <section className='flex items-center justify-start gap-8 border-b border-slate-300'>
                    <div className=' py-[2rem]'>
                        <div className='w-[10rem] aspect-square rounded-full overflow-hidden bg-green-400'>
                            <img src='http://localhost:3000/assets/img/b.jpg' className='w-[100%] h-[100%] object-cover' />
                        </div>
                    </div>
                    <div className=''>
                        <div className='text-xl cursor-pointer mb-3 flex items-center justify-start gap-3'>
                            <FaRegStar />
                            <FaRegStar />
                            <FaRegStar />
                            <FaRegStar />
                            <FaRegStar />
                        </div>
                        <p className='w-[90%] mb-2'>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus molestiae 
                            vitae earum sit sint. Quis deserunt molestiae sit possimus a!
                        </p>
                        <div className='italic text-lg'>
                            mark@email.com
                        </div>
                    </div>
                </section>
                {/* COMMENT */}
                <section className='flex items-center justify-start gap-8 border-b border-slate-300'>
                    <div className=' py-[2rem]'>
                        <div className='w-[10rem] aspect-square rounded-full overflow-hidden bg-green-400'>
                            <img src='http://localhost:3000/assets/img/c.jpg' className='w-[100%] h-[100%] object-cover' />
                        </div>
                    </div>
                    <div className=''>
                        <div className='text-xl cursor-pointer mb-3 flex items-center justify-start gap-3'>
                            <FaRegStar />
                            <FaRegStar />
                            <FaRegStar />
                            <FaRegStar />
                            <FaRegStar />
                        </div>
                        <p className='w-[90%] mb-2'>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus molestiae 
                            vitae earum sit sint. Quis deserunt molestiae sit possimus a!
                        </p>
                        <div className='italic text-lg'>
                            mark@email.com
                        </div>
                    </div>
                </section>
               
            </div>

        </section>
      



    </div>
  )
}
