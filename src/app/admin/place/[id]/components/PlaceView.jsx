"use client";
import axiosClientAPI from '@/api/axiosClientAPI';
import { baseURL } from '@/api/baseURL';
import Loader from '@/app/components/Loader';
import { tokenAuth } from '@/tokens/tokenAuth';
import React, { useEffect, useState } from 'react'



export default function PlaceView({ id }) {
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
      const result = await axiosClientAPI.get(`place/${id}`, config)
      .then((response) => {
        setData(response.data?.data)
      })
    } catch (error) {
      console.error(`Error: ${error}`)
    }   
  }  

  useEffect(() => {
    getData()
  }, []);

  if(!data){ return ( <Loader /> ) }


  return (
    <section className='w-[100%]'>
        <div className='mx-auto w-[90%] pb-[4rem]'>
          {/*  */}
          {data?.place_images.length > 0 &&
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%] font-semibold'>Image:</div>
            <div className='w-[80%] grid grid-cols-3 gap-6'>
            {data?.place_images.map((i, key) => (
                <div className='w-[100%] aspect-[5/3] rounded-xl overflow-hidden'>
                  <img src={baseURL + i.image} className='w-[100%] h-[100%] object-cover' />
                </div>

            ))}
            </div>
          </div>
          }
          {/*  */}
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%] font-semibold'>Name:</div>
            <div className='w-[80%]'>{data?.name}</div>
          </div>
          {/*  */}
          <div className='w-[100%] flex items-center justify-start gap-4 mb-4'>
            <div className='w-[20%] font-semibold'>Priority:</div>
            <div className='w-[80%]'>{data?.priority}</div>
          </div>
          {/*  */}
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%] font-semibold'>Address:</div>
            <div className='w-[80%]'>{data?.address}</div>
          </div>
          {/*  */}
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%] font-semibold'>Phone:</div>
            <div className='w-[80%]'>{data?.phone}</div>
          </div>
          {/*  */}
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%] font-semibold'>Email:</div>
            <div className='w-[80%]'>{data?.email}</div>
          </div>
          {/*  */}
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%] font-semibold'>Website:</div>
            <div className='w-[80%]'>{data?.website}</div>
          </div>
          {/*  */}
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%] font-semibold'>Description:</div>
            <div className='w-[80%]'>{data?.description}</div>
          </div>
          {/*  */}
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%] font-semibold'>Slug:</div>
            <div className='w-[80%]'>{data?.slug}</div>
          </div>
          {/*  */}
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%] font-semibold'>City:</div>
            <div className='w-[80%]'>
              {data?.city?.name ? data?.city?.name : 'Not yet added.'}
            </div>
          </div>
          {/*  */}
          {data?.categories?.length > 0 &&
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%] font-semibold'>Categories:</div>
            <div className='w-[80%]'>
              {data?.categories.map((i, key) => (
                <>
                  <span className='italic text-green-700 font-semibold'>{i.name}, </span>
                </>
              ))}
            </div>
          </div>
          }
          {/*  */}
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%] font-semibold'>Province:</div>
            <div className='w-[80%]'>
              {data?.province?.name ? data?.province?.name : 'Not yet added.'}
            </div>
          </div>
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%] font-semibold'>Author:</div>
            <div className='w-[80%]'>
              {data?.user?.name ? data?.user?.name : data?.user?.email }
            </div>
          </div>
        </div>
    </section>
  )
}
