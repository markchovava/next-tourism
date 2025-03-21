"use client"
import { baseURL } from '@/api/baseURL';
import StarRate from '@/app/components/StarRate';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaAngleRight, FaHeart, FaRegHeart, FaRegStar, FaStar } from 'react-icons/fa6';
import { IoIosSearch } from 'react-icons/io';



export default function PlaceList({province, places, category_slug, province_slug}) {
    const [data, setData] = useState(places?.data);
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [nextURL, setNextURL] = useState(places?.links?.next);
    const [prevURL, setPrevURL] = useState(places?.links?.prev);
    /* PAGINATION DATA */
    async function paginationHandler(url) {
        try{
        const result = await axios.get(url)
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
            const result = await axios.get(`${baseURL}province-category-places?category_slug=${category_slug}&province_slug=${province_slug}`)
            .then((response) => {
                setData(response.data.data)
                setPrevURL(response.data.links.prev)
                setNextURL(response.data.links.next)
                setIsSearch(false);
                return;
            })
        } catch (error) {
            console.error(`Error: ${error}`)
            setIsSearch(false);
        }  
    } 
    /* SEARCH DATA */
    async function searchData() {
        if(!search){
            getData();
            setIsSearch(false);
            return;
        }
        try{
            const result = await axios.get(`${baseURL}province-category-places?category_slug=${category_slug}&province_slug=${province_slug}&search=${search}`)
            .then((response) => {
                setData(response.data.data)
                setPrevURL(response.data.links.prev)
                setNextURL(response.data.links.next)
                setIsSearch(false);
                return;
            })
        } catch (error) {
            console.error(`Error: ${error}`)
            setIsSearch(false);
        }  
    } 
    /*  */
    useEffect(()=>{
        isSearch === true && searchData();
    },[isSearch]);

  return (
    <div>
        {/* Bread Crumbs */}
        <section className='w-[100%]'>
            <div className='mx-auto w-[90%] border-b border-slate-200'>
                <ul className='flex items-center justify-start gap-2 py-2'>
                    <li><Link href='/'>Home</Link></li>
                    <li><FaAngleRight /></li>
                    <li><Link href='/province'>Province</Link></li>                               
                    <li><FaAngleRight /></li>
                    <li><Link href={`/province/category/${category_slug}/${province_slug}`}>{province?.data?.name}</Link></li>                               
                </ul>
            </div>
        </section>
        {/*  */}
        <section className='w-[100%]'>
            <div className='mx-auto w-[90%] flex items-center justify-center flex-col pt-[10rem] pb-[5rem]'>
                <h6>Find a place to visit.</h6>
                <div className="w-[80%] mx-auto border border-slate-300 rounded-full overflow-hidden flex items-center justify-start">
                    <input 
                        type="text" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-[90%] outline-none px-5 py-4 border-r border-slate-200" placeholder="Search places by name..." />
                   
                   <button 
                        onClick={() => setIsSearch(true)}
                        className="w-[10%] h-[100%] border-none outline-none flex items-center justify-center text-center">
                        {isSearch === true 
                        ?
                            <IoIosSearch className="text-2xl animate-pulse text-green-700 drop-shadow-md"/>
                        :
                            <IoIosSearch className="text-2xl transition-all duration-300 ease-in-out hover:text-green-800 hover:drop-shadow-md"/>
                        }
                    </button>
            
                </div>
            </div>
        </section>
         {/*  */}
         <section className='w-[100%]'>
            <div className='w-[90%] mx-auto pb-[5rem]'>
                <div className='w-[100%] flex items-center justify-between pb-3'>
                    <h6 className="text-[2.5rem] font-semibold">
                        Places
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
                {data.length > 0 ? 
                <div className='grid lg:grid-cols-4 grid-cols-2 gap-8 mb-8'>
                    {/* COL */}
                    {data.map((i, key) => (
                        <div key={key} className='group'>
                            <div className='relative w-[100%] rounded-lg overflow-hidden aspect-[5/4] bg-slate-400 mb-2'>
                                <img src={i?.place_images[0]?.image ? baseURL + i?.place_images[0]?.image : baseURL + 'assets/img/no-img.jpg'} className='w-[100%] h-[100%] object-cover zoom__inOut' />
                               
                            </div>
                                <div className='pb-2 px-4'>
                                <Link href={`/place/${i.id}`}>
                                        <p className='mb-2 font-semibold link__one'>
                                            {i.name} 
                                        </p>
                                    </Link>
                                    {/* STAR */}
                                    {i?.rating?.rate &&
                                    <StarRate dbData={i?.rating} />
                                    }
                                    <p>{i?.city?.name}</p>
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
