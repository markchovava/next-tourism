"use client";
import { appInfoStoreApiAction } from '@/actions/appInfoActions';
import axiosClientAPI from '@/api/axiosClientAPI';
import { baseURL } from '@/api/baseURL';
import Loader from '@/app/components/Loader';
import { tokenAuth } from '@/tokens/tokenAuth';
import { darkBounce } from '@/utils/roastifyDark';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast, Bounce } from 'react-toastify';




export default function AppInfoEdit({ dbData }) {
    const router = useRouter();
    const [data, setData] = useState(dbData?.data);
    const [image, setImage] = useState(baseURL + dbData?.data?.image);
    const [errMsg, setErrMsg] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }
  
  /* POST DATA */
  async function postData() {
    if(!data?.name){
      const message = 'Name is required.';
      setErrMsg({name: message});
      toast.warn(message, darkBounce);
      return;
    }
    const formData = new FormData();
    formData.append('name', data?.name);
    formData.append('email', data?.email);
    formData.append('phone', data?.phone);
    formData.append('address', data?.address);
    formData.append('website', data?.website);
    formData.append('facebook', data?.facebook);
    formData.append('whatsapp', data?.whatsapp);
    formData.append('instagram', data?.instagram);
    formData.append('image', data?.image);
    try{
      const res = await appInfoStoreApiAction(formData);
        if(res?.status == 0){
            const message = res?.message;
            setErrMsg({email: message})
            setIsSubmit(false)
            toast.success(message, darkBounce);
            return;
        }
        if(res.status == 1){
          toast.success(res?.message, darkBounce);
          router.push('/admin/app-info')
          setIsSubmit(false)
          return;

        }
     
    } catch (error) {
      console.error(`Error: ${error}`)
    }   
  }  

 
  if(!data){ return ( <Loader /> ) }
    
  return (
    <section className='w-[100%]'>
         <div className='mx-auto w-[90%]'>
          <form action={postData} onSubmit={() => setIsSubmit(true)}>
            {/* IMAGE */}
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
                    <img src={image ? image : baseURL + 'assets/img/no-img.jpg'} className="w-[100%] h-[100%] object-cover" />
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
                {errMsg?.name &&
                <div className='text-sm text-red-500'>{errMsg?.name}</div>
                }
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
            {/* PHONE */}
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
            {/* WEBSITE */}
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
                  type='submit'
                    className='btn__one'>
                    {isSubmit == true ? 'Processing' : 'Submit' }
                </button>
            </div>
          </form>
        </div>
    </section>
  )
}
