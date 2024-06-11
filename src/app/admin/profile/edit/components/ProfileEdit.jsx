"use client";
import axiosClientAPI from '@/api/axiosClientAPI';
import Loader from '@/app/components/Loader';
import { tokenAuth } from '@/tokens/tokenAuth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast, Bounce } from 'react-toastify';




export default function ProfileEdit() {
    const router = useRouter();
    const [data, setData] = useState();
    const [errMsg, setErrMsg] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const { getAuthToken } = tokenAuth()
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`
    }};

    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    /* GET DATA */
    async function getData() {
        try{
        const result = await axiosClientAPI.get(`auth`, config)
        .then((response) => {
            console.log(response.data.data)
            setData(response.data.data)
        })
        } catch (error) {
        console.error(`Error: ${error}`)
        }   
    }  

  /* GET DATA */
  async function postData() {
    const formData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
    };
    try{
      const result = await axiosClientAPI.post(`auth`, formData, config)
      .then((response) => {
        if(response.data.status == 0){
            const message = response.data.message;
            setErrMsg({email: message})
            toast.success(message, {
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
            setIsSubmit(false)
            return;
        }
        if(response.data.status == 1){
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
            router.push('/admin/profile')
            setIsSubmit(false)
            return;

        }
      })
    } catch (error) {
      console.error(`Error: ${error}`)
    }   
  }  

  useEffect(() => {
    getData()
  }, []);


  useEffect(() => {
    isSubmit == true && postData();
  }, [isSubmit]);

  if(!data){
    return (
      <Loader />
    )
  }
    
  return (
    <section className='w-[100%]'>
         <div className='mx-auto w-[90%]'>
            {/* NAME */}
            <div className='mb-6'>
                <p className='mb-2 font-semibold'>Name:</p>
                <input 
                    type='text' 
                    name='name'
                    value={data.name}
                    onChange={handleInput}
                    placeholder="Enter Email here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300' />
            </div>
            {/* EMAIL */}
            <div className='mb-6'>
                <p className='mb-2 font-semibold'>Email:</p>
                <input 
                    type='text' 
                    name='email'
                    value={data.email}
                    onChange={handleInput}
                    placeholder="Enter Email here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300' />
                {errMsg.email &&
                    <p className='text-red-600'>{errMsg.email}</p>
                }
            </div>
            {/* Phone */}
            <div className='mb-6'>
                <p className='mb-2 font-semibold'>Phone:</p>
                <input 
                    type='text'
                    name='phone'
                    value={data.phone}
                    onChange={handleInput} 
                    placeholder="+263 782 100 200"
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300' />
            </div>
            {/* Address */}
            <div className='mb-6'>
                <p className='mb-2 font-semibold'>Address:</p>
                <input 
                    type='text' 
                    name='address'
                    value={data.address}
                    onChange={handleInput} 
                    placeholder="Enter Address here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
            </div>
            {/* Submit */}
            <div className='flex items-center justify-center pb-[4rem]'>
                <button 
                    onClick={() => setIsSubmit(true)}
                    className='btn__one'>
                    {isSubmit == true ? 'Processing' : 'Submit' }
                </button>
            </div>
        </div>
    </section>
  )
}
