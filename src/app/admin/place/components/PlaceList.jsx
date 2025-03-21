"use client"
import axiosClientAPI from '@/api/axiosClientAPI'
import Loader from '@/app/components/Loader'
import { tokenAuth } from '@/tokens/tokenAuth'
import { tokenRole } from '@/tokens/tokenRole'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaEye, FaSearch } from 'react-icons/fa'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { toast, Bounce } from 'react-toastify'
import { TbCategoryPlus } from "react-icons/tb";
import { RiGuideLine } from "react-icons/ri";
import { redirect } from 'next/navigation'
import { darkBounce } from '@/utils/roastifyDark'
import { placeDeleteApiAction, placeListApiAction, placePaginationApiAction, placeSearchListApiAction } from '@/actions/placeActions'
import { AdminContextState } from '@/contexts/AdminContext'


export default function PlaceList({ dbData }) {
    const { placeState, placeDispatch } = AdminContextState();
    const [data, setData] = useState();
    const [search, setSearch] = useState('')
    const [isSearch, setIsSearch] = useState(false)
    const { getAuthToken } = tokenAuth();
    const { getRoleToken } = tokenRole();
    /* PAGINATION */
    const [nextURL, setNextURL] = useState()
    const [prevURL, setPrevURL] = useState()
    useEffect(() => {
      placeDispatch({type: 'ADD_DATA', payload: {
        items: dbData?.data,
        nextURL: dbData?.links?.next,
        prevURL: dbData?.links?.prev,
      }})
    }, []);
    /* PAGINATION DATA */
    async function paginationHandler(url) {
        try{
        const res = await placePaginationApiAction(url)
          placeDispatch({type: 'ADD_DATA', payload: {
            items: res?.data,
            nextURL: res?.links?.next,
            prevURL: res?.links?.prev,
          }})
   
        } catch (error) {
        console.error(`Error: ${error}`)
        }     
    }
    /* GET DATA */
    async function getData() {
        try{
          const res = await placeListApiAction();
          placeDispatch({type: 'ADD_DATA', payload: {
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
        setIsSearch(false);
        return;
        }
        try{
        const res = await placeSearchListApiAction(search);
          placeDispatch({type: 'ADD_DATA', payload: {
            items: res?.data,
            nextURL: res?.links?.next,
            prevURL: res?.links?.prev,
          }});
          setIsSearch(false);
     
        } catch (error) {
        console.error(`Error: ${error}`)
        setIsSearch(false);
        }   
    } 
    /* DELETE DATA */
    async function deleteData(id) {
        try{
          const res = await placeDeleteApiAction(id);
          if(res.status == 1) {
            toast.success(res?.message, darkBounce);
            await getData();
            return;
          }
        } catch (error) {
        console.error(`Error: ${error}`)
        }   
    }   


    if(!placeState?.items){ return ( <Loader /> ) }

  return (
    <div>
      <section className='w-[100%]'>
        <div className='w-[90%] mx-auto flex items-center justify-between pb-[1rem]'>
          <form action={searchData} onSubmit={() => setIsSearch(true)} className='w-[45%] flex items-center justify-start'>
            <input type='text' 
              value={search}
              onChange={(e) => setSearch(e.target.value)} 
              placeholder='Enter name here...'
              className='w-[85%] h-[3rem] rounded-l-lg p-3 outline-none border border-slate-300' />
            <button 
              type='submit'
              className='w-[15%] h-[3rem] border-y border-r rounded-r-lg text-lg border-slate-300 flex items-center justify-center p-3'>
              {isSearch ? 
                  <span className='animate-pulse w-[15px] h-[15px] rounded-full bg-slate-900'></span> 
                : 
                  <FaSearch />
              }
            </button>
          </form>
          <div className='flex items-center justify-end gap-6'>
            {/* PAGINATION */}
            <div className='flex items-center justify-end gap-3'>
              {placeState?.prevURL && 
                <button 
                  onClick={() => paginationHandler(placeState?.prevURL)}
                  className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-green-500 to-blue-700'>
                  <FaArrowLeftLong className='group-hover:-translate-x-2 duration-200 transition-all ease-in-out text-green-600' /> 
                    Prev </button>
              }
              {placeState?.nextURL && 
                <button
                  onClick={() => paginationHandler(placeState?.nextURL)}
                  className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-green-600 to-blue-700'>
                    Next <FaArrowRightLong className='text-green-600 group-hover:translate-x-2 duration-200 transition-all ease-in-out' />
                </button>
              }
              </div>
            <Link href='/admin/place/add' 
              className='link__three'>
              Add</Link>
          </div>
        </div>
      </section>
      {/* TABLE TITLES */}
      <section className='w-[100%]'>
        <div className='w-[90%] mx-auto text-lg py-2 flex items-center justify-start font-bold font-white bg-slate-200 '>
          <div className='w-[25%] border-r border-white px-3 py-2'>Name</div>
          <div className='w-[20%] border-r border-white px-3 py-2'>City</div>
          <div className='w-[20%] border-r border-white px-3 py-2'>Province</div>
          <div className='w-[20%] border-r border-white px-3 py-2'>Author</div>
          <div className='w-[15%] px-3 py-2'>Action</div>
        </div>
      </section>
      {/* TABLE DATA */}
      <section className='w-[100%]'>
        { placeState?.items?.length > 0 ? 
          placeState?.items?.map((item, i) => (
            <div key={i} className='w-[90%] text-lg border-x border-b border-slate-300 mx-auto flex items-center justify-start '>
              {/* NAME */}
              <div className='w-[25%] border-r border-blue-300 px-3 py-2 flex items-center justify-between gap-2'>
                <p className=''>{item.name}</p>
                {item.priority && 
                  <span className='bg-green-600 text-white rounded-full p-1 mb-1'>
                    {item.priority}
                  </span>
                }
              </div>
              {/* CITY */}
              <div className='w-[20%] border-r border-blue-300 px-3 py-2'>
                {item?.city?.name ? item?.city?.name : 'Not yet added.'}
              </div>
              {/* PROVINCE */}
              <div className='w-[20%] border-r border-blue-300 px-3 py-2'>
                {item?.province?.name ? item?.province?.name : 'Not yet added.'}
              </div>
              {/* AUTHOR */}
              <div className='w-[20%] border-r border-blue-300 px-3 py-2'>
                {item?.user?.name ? item?.user?.name : item?.user?.email }
              </div>
              <div className='w-[15%] text-xl px-3 py-2 flex items-center justify-start gap-4'>
                <Link title='View' href={`/admin/place/${item.id}`}> <FaEye className='hover:text-blue-500 duration-150 hover:scale-110 transition-all ease-in'/> </Link>
                <Link title='Edit' href={`/admin/place/edit/${item.id}`}> <MdEdit className='hover:text-green-500 duration-150 hover:scale-110 transition-all ease-in' /> </Link>  
                <Link title='Category' href={`/admin/place/category/${item.id}`}> 
                  <TbCategoryPlus 
                    className='hover:text-pink-600 duration-150 hover:scale-110 transition-all ease-in' /> 
                </Link>  
                <Link title='Guide' href={`/admin/place/guide/${item.id}`}> 
                  <RiGuideLine 
                    className='hover:text-orange-600 duration-150 hover:scale-110 transition-all ease-in' /> 
                </Link>  
                
                <button title='Delete'
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
            {placeState?.prevURL && 
                <button 
                  onClick={() => paginationHandler(placeState?.prevURL)}
                  className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-green-600 to-blue-700'>
                  <FaArrowLeftLong className='group-hover:-translate-x-2 duration-200 transition-all ease-in-out text-green-600' /> 
                    Prev </button>
            }
            {placeState?.nextURL && 
              <button
                  onClick={() => paginationHandler(placeState?.nextURL)}
                  className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-green-600 to-blue-700'>
                    Next <FaArrowRightLong className='text-green-600 group-hover:translate-x-2 duration-200 transition-all ease-in-out' />
                </button>
            }
        </div>
      </section>
    </div>
  )
}
