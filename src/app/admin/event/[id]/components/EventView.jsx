"use client";
import axiosClientAPI from '@/api/axiosClientAPI';
import { baseURL } from '@/api/baseURL';
import Loader from '@/app/components/Loader';
import { tokenAuth } from '@/tokens/tokenAuth';
import React, { useEffect, useState } from 'react'



export default function EventView({ id }) {
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
      const result = await axiosClientAPI.get(`event/${id}`, config)
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

  if(!data){
    return (
      <Loader />
    )
  }


  return (
    <section className='w-[100%]'>
        <div className='mx-auto w-[90%] pb-[4rem] text-lg'>
          {/*  */}
          {data?.landscape &&
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%]'>Landscape:</div>
            <div className='w-[80%]'>
              <div className='h-[12rem] aspect-[5/2] rounded-xl overflow-hidden'>
                <img src={baseURL + data?.landscape} className='w-[100%] h-[100%] object-cover' />
              </div>
            </div>
          </div>
          }
          {/*  */}
          {data?.portrait &&
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%]'>Portrait:</div>
            <div className='w-[80%]'>
              <div className='h-[12rem] aspect-[10/7] rounded-xl overflow-hidden'>
                <img src={baseURL + data?.portrait} className='w-[100%] h-[100%] object-cover' />
              </div>
            </div>
          </div>
          }
          {/*  */}
          {data?.name && 
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%] '>Name:</div>
            <div className='w-[80%] font-semibold'>{data?.name}</div>
          </div>
          }
          {/*  */}
          {data?.description && 
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%] '>Description:</div>
            <div className='w-[80%] font-semibold'>{data?.description}</div>
          </div>
          }
          {/*  */}
          {data?.priority &&
          <div className='w-[100%] flex items-center justify-start gap-4 mb-4'>
            <div className='w-[20%] '>Priority:</div>
            <div className='w-[80%] font-semibold'>
              <span className='px-2 py-1 rounded-lg bg-green-700 text-white'>
                {data?.priority}</span>
            </div>
          </div>
          }
          {/*  */}
          {data?.date &&
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%]'>Date:</div>
            <div className='w-[80%] font-semibold flex items-center justify-start gap-2'>
              <span>{data?.date ? data?.date : 'Not added.'}</span>
              <span>{data?.time ? data?.time : 'Not added.'} </span>
            </div>
          </div>
          }
          {/*  */}
          {data?.city?.name &&
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%]'>City:</div>
            <div className='w-[80%] font-semibold'>{data?.city?.name ? data?.city?.name : 'Not added.'}</div>
          </div>
          }
          {/*  */}
          {data?.address &&
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%]'>Address:</div>
            <div className='w-[80%] font-semibold'>{data?.address}</div>
          </div>
          }
          {/*  */}
          {data?.phone &&
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%]'>Phone:</div>
            <div className='w-[80%] font-semibold'>{data?.phone}</div>
          </div>
          }
          {/*  */}
          {data?.email &&
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%]'>Email:</div>
            <div className='w-[80%] font-semibold'>{data?.email}</div>
          </div>
          }
          {/*  */} 
         {data?.user?.name &&
          <div className='w-[100%] flex items-center justify-start gap-4 mb-6'>
            <div className='w-[20%]'>Author:</div>
            <div className='w-[80%]  font-semibold'>
              {data?.user?.name ? data?.user?.name : data?.user?.email }
            </div>
          </div>
         }
        </div>
    </section>
  )
}
