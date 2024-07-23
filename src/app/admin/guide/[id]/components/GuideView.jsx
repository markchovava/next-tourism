"use client";
import axiosClientAPI from '@/api/axiosClientAPI';
import { baseURL } from '@/api/baseURL';
import Loader from '@/app/components/Loader';
import { tokenAuth } from '@/tokens/tokenAuth';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'



export default function GuideView({ id }) {
  const [data, setData] = useState();
  const { getAuthToken } = tokenAuth();
  if(!getAuthToken()) { 
    redirect('/login');
  }
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
  }};

  /* GET DATA */
  async function getData() {
    try{
      const result = await axiosClientAPI.get(`guide/${id}`, config)
      .then((response) => {
        console.log(response.data?.data)
        setData(response.data?.data)
      })
    } catch (error) {
      console.error(`Error: ${error}`)
    }   
  }  

  useEffect(() => {
    getData()
  }, []);

  if(!data){
    return (
      <Loader />
    )
  }


  return (
    <section className='w-[100%]'>
        <div className='mx-auto w-[90%] pb-[4rem] text-lg'>
          {/*  */}
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%]'>Landscape:</div>
            <div className='w-[80%]'>
              <div className='h-[12rem] aspect-[5/2] rounded-xl overflow-hidden'>
                <img src={baseURL + data?.landscape} className='w-[100%] h-[100%] object-cover' />
              </div>
            </div>
          </div>
          {/*  */}
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%]'>Portrait:</div>
            <div className='w-[80%]'>
              <div className='h-[12rem] aspect-[10/7] rounded-xl overflow-hidden'>
                <img src={baseURL + data?.portrait} className='w-[100%] h-[100%] object-cover' />
              </div>
            </div>
          </div>
          {/*  */}
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%] '>Name:</div>
            <div className='w-[80%] font-semibold'>{data?.name}</div>
          </div>
          {/*  */}
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%] '>Description:</div>
            <div className='w-[80%] font-semibold'>{data?.description}</div>
          </div>
          {/*  */}
          <div className='w-[100%] flex items-center justify-start gap-4 mb-4'>
            <div className='w-[20%] '>Priority:</div>
            <div className='w-[80%] font-semibold'>
              <span className='px-2 py-1 rounded-lg bg-green-700 text-white'>
                {data?.priority}</span>
            </div>
          </div>
          {/*  */}
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%]'>Slug:</div>
            <div className='w-[80%] font-semibold'>{data?.slug}</div>
          </div>
          {/*  */}
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%]'>Author:</div>
            <div className='w-[80%]  font-semibold'>
              {data?.user?.name ? data?.user?.name : data?.user?.email }
            </div>
          </div>
        </div>
    </section>
  )
}
