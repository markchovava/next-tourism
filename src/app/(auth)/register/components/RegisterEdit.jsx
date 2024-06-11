"use client";

import { baseURL } from '@/api/baseURL';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Bounce, toast } from 'react-toastify';




export default function RegisterEdit() {
    const router = useRouter();
    const [isSubmit, setIsSubmit] = useState(false);
    const [data, setData] = useState({});
    const [errMsg, setErrMsg] = useState({});
    const handleInput = (e) => {
      setData({...data, [e.target.name]: e.target.value });
    }

    async function postData(){
        if(!data.email){
          setErrMsg({email: 'Email is required.'})
          setIsSubmit(false)
          return;
        }
        if(!data.password){
          setErrMsg({ password: 'Password is required.'})
          setIsSubmit(false)
          return;
        }
        if(!data.password_confirmation){
          setErrMsg({password_confirmation: 'Password Confirmation is required.'})
          setIsSubmit(false)
          return;
        }
        if(data.password !== data.password_confirmation){
          setErrMsg({...errMsg, password_confirmation: 'Password do not match.'})
          setIsSubmit(false)
          return;
        }
        /*  */
        const formData = {
          email: data.email,
          password: data.password,
        }
        //console.log(formData)
        setIsSubmit(false);   
        /*  */
        try{
          const result = await axios.post(`${baseURL}register`, formData)
          .then((response) => {
            if(response.data.status == 0){
              const message = response.data.message;
              setErrMsg({email: message });
              setIsSubmit(false);
              toast.warn(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
              });
              return;
            }
            if(response.data.status == 1) {
              toast.success(response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
              });
              router.push('/login'); 
              setIsSubmit(false);    
            }
          
          })
          } catch (error) {
              console.error(`Error: ${error}`);
              setIsSubmit(false); 
        }
    
      }
    
    useEffect(() => {
      isSubmit && postData();
    }, [isSubmit]);




  return (
    <section className='w-[100%]'>
        <div className='mx-auto w-[90%] flex items-center justify-center flex-col pt-[8rem] pb-[5rem]'>
            <h6>Register</h6>
            <section className="w-[50%] mx-auto bg-white drop-shadow-lg rounded-lg overflow-hidden px-6 py-8">
                
                <div className='mb-4'>
                    <button className='text-white rounded-lg px-6 py-4 bg-gradient-to-br from-blue-500 to-green-600 hover:bg-gradient-to-br hover:from-green-500 hover:to-blue-600 transition-all duration-200 ease-in-out'>
                        Register with Gmail.
                    </button>
                </div>

                <div className='flex items-center justify-between gap-2 mb-4'>
                    <hr className='border-slate-500 w-[50%]' />
                    <span className=''>OR</span>
                    <hr className='border-slate-500 w-[50%]' />
                </div>

                <div className=' mb-[1.5rem]'> 
                    <Link href='/login' className='transition-all ease-in-out underline hover:no-underline text-green-600 hover:text-green-700'>
                        Sign in to your Account.</Link>
                </div>

                <div className='mb-4'>
                    <p className='font-semibold mb-1'>Email:</p>
                    <input 
                        type='text' 
                        name='email' 
                        onChange={handleInput}
                        placeholder='Enter Email here...'
                        className='w-[100%] outline-none border border-slate-300 px-4 py-3 rounded-lg' />
                    {errMsg.email &&
                      <p className='text-red-600'>
                        {errMsg.email}</p>
                    }
                </div>
                <div className='mb-4'>
                    <p className='font-semibold mb-1'>Password:</p>
                    <input 
                        type='password' 
                        name='password'
                        onChange={handleInput} 
                        placeholder='Enter Password here...'
                        className='w-[100%] outline-none border border-slate-300 px-4 py-3 rounded-lg' />
                    {errMsg.password &&
                      <p className='text-red-600'>
                        {errMsg.password}</p>
                    }
                </div>
                <div className='mb-4'>
                    <p className='font-semibold mb-1'>Confirm Password:</p>
                    <input 
                        type='password' 
                        name='password_confirmation' 
                        onChange={handleInput}
                        placeholder='Enter Confirm Password here...'
                        className='w-[100%] outline-none border border-slate-300 px-4 py-3 rounded-lg' />
                    {errMsg.password_confirmation &&
                      <p className='text-red-600'>
                        {errMsg.password_confirmation}</p>
                    }
                </div>

                {/* BUTTON */}
                <div className='w-[100%] flex items-center justify-center'>
                    <button 
                      onClick={() => setIsSubmit(true)} 
                      className='flex items-center justify-center gap-3 group text-white duration-200 transition-all ease-in-out text-md rounded-full p-5 w-[20rem] bg-gradient-to-br from-green-600 to-cyan-700 hover:drop-shadow-md hover:bg-gradient-to-br hover:from-cyan-700 hover:to-green-600'>
                        { isSubmit == true 
                            ? 'Processing' :
                            <>
                                Submit 
                                <FaArrowRightLong className='group-hover:translate-x-2 duration-200 transition-all ease-in-out' />
                            </>
                        }
                    </button>
                </div>
        
            </section>
        </div>
    </section>
  )
}
