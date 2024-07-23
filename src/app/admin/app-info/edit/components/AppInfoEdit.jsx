"use client";
import axiosClientAPI from '@/api/axiosClientAPI';
import { baseURL } from '@/api/baseURL';
import Loader from '@/app/components/Loader';
import { tokenAuth } from '@/tokens/tokenAuth';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast, Bounce } from 'react-toastify';




export default function AppInfoEdit() {
    const router = useRouter();
    const [data, setData] = useState();
    const [image, setImage] = useState();
    const [errMsg, setErrMsg] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const { getAuthToken } = tokenAuth();
    if(!getAuthToken()) { 
      redirect('/login');
    }

    const config = {
        headers: {
            'Content-Type': "multipart/form-data",
            'Authorization': `Bearer ${getAuthToken()}`
    }};

    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

  /* GET DATA */
  async function getData() {
        try{
        const result = await axiosClientAPI.get(`app-info`, config)
        .then((response) => {
            console.log(response.data.data)
            setData(response.data.data)
            if(response.data.data.image){ setImage(baseURL + response.data.data.image) }
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
        website: data.website,
        facebook: data.facebook,
        whatsapp: data.whatsapp,
        instagram: data.instagram,
        image: data.image,
    };
    try{
      const result = await axiosClientAPI.post(`app-info`, formData, config)
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
            router.push('/admin/app-info')
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
            <div className='mb-6'>
                  <h6 className='font-bold mb-2'>Image:</h6>
                  <input 
                    type='file' 
                    name='image'
                    onChange={(e) => {
                        setData({...data, image: e.target.files[0]})
                        setImage(URL.createObjectURL(e.target.files[0]))
                    }}
                    className='mb-4 w-[40%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
                  <div className="w-[30%] overflow-hidden rounded-lg bg-slate-50 aspect-[5/3]">
                    <img src={image ? image : ''} className="w-[100%] h-[100%] object-cover" />
                  </div>
            </div>
            {/* NAME */}
            <div className='mb-6'>
                <p className='mb-2 font-semibold'>Name:</p>
                <input 
                    type='text' 
                    name='name'
                    value={data.name}
                    onChange={handleInput}
                    placeholder="Enter Name here..."
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
            </div>
            {/* NAME */}
            <div className='mb-6'>
                <p className='mb-2 font-semibold'>Phone:</p>
                <input 
                    type='text' 
                    name='phone'
                    value={data.phone}
                    onChange={handleInput}
                    placeholder="Enter Phone Number here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300' />
            </div>
            {/*  */}
            <div className='mb-6'>
                <p className='mb-2 font-semibold'>Website:</p>
                <input 
                    type='text' 
                    name='website'
                    value={data.website}
                    onChange={handleInput}
                    placeholder="Enter Website here..."
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
            {/* WhatsApp */}
            <div className='mb-6'>
                <p className='mb-2 font-semibold'>WhatsApp:</p>
                <input 
                    type='text' 
                    name='whatsapp'
                    value={data.whatsapp}
                    onChange={handleInput} 
                    placeholder="Enter WhatsApp here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
            </div>
            {/* Facebook */}
            <div className='mb-6'>
                <p className='mb-2 font-semibold'>Facebook:</p>
                <input 
                    type='text' 
                    name='facebook'
                    value={data.facebook}
                    onChange={handleInput} 
                    placeholder="Enter Facebook here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
            </div>
            {/* Instagram */}
            <div className='mb-6'>
                <p className='mb-2 font-semibold'>Instagram:</p>
                <input 
                    type='text' 
                    name='instagram'
                    value={data.instagram}
                    onChange={handleInput} 
                    placeholder="Enter Instagram here..."
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
