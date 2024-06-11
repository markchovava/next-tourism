"use client";
import axiosClientAPI from '@/api/axiosClientAPI';
import Loader from '@/app/components/Loader';
import { tokenAuth } from '@/tokens/tokenAuth';
import React, { useEffect, useState } from 'react'



export default function ProvinceView({ id }) {
  const [data, setData] = useState();
  const { getAuthToken } = tokenAuth()
  const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
  }};

  /* GET DATA */
  async function getData() {
    try{
      const result = await axiosClientAPI.get(`province/${id}`, config)
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
        <div className='mx-auto w-[90%] pb-[4rem]'>
          <div className='w-[100%] flex items-center justify-start gap-4 mb-4'>
            <div className='w-[20%] font-semibold'>Name:</div>
            <div className='w-[80%]'>{data?.name}</div>
          </div>
          {/*  */}
          <div className='w-[100%] flex items-center justify-start gap-4 mb-4'>
            <div className='w-[20%] font-semibold'>Priority:</div>
            <div className='w-[80%]'>{data?.priority}</div>
          </div>
          {/*  */}
          <div className='w-[100%] flex items-center justify-start gap-4 mb-4'>
            <div className='w-[20%] font-semibold'>Slug:</div>
            <div className='w-[80%]'>{data?.slug}</div>
          </div>
          
          <div className='w-[100%] flex items-center justify-start gap-4 mb-4'>
            <div className='w-[20%] font-semibold'>Author:</div>
            <div className='w-[80%]'>
              {data?.user?.name ? data?.user?.name : data?.user?.email }
            </div>
          </div>
        </div>
    </section>
  )
}
