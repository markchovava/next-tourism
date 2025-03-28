"use client"
import { baseURL } from '@/api/baseURL'
import Loader from '@/app/components/Loader'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaRegHeart, FaHeart, FaArrowRightLong, FaArrowLeftLong } from 'react-icons/fa6'
import { IoIosSearch } from 'react-icons/io'




export default function GuideList({ guidesData }) {
    const [data, setData] = useState(guidesData.data);
    const [search, setSearch] = useState('')
    const [isSearch, setIsSearch] = useState(false)
    /* PAGINATION */
    const [nextURL, setNextURL] = useState(guidesData.links.next)
    const [prevURL, setPrevURL] = useState(guidesData.links.prev)
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
        const result = await axios.get(`${baseURL}guide`)
        .then((response) => {
            setData(response.data.data)
            setPrevURL(response.data.links.prev)
            setNextURL(response.data.links.next)
        })
        } catch (error) {
        console.error(`Error: ${error}`)
        }   
    }   
    /* search DATA */
    async function searchData() {
        console.log(search)
        if(search === ''){
        getData();
        setIsSearch(false);
        return;
        }
        try{
        const result = await axios.get(`${baseURL}guide?search=${search}`, config)
        .then((response) => {
            setData(response.data.data)
            setPrevURL(response.data.links.prev)
            setNextURL(response.data.links.next)
            setIsSearch(false);
        })
        } catch (error) {
        console.error(`Error: ${error}`)
        setIsSearch(false);
        }   
    } 

    useEffect(() => { 
        isSearch === true && searchData();
    }, [isSearch]);

    if(!data){ return ( <Loader /> ) }


  return (
    <div>
       <section className='w-[100%]'>
            <div className='mx-auto w-[90%] flex items-center justify-center flex-col pt-[10rem] pb-[5rem]'>
                <h6>Find the Guide</h6>
                <div className="w-[80%] mx-auto border border-slate-300 rounded-full overflow-hidden flex items-center justify-start">
                    <input 
                      value={search}
                      onChange={(e) => setSearch(e.target.value)} 
                      type="text" 
                      className="w-[90%] outline-none px-5 py-4 border-r border-slate-200" placeholder="Search places by name..." />
                   
                    <button 
                      onClick={() => setIsSearch(true)}
                      className="w-[10%] h-[100%] border-none outline-none flex items-center justify-center text-center">
                      {isSearch === true ?
                        <IoIosSearch className="text-2xl animate-ping text-green-800 drop-shadow-md"/>
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
                        Guides
                    </h6>
                    {/* PAGINATION */}
                    <div className='flex items-center justify-end gap-3'>
                      { prevURL && 
                        <button
                            onClick={() => paginationHandler(prevURL)}
                            className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-green-600 to-cyan-700'>
                            <FaArrowLeftLong className='group-hover:-translate-x-2 duration-200 transition-all ease-in-out text-green-600' /> 
                            Prev 
                        </button>
                      }
                      { nextURL && 
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
                        <div key={key} className='relative group w-[100%] rounded-lg overflow-hidden aspect-[5/4] bg-slate-400 mb-3'>
                            
                            <img 
                            src={i?.portrait ? baseURL + i?.portrait : baseURL + 'assets/img/no-img.jpg'} 
                            className='absolute w-[100%] h-[100%] object-cover zoom__inOut' />
                            
                            <div className='absolute bottom-0 left-0 w-[100%] h-[50%] bg-gradient-to-b from-transparent to-black opaguide-75 text-white'>
                            </div>
                            <div className='absolute bottom-0 left-0 w-[100%] h-[50%] text-white text-[2rem] font-bold flex items-end px-3 pb-4'>
                                <Link href={`/guide-place/${i.slug}`} 
                                className='link__two leading-tight'>
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
                    { prevURL && 
                      <button
                          onClick={() => paginationHandler(prevURL)}
                          className='group flex items-center justify-center gap-2 text-transparent bg-gradient-to-br bg-clip-text from-green-600 to-cyan-700'>
                          <FaArrowLeftLong className='group-hover:-translate-x-2 duration-200 transition-all ease-in-out text-green-600' /> 
                          Prev 
                      </button>
                    }
                    { nextURL && 
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
