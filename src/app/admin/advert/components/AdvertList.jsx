"use client"
import axiosClientAPI from '@/api/axiosClientAPI'
import Loader from '@/app/components/Loader'
import { tokenAuth } from '@/tokens/tokenAuth'
import { darkBounce } from '@/utils/roastifyDark'
import Link from 'next/link'
import React, { useEffect, useState, useTransition } from 'react'
import { FaEye, FaSearch } from 'react-icons/fa'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { toast } from 'react-toastify'
import { AdminContextState } from '@/contexts/AdminContext'
import { advertDeleteApiAction, advertListApiAction, advertPaginationApiAction, advertSearchApiAction } from '@/actions/advertActions'


export default function AdvertList({ dbData }) {
    const {advertState, advertDispatch} = AdminContextState();
    useEffect(() => {
      advertDispatch({type: 'ADD_DATA', payload: {
        items: dbData?.data,
        nextURL: dbData?.links?.next,
        prevURL: dbData?.links?.prev,
        }
      });
    }, []);
    const [isPending, startTransition] = useTransition();
    const [search, setSearch] = useState('')
    /* PAGINATION DATA */
    async function paginationHandler(url) {
        try{
        const res = await advertPaginationApiAction(url)
        advertDispatch({type: 'ADD_DATA', payload: {
          items: res?.data,
          nextURL: res?.links?.next,
          prevURL: res?.links?.prev,
        }
        });
        } catch (error) {
        console.error(`Error: ${error}`)
        }     
    }
    /* GET DATA */
    async function getData() {
        try{
        const result = await advertListApiAction();
        advertDispatch({type: 'ADD_DATA', payload: {
          items: res?.data,
          nextURL: res?.links?.next,
          prevURL: res?.links?.prev,
        }});
        } catch (error) {
        console.error(`Error: ${error}`)
        }   
    }    
    /* search DATA */
    async function searchData() {
        if(search === ''){
        await getData();
        return;
        }
        try{
        const res = await advertSearchApiAction(search);
        startTransition(() => res);
        advertDispatch({type: 'ADD_DATA', payload: {
          items: res?.data,
          nextURL: res?.links?.next,
          prevURL: res?.links?.prev,
        }});
        } catch (error) {
        console.error(`Error: ${error}`)
        }   
    } 
    /* DELETE DATA */
    async function deleteData(id) {
        try{
        const res = await advertDeleteApiAction(id)
        toast.success(res?.message, darkBounce);
        await getData();
        } catch (error) {
        console.error(`Error: ${error}`)
        }   
    }   


    if(!advertState?.items) { return ( <Loader /> ) }


  return (
    <div>
      <section className='w-[100%]'>
        <div className='w-[90%] mx-auto flex items-center justify-between pb-[1rem]'>
          <form action={searchData} className='w-[45%] flex items-center justify-start'>
            <input type='text' 
              value={search}
              onChange={(e) => setSearch(e.target.value)} 
              placeholder='Enter name here...'
              className='w-[85%] h-[3rem] rounded-l-lg p-3 outline-none border border-slate-300' />
            <button 
              type='submit'
              className='w-[15%] h-[3rem] border-y border-r rounded-r-lg text-lg border-slate-300 flex items-center justify-center p-3'>
              {isPending === true ? 
                  <span className='animate-pulse w-[15px] h-[15px] rounded-full bg-slate-900'></span> 
                : 
                  <FaSearch />
              }
            </button>
          </form>
          <div className='flex items-center justify-end gap-6'>
            {/* PAGINATION */}
            <div className='flex items-center justify-end gap-3'>
              {advertState?.prevURL && 
                <button 
                  onClick={() => paginationHandler(advertState?.prevURL)}
                  className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-green-600 to-blue-600'>
                  <FaArrowLeftLong className='group-hover:-translate-x-2 duration-200 transition-all ease-in-out text-green-700' /> 
                    Prev </button>
              }
              {advertState?.nextURL && 
                <button
                  onClick={() => paginationHandler(advertState?.nextURL)}
                  className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-green-600 to-blue-600'>
                    Next <FaArrowRightLong className='text-green-700 group-hover:translate-x-2 duration-200 transition-all ease-in-out' />
                </button>
              }
              </div>
            <Link href='/admin/advert/add' 
              className='link__three'>
              Add</Link>
          </div>
        </div>
      </section>
      {/* TABLE TITLES */}
      <section className='w-[100%]'>
        <div className='w-[90%] mx-auto text-lg py-2 flex items-center justify-start font-bold font-white bg-slate-200 '>
          <div className='w-[25%] border-r border-white px-3 py-2'>NAME</div>
          <div className='w-[20%] border-r border-white px-3 py-2'>SLUG</div>
          <div className='w-[30%] border-r border-white px-3 py-2'>DESCRIPTION</div>
          <div className='w-[20%] border-r border-white px-3 py-2'>AUTHOR</div>
          <div className='w-[15%] px-3 py-2'>ACTION</div>
        </div>
      </section>
      {/* TABLE DATA */}
      <section className='w-[100%]'>
        {advertState?.items?.length > 0 ? 
          advertState?.items?.map((item, i) => (
            <div key={i} className='w-[90%] text-lg border-x border-b border-slate-300 mx-auto flex items-center justify-start '>
              <div className='w-[25%] border-r border-blue-300 px-3 py-2 flex items-center justify-between gap-2'>
                <p className=''>{item.name}</p>
                {item.priority && 
                  <span className='bg-green-600 text-white rounded-full font-semibold px-2 py-1 mb-1'>
                    {item.priority}
                  </span>
                }
              </div>
              <div className='w-[20%] border-r border-blue-300 px-3 py-2'>
                {item?.slug ? item?.slug : 'Not yet added.'}
              </div>
              <div className='w-[30%] border-r border-blue-300 px-3 py-2 flex items-center justify-start gap-2'>
                {item?.description?.length > 20 ? item?.description?.substring(0, 20) + '...' : item?.description}
              </div>
              <div className='w-[20%] border-r border-blue-300 px-3 py-2'>
                {item?.user?.name ? item?.user?.name : item?.user?.email }
              </div>
              <div className='w-[15%] px-3 py-2 flex items-center justify-start gap-4 text-xl'>
                <Link href={`/admin/advert/${item.id}`}> <FaEye className='hover:text-blue-500 duration-150 hover:scale-110 transition-all ease-in'/> </Link>
                <Link href={`/admin/advert/edit/${item.id}`}> <MdEdit className='hover:text-green-500 duration-150 hover:scale-110 transition-all ease-in' /> </Link>  
                <button 
                  onClick={() => deleteData(item.id)}> 
                    <MdDeleteForever 
                        className='hover:text-red-500 duration-150 hover:scale-110 transition-all ease-in' /> 
                </button>
              </div>
            </div>
          ))
        : 
          <div className="mx-auto w-[50rem] lg:w-[90%] flex items-center justify-center p-4">
            <p className='font-light text-[2.5rem]'>No Data Available...</p>
          </div>
        }

      </section>
     
      {/* PAGINATION */}
      <section className='w-[100%] mt-[2rem] mb-[4rem]'>
        <div className='mx-auto w-[90%] flex items-center justify-end gap-3'>
            {advertState?.prevURL && 
                <button 
                  onClick={() => paginationHandler(advertState?.prevURL)}
                  className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-green-600 to-blue-700'>
                  <FaArrowLeftLong className='group-hover:-translate-x-2 duration-200 transition-all ease-in-out text-green-700' /> 
                    Prev </button>
            }
            {advertState?.nextURL && 
              <button
                  onClick={() => paginationHandler(advertState?.nextURL)}
                  className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-gree-400 to-blue-700'>
                    Next <FaArrowRightLong className='text-blue-600 group-hover:translate-x-2 duration-200 transition-all ease-in-out' />
                </button>
            }
        </div>
      </section>
    </div>
  )
}
