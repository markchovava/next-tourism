"use client";
import axiosClientAPI from '@/api/axiosClientAPI';
import { baseURL } from '@/api/baseURL';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaAngleRight, FaArrowLeftLong, FaArrowRightLong, FaHeart, FaRegHeart } from 'react-icons/fa6';
import { IoIosSearch } from 'react-icons/io';



export default function ProvinceList({provinces}) {
    const [data, setData] = useState(provinces.data);
    const [nextURL, setNextURL] = useState(provinces?.links?.next);
    const [prevURL, setPrevURL] = useState(provinces?.links?.prev);
    const [isSearch, setIsSearch] = useState(false);
    const [search, setSearch] = useState('');
    /* PAGINATION DATA */
    async function paginationHandler(url) {
        try{
        const result = await axiosClientAPI.get(url, config)
        .then((response) => {
            setData(response.data.data)
            setPrevURL(response.data.links.prev)
            setNextURL(response.data.links.next)
        })
        } catch (error) {
        console.error(`Error: ${error}`)
        }     
    }

    /* GET DATA */
    async function getData() {
        try{
        const result = await axios.get(`${baseURL}province`)
        .then((response) => {
            setIsSearch(false);
            console.log(response.data.data)
            setData(response.data.data)
            setPrevURL(response.data.links.prev)
            setNextURL(response.data.links.next)
        })
        } catch (error) {
        console.error(`Error: ${error}`)
        }   
    }  

    async function searchData(){
        if(!search){
            console.log('not')
            getData();
            setIsSearch(false);
            return;
        }
        try{
            const result = await axios.get(`${baseURL}province?search=${search}`)
            .then((response) => {
                setIsSearch(false);
                console.log(response.data)
                setData(response.data?.data)
                setPrevURL(response.data?.links?.prev)
                setNextURL(response.data?.links?.next)
                return
            })
            } catch (error) {
            console.error(`Error: ${error}`)
            }  
    }

    useEffect(() => {
        isSearch === true && searchData();
    }, [isSearch])

  return (
    <div>
        {/* Bread Crumbs */}
      <section className='w-[100%]'>
            <div className='mx-auto w-[90%] border-b border-slate-200'>
                <ul className='flex items-center justify-start gap-2 py-2'>
                    <li><Link href='/'>Home</Link></li>
                    <li><FaAngleRight /></li>
                    <li><Link href='/province'>Province</Link></li>                               
                </ul>
            </div>
      </section>
        <section className='w-[100%]'>
            <div className='mx-auto w-[90%] flex items-center justify-center flex-col pt-[10rem] pb-[5rem]'>
                <h6>Find a province to visit</h6>
                <div className="w-[80%] mx-auto border border-slate-300 rounded-full overflow-hidden flex items-center justify-start">
                    <input 
                        type="text" 
                        name='search'
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-[90%] outline-none px-5 py-4 border-r border-slate-200" placeholder="Search places by name..." />
                   
                    <button 
                        onClick={() => setIsSearch(true)}
                        className="w-[10%] h-[100%] border-none outline-none flex items-center justify-center text-center">
                        <IoIosSearch className={` ${isSearch === true ? 'animate-pulse' : ''} text-2xl transition-all duration-300 ease-in-out hover:text-green-800 hover:drop-shadow-md`}/>
                    </button>
            
                </div>
            </div>
        </section>

        {/*  */}
        <section className='w-[100%]'>
            <div className='w-[90%] mx-auto pb-[5rem]'>
                <div className='w-[100%] flex items-center justify-between pb-3'>
                    <h6 className="text-[2.5rem] font-semibold">
                        Provinces
                    </h6>
                    {/* PAGINATION */}
                    <div className='flex items-center justify-end gap-3'>
                        {prevURL &&
                        <button
                            onClick={() => paginationHandler(prevURL)}
                            className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-green-600 to-cyan-700'>
                            <FaArrowLeftLong className='group-hover:-translate-x-2 duration-200 transition-all ease-in-out text-green-600' /> 
                            Prev 
                        </button>
                        }
                        {nextURL &&
                        <button 
                            onClick={() => paginationHandler(nextURL)}
                            className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-green-600 to-cyan-700'>
                            Next <FaArrowRightLong className='group-hover:translate-x-2 duration-200 transition-all ease-in-out text-green-600' />
                        </button>
                        }
                    </div>
                    
                </div>
                {/* DATA */}
                {data?.length > 0 ?
                <div className='grid lg:grid-cols-4 grid-cols-2 gap-8 mb-8'>
                    {/* COL */}
                    {data?.map((i, key) => (
                        <div key={key} className='relative group w-[100%] rounded-lg overflow-hidden aspect-[5/4] bg-slate-400 mb-3'>
                            <img src={baseURL + i.image} className='absolute w-[100%] h-[100%] object-cover zoom__inOut' />
                            
                            <div className='absolute bottom-0 left-0 w-[100%] h-[50%] bg-gradient-to-b from-transparent to-black opacity-75 text-white'>
                            </div>
                            <div className='absolute bottom-0 left-0 w-[100%] h-[50%] text-white text-[2rem] font-bold flex items-end px-3 pb-4'>
                                <Link href={`/province/${i.slug}`} className='link__two leading-tight'>
                                    {i.name} 
                                </Link>
                                
                            </div>
                        </div>
                    ))}
                </div>
                : 
                <div className='w-[100%] text-center mt-[1.2rem] mb-[1.5rem] font-light text-[2.5rem]'>
                    Data not found.
                </div>
                }
                {/* PAGINATION */}
                <div className='flex items-center justify-end gap-3'>
                    {prevURL &&
                    <button
                        onClick={() => paginationHandler(prevURL)}
                        className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-green-600 to-cyan-700'>
                        <FaArrowLeftLong className='group-hover:-translate-x-2 duration-200 transition-all ease-in-out text-green-600' /> 
                        Prev 
                    </button>
                    }
                    {nextURL &&
                    <button 
                        onClick={() => paginationHandler(nextURL)}
                        className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-green-600 to-cyan-700'>
                        Next <FaArrowRightLong className='group-hover:translate-x-2 duration-200 transition-all ease-in-out text-green-600' />
                    </button>
                    }
                </div>
            </div>

        </section>
    </div>
  )
}
