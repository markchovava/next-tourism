"use client"
import { baseURL } from '@/api/baseURL';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaRegHeart, FaHeart, FaRegStar, FaStar, FaArrowRightLong, FaAngleRight, FaArrowLeftLong } from "react-icons/fa6";
import { IoMdContact } from 'react-icons/io';
import { MdDateRange } from 'react-icons/md';
import StarRating from './StarRating';
import axios from 'axios';
import { darkBounce } from '@/utils/roastifyDark';
import { toast } from 'react-toastify';
import { tokenRole } from '@/tokens/tokenRole';




export default function PlaceView({placeData, reviewsData}) {
    const { getRoleToken }  = tokenRole();
    const [isActive, setIsActive] = useState({image: placeData?.data?.place_images[0]?.image})
    const [data, setData] = useState(placeData?.data);
    const [reviews, setReviews] = useState(reviewsData?.data);
    const [inputData, setInputData] = useState({})
    const [isSubmit, setIsSubmit] = useState(false);
    const [rating, setRating] = useState();
    const [errMsg, setErrMsg] = useState({});
     /* PAGINATION */
     const [nextURL, setNextURL] = useState(reviewsData?.links?.next)
     const [prevURL, setPrevURL] = useState(reviewsData?.links?.prev)
    const handleInput = (e) => {
        setInputData({...data, [e.target.name]: e.target.value})
    }

    /* PAGINATION DATA */
    async function paginationHandler(url) {
        try{
        const result = await axios.get(url)
        .then((response) => {
            setReviews(response.data.data)
            setPrevURL(response.data.links.prev)
            setNextURL(response.data.links.next)
        })
        } catch (error) {
            console.error(`Error: ${error}`);
            console.error(`Error Message: ${error.message}`);
            console.error(`Error Response: ${error.response}`);
        }     
    }

    async function postData(){
        if(!inputData.email) {
            const message = 'Email is required.'
            toast.warn(message, darkBounce);
            setErrMsg({email: message});
            setIsSubmit(false);
            return;
        }
        if(!rating) {
            const message = 'Rating is required.'
            toast.warn(message, darkBounce);
            setErrMsg({rating: message});
            setIsSubmit(false);
            return;
        }
        if(!inputData.message) {
            const message = 'Review Message is required.'
            toast.warn(message, darkBounce);
            setErrMsg({message: message});
            setIsSubmit(false);
            return;
        }
        const formData = {
            email: inputData.email,
            rating: rating,
            message: inputData.message,
            place_id: data.id
        }
        try{
            const result = await axios.post(`${baseURL}review`, formData)
            .then((response) => {
              if(response.data.status == 1){
                toast.success(response.data.message, darkBounce);
                /* setInputData({
                    email: '',
                    message: '',
                });
                setRating(null); */
                getData();
                getReview();
                setIsSubmit(false);
              }
              }
            );    
            } catch (error) {
                console.error(`Error: ${error}`);
                console.error(`Error Message: ${error.message}`);
                console.error(`Error Response: ${error.response}`);
                setIsSubmit(false);
            }
  
    } 
    /* GET DATA */
    async function getData() {
        try{
        const result = await axios.get(`${baseURL}place/${data.id}`)
        .then((response) => {
            setData(response.data?.data)
        })
        } catch (error) {
        console.error(`Error: ${error}`)
        }   
    }  
    async function getReview() {
        try{
        const result = await axios.get(`${baseURL}review-by-place-id/${data.id}`)
        .then((response) => {
            console.log(response.data?.data)
            setReviews(response.data?.data)
            setNextURL(response.data.links.next)
            setPrevURL(response.data.links.prev)
        })
        } catch (error) {
        console.error(`Error: ${error}`)
        }   
    }  
    /*  */
    async function deleteReview(id) {
        try{
        const result = await axios.delete(`${baseURL}review/${id}`)
        .then((response) => {
            if(response.data.status == 1){
                toast.success(response.data.message, darkBounce)
                getData();
                getReview();

            }
        })
        } catch (error) {
        console.error(`Error: ${error}`)
        }   
    }  

    useEffect(() => {
        isSubmit === true && postData();
    },[isSubmit]);




    

  return (
    <div>
        <section className='w-[100%]'>
            <div className='mx-auto w-[90%] border-b border-slate-200'>
                <ul className='flex items-center justify-start gap-2 py-2'>
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
                <h5 className='mb-2'>{data.name}</h5>
                <div className='text-xl cursor-pointer flex items-center justify-start gap-3'>
                    { data?.rating?.rate ?
                    <>
                    {
                        data?.rating?.rate != 0 ?
                            [...Array(5)].map((a, key) => {
                                const currentIndex = key + 1;
                                return (
                                    <>
                                        { currentIndex <= data?.rating?.rate
                                            ? <FaStar className='text-slate-600' />
                                            : <FaRegStar className='text-slate-600' />
                                        } 
                                    </>
                                )
                            })
                        :
                        ''
                    }
                    </> 
                    : ''
                    }

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
                    {data?.place_images[0]?.image ? 
                    <img 
                        onClick={() => setIsActive({image: data.place_images[0].image})}
                        src={baseURL + data.place_images[0].image} 
                        className='w-[100%] h-[100%] hover:scale-110 object-cover transition-all duration-200 ease-in-out' />
                    : 
                    <img 
                        onClick={() => setIsActive({image: 'assets/img/no-img.jpg'})}
                        src={baseURL + 'assets/img/no-img.jpg'} 
                        className='w-[100%] h-[100%] hover:scale-110 object-cover transition-all duration-200 ease-in-out' />
                    }
                </div>
                <div className='w-[100%] h-[100%] rounded-lg aspect-[10/7] bg-orange-200 overflow-hidden'>
                    {data?.place_images[1]?.image ? 
                    <img 
                        onClick={() => setIsActive({image: data.place_images[1].image})}
                        src={baseURL + data.place_images[1].image} 
                        className='w-[100%] h-[100%] hover:scale-110 object-cover transition-all duration-200 ease-in-out' />
                    : 
                    <img 
                        onClick={() => setIsActive({image: 'assets/img/no-img.jpg'})}
                        src={baseURL + 'assets/img/no-img.jpg'} 
                        className='w-[100%] h-[100%] hover:scale-110 object-cover transition-all duration-200 ease-in-out' />
                    }
                </div>
                <div className='w-[100%] h-[100%] rounded-lg aspect-[10/7] bg-pink-200 overflow-hidden'>                    
                    {data?.place_images[2]?.image ? 
                    <img 
                        onClick={() => setIsActive({image: data.place_images[2].image})}
                        src={baseURL + data.place_images[2].image} 
                        className='w-[100%] h-[100%] hover:scale-110 object-cover transition-all duration-200 ease-in-out' />
                    : 
                    <img 
                        onClick={() => setIsActive({image: 'assets/img/no-img.jpg'})}
                        src={baseURL + 'assets/img/no-img.jpg'} 
                        className='w-[100%] h-[100%] hover:scale-110 object-cover transition-all duration-200 ease-in-out' />
                    }
                </div>
                <div className='w-[100%] h-[100%] rounded-lg aspect-[10/7] bg-green-200 overflow-hidden'>
                    {data?.place_images[3]?.image ? 
                    <img 
                        onClick={() => setIsActive({image: data.place_images[3].image})}
                        src={baseURL + data.place_images[3].image} 
                        className='w-[100%] h-[100%] hover:scale-110 object-cover transition-all duration-200 ease-in-out' />
                    : 
                    <img 
                        onClick={() => setIsActive({image: 'assets/img/no-img.jpg'})}
                        src={baseURL + 'assets/img/no-img.jpg'} 
                        className='w-[100%] h-[100%] hover:scale-110 object-cover transition-all duration-200 ease-in-out' />
                    }
                </div>
            </div>
            {/* DESCRIPTION */}
            <div className='mx-auto w-[80%] mb-[2rem] text-xl'>
                {data.description &&
                <p className=' mb-[1rem]'>
                    {data.description}
                </p>
                }

                {/*  */}
                <div className="mx-auto w-[100%] grid lg:grid-cols-2 grid-cols-1 gap-8">
                    {/*  */}
                    <div className="w-[100%] flex items-start justify-start  py-3">
                        <div className="w-[20%] flex items-center justify-center">
                            <IoMdContact className="text-[4rem] text-slate-600" />
                        </div>
                        <div className="border-l border-slate-200 px-6 text-xl font-light">
                            {data?.address &&
                            <p className="mb-3 flex items-center gap-4">
                                Address:
                                <span className="text-slate-700 font-normal">{data?.address}</span>
                            </p>
                            }
                            {data?.city?.name &&
                            <p className="mb-3 flex items-center gap-4">
                                City:
                                <span className="text-slate-700 font-normal">{data?.city?.name}</span>
                            </p>
                            }
                            {data?.province?.name &&
                            <p className="mb-3 flex items-center gap-4">
                                Province:
                                <span className="text-slate-700 font-normal">{data?.province?.name}</span>
                            </p>
                            }
                        
                        </div>
                    </div>
                    {/*  */}
                    <div className="w-[100%] flex items-start justify-start  py-3">
                        <div className="w-[20%] flex items-center justify-center">
                            <MdDateRange className="text-[4rem] text-slate-600" />
                        </div>
                        <div className="border-l border-slate-200 px-6 text-xl font-light">
                            {data?.phone &&
                            <p className="mb-3 flex items-center gap-4">
                                Phone:
                                <span className="text-slate-700 font-normal">{data?.phone}</span>
                            </p>
                            }
                            {data?.email && 
                            <p className="mb-3 flex items-center gap-4">
                                Email:
                                <span className="text-slate-700 font-normal">{data?.email}</span>
                            </p>
                            }
                            {data?.website &&
                            <p className="mb-3 flex items-center gap-4">
                                Website:
                                <span className="text-slate-700 font-normal">{data?.website}</span>
                            </p>
                            }
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
                        name='email'
                        onChange={handleInput}
                        placeholder='Enter Email here...'
                        className='outline-none border border-slate-300 px-5 py-4 rounded-xl w-[100%]' />
                    {errMsg?.email &&
                    <div className='text-red-600'>{errMsg?.email}</div> }
                </div>
                {/* REVIEW */}
                <div className='mb-4'>
                    <div className='font-semibold mb-1'>Rate out of 5:</div>
                    <StarRating rating={rating} setRating={setRating} />
                    {errMsg?.rating &&
                    <div className='text-red-600'>{errMsg?.rating}</div> }
                </div>
                {/* TEXT AREA */}
                <div className='mb-4'>
                    <div className='font-semibold mb-1'>Review:</div>
                    <textarea  
                        name='message'
                        onChange={handleInput}
                        placeholder='Write your Review here...'
                        className='outline-none border border-slate-300 h-[10rem] px-5 py-4 rounded-xl w-[100%]'></textarea>
                    {errMsg?.message &&
                    <div className='text-red-600'>{errMsg?.message}</div> }
                </div>
                {/* BUTTON */}
                <div className='w-[100%] flex items-center justify-center mb-4'>
                    <button 
                        onClick={() => setIsSubmit(true)}
                        className='flex items-center justify-center gap-3 group text-white duration-200 transition-all ease-in-out text-lg rounded-full px-5 py-6 w-[20rem] bg-gradient-to-br from-green-600 to-cyan-700 hover:bg-gradient-to-br hover:from-cyan-700 hover:to-green-600'>
                        {isSubmit === true ? 'Processing' : 
                        <>
                            Submit <FaArrowRightLong className='group-hover:translate-x-2 duration-200 transition-all ease-in-out' />
                        </>
                        }
                    </button>
                </div>
            </div>

            {/*  */}
            <div className='mx-auto w-[80%] py-[1rem]'>
                {/* COMMENT */}
                <section className=''>
                    {reviews.length > 0 &&
                        reviews.map((i, key) => (
                            <div className='mx-auto w-[90%] py-[1.6rem] border-b border-slate-300'>
                                <div className='text-xl cursor-pointer mb-3 flex items-center justify-start gap-3'>
                                    {[...Array(5)].map((a, key) => {
                                        const currentIndex = key + 1;
                                        return (
                                            <>
                                                { currentIndex <= i.rating 
                                                    ? <FaStar className='text-slate-600' />
                                                    : <FaRegStar className='text-slate-600' />
                                                } 
                                            </>
                                        )
                                    })}
                    
                                </div>
                                <p className=' mb-2'>
                                    {i.message}
                                </p>
                                <div className='italic text-lg flex items-center justify-between gap-3'>
                                    <p>{i.email}</p>
                                    {getRoleToken() &&
                                    <>
                                        { getRoleToken() <= 2 &&
                                        <>
                                        <button 
                                            onClick={() => deleteReview(i.id)} 
                                            className='text-sm text-red-600 hover:text-slate-600 underline hover:no-underline'>
                                            Delete
                                        </button>
                                        </>
                                        }
                                    </>
                                    }
                                </div>
                            </div>
                        ))
                    }

                </section>

                {/* PAGINATION */}
                <div className='flex items-center justify-end gap-3 py-[2rem]'>
                {prevURL && 
                    <button 
                    onClick={() => paginationHandler(prevURL)}
                    className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-green-600 to-blue-600'>
                    <FaArrowLeftLong className='group-hover:-translate-x-2 duration-200 transition-all ease-in-out text-green-700' /> 
                        Prev </button>
                }
                {nextURL && 
                    <button
                    onClick={() => paginationHandler(nextURL)}
                    className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-green-600 to-blue-600'>
                        Next <FaArrowRightLong className='text-green-700 group-hover:translate-x-2 duration-200 transition-all ease-in-out' />
                    </button>
                }
                </div>
                
               
            </div>

        </section>
      



    </div>
  )
}
