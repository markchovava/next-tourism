"use client"
import React from 'react'
import { FaRegHeart, FaHeart, FaRegStar, FaStar, FaArrowRightLong } from "react-icons/fa6";




export default function PlaceView() {
  return (
    <div>
        <section className='w-[100%]'>
            <div className='w-[90%] mx-auto pt-[2rem] flex items-center justify-between'>
                <h5>Sheraton Hotel</h5>
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
                    <img src='http://localhost:3000/assets/img/a.jpg' className='w-[100%] h-[100%] object-cover' />
                </div>
                <div className='w-[100%] h-[100%] rounded-lg aspect-[10/7] bg-blue-200 overflow-hidden'>
                    <img src='http://localhost:3000/assets/img/a.jpg' className='w-[100%] h-[100%] object-cover' />
                </div>
                <div className='w-[100%] h-[100%] rounded-lg aspect-[10/7] bg-orange-200 overflow-hidden'>
                    <img src='http://localhost:3000/assets/img/b.jpg' className='w-[100%] h-[100%] object-cover' />
                </div>
                <div className='w-[100%] h-[100%] rounded-lg aspect-[10/7] bg-pink-200 overflow-hidden'>
                    <img src='http://localhost:3000/assets/img/c.jpg' className='w-[100%] h-[100%] object-cover' />
                </div>
                <div className='w-[100%] h-[100%] rounded-lg aspect-[10/7] bg-green-200'>
                    <img src='http://localhost:3000/assets/img/d.jpg' className='w-[100%] h-[100%] object-cover' />
                </div>
            </div>
            {/* DEscription */}
            <div className='mx-auto w-[80%] mb-[2rem]'>
                <p className='text-xl mb-[1rem]'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum perferendis, 
                    beatae impedit deleniti quisquam incidunt neque, aspernatur omnis, itaque 
                    dolore maiores labore! Ipsa, ex rerum culpa cupiditate, vero beatae quis 
                    totam eius voluptatem voluptas maxime, vel ad voluptatibus sequi nemo neque 
                    reiciendis nam. Amet eos recusandae ratione delectus quis eaque.
                </p>
                <p className='text-xl mb-[1rem]'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum perferendis, 
                    beatae impedit deleniti quisquam incidunt neque, aspernatur omnis, itaque 
                    dolore maiores labore! Ipsa, ex rerum culpa cupiditate, vero beatae quis 
                    totam eius voluptatem voluptas maxime, vel ad voluptatibus sequi nemo neque 
                    reiciendis nam. Amet eos recusandae ratione delectus quis eaque.
                </p>
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
