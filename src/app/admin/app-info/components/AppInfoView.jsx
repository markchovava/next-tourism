"use client"
import axiosClientAPI from '@/api/axiosClientAPI';
import { baseURL } from '@/api/baseURL';
import Loader from '@/app/components/Loader';
import { tokenAuth } from '@/tokens/tokenAuth';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'




export default function AppInfoView({ dbData }) {
  const [data, setData] = useState(dbData?.data);

  
  if(!data){ return ( <Loader /> ) }


  return (
    <section>
        <div className='mx-auto w-[90%] pb-[4rem]'>
          {/* IMAGE */}
          {data.image && 
          <div className='w-[100%] flex items-center justify-start gap-4 mb-4'>
            <div className='w-[20%] font-semibold'>Image:</div>
            <div className='w-[80%]'>
              <div className='w-[40%] aspect-[5/3] overflow-hidden rounded-lg'>
                <img src={baseURL + data.image} className='W-[100%] h-[100%] object-fill' alt='image' />
              </div>
            </div>
          </div>
          }
          {/* NAME */}
          {data.name &&
          <div className='w-[100%] flex items-center justify-start gap-4 mb-4'>
            <div className='w-[20%] font-semibold'>Name:</div>
            <div className='w-[80%]'>{data?.name}</div>
          </div>
          }
      
          {/* EMAIL */}
          {data?.email &&
          <div className='w-[100%] flex items-center justify-start gap-4 mb-4'>
            <div className='w-[20%] font-semibold'>Email:</div>
            <div className='w-[80%]'>{data?.email}</div>
          </div>
          }
          {/* PHONE */}
          {data?.phone &&
          <div className='w-[100%] flex items-center justify-start gap-4 mb-4'>
            <div className='w-[20%] font-semibold'>Phone:</div>
            <div className='w-[80%]'>{data?.phone}</div>
          </div>
          }
          {/* WEBSITE */}
          {data.website && 
          <div className='w-[100%] flex items-center justify-start gap-4 mb-4'>
            <div className='w-[20%] font-semibold'>Website:</div>
            <div className='w-[80%]'>{data.website}</div>
          </div>
          }
          {/* ADDRESS */}
          {data.address && 
          <div className='w-[100%] flex items-center justify-start gap-4 mb-4'>
            <div className='w-[20%] font-semibold'>Address:</div>
            <div className='w-[80%]'>{data.address}</div>
          </div>
          }
          {/* FACEBOOK */}
          {data.facebook && 
          <div className='w-[100%] flex items-center justify-start gap-4 mb-4'>
            <div className='w-[20%] font-semibold'>Facebook:</div>
            <div className='w-[80%]'>{data.facebook}</div>
          </div>
          }
          {/* WHATSAPP */}
          {data.whatsapp &&
          <div className='w-[100%] flex items-center justify-start gap-4 mb-4'>
            <div className='w-[20%] font-semibold'>WhatsApp:</div>
            <div className='w-[80%]'>{data.whatsapp}</div>
          </div>
          }
          {/* INSTAGRAM */}
          {data.instagram &&
          <div className='w-[100%] flex items-center justify-start gap-4 mb-4'>
            <div className='w-[20%] font-semibold'>Instagram:</div>
            <div className='w-[80%]'>{data.instagram}</div>
          </div>
          }
          {/* INSTAGRAM */}
          {data?.user?.name && 
          <div className='w-[100%] flex items-center justify-start gap-4 mb-4'>
            <div className='w-[20%] font-semibold'>Author:</div>
            <div className='w-[80%]'>{data.user.name ? data.user.name : data.user.email}</div>
          </div>
          }

        </div>
    </section>
  )
}
