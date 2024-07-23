"use client";
import axiosClientAPI from '@/api/axiosClientAPI';
import { tokenAuth } from '@/tokens/tokenAuth';
import React, { useEffect, useState } from 'react'
import { FaRegPlusSquare, FaSearch } from "react-icons/fa";
import { CgRemoveR } from "react-icons/cg";
import Loader from '@/app/components/Loader';
import { Bounce, toast } from 'react-toastify';
import { darkBounce } from '@/utils/roastifyDark';



export default function PlaceGuideEdit({ id }) {
    const [data, setData] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [place, setPlace] = useState()
    const [guides, setGuides] = useState()
    const [placeGuides, setPlaceGuides] = useState()
    const [errMsg, setErrMsg] = useState({});
    const { getAuthToken } = tokenAuth()
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
    }};

    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }
  

    /* GET PLACE */
    async function getPlace() {
        try{
        const result = await axiosClientAPI.get(`place/${id}`, config)
        .then((response) => {
            setPlace(response.data.data)
        })
        } catch (error) {
        console.error(`Error: ${error}`)
        }   
    } 
    /* GET Place Guides */
    async function getPlaceGuides() {
        try{
        const result = await axiosClientAPI.get(`place-guide-by-id/${id}`, config)
        .then((response) => {
            console.log('PlaceGuides')
            console.log(response.data.data)
            setPlaceGuides(response.data.data)
        })
        } catch (error) {
        console.error(`Error: ${error}`)
        }   
    } 
    /* GET Guides */
    async function getGuides() {
        try{
        const result = await axiosClientAPI.get(`guide-all`, config)
        .then((response) => {
            setGuides(response.data.data)
        })
        } catch (error) {
        console.error(`Error: ${error}`)
        }   
    }

    /* DELETE DATA */
    async function deleteGuide(item_id) {
        try{
        const result = await axiosClientAPI.delete(`place-guide/${item_id}`, config)
        .then((response) => {
            if(response.data.status == 1) {
              toast.success(response.data.message, darkBounce);
              getPlaceGuides();
            }
        })
        } catch (error) {
        console.error(`Error: ${error}`)
        }   
    }   
    
    /* POST DATA */
    const postData = async () => {
        if(!data.guide_id){
          setErrMsg({guide_id: 'Guide is required.'})
          setIsSubmit(false)
          return;
        }  
        const formData = {
            place_id: place.id,
            guide_id: data.guide_id,
        };
        setIsSubmit(false)
        try{
            const result = await axiosClientAPI.post(`place-guide`, formData, config)
            .then((response) => {
                if(response.data.status == 0) {
                    toast.success(response.data.message, darkBounce);
                    setIsSubmit(false)
                }
                if(response.data.status == 1) {
                    toast.success(response.data.message, darkBounce);
                    getPlaceGuides();
                    setIsSubmit(false)
                }
              }
            );    
            } catch (error) {
                console.error(`Error: ${error}`);
                console.error(`Error Message: ${error.message}`);
                console.error(`Error Response: ${error.response}`);
                setIsSubmit(false);
            } 
  
    }

  useEffect(() => {
    getPlaceGuides()
    getGuides();
    getPlace();
  }, []);

  useEffect(() => {
    isSubmit == true && postData();
  }, [isSubmit]);


  if(!place && !placeGuides && !guides) { return ( <Loader />)}



  return (
    <div>
        <section className='w-[100%]'>
            <div className='w-[90%] mx-auto'>
                <h5>{place?.name}</h5>
                <section className='mb-[3rem]'>
                    <div className='w-[100%] font-semibold text-lg bg-slate-200 py-2 flex items-center justify-start'>
                        <div className='w-[85%] px-3 py-2 border-r border-white'>Guide</div>
                        <div className='w-[15%] px-3 py-2'>Action</div>
                    </div>
                    {/*  */}
                    <div className='w-[100%] font-semibold flex items-center justify-start mb-6 py-2 border-b border-slate-300'>
                        <div className='w-[85%] px-3 py-3 border-r border-slate-300'>
                            <select 
                                name='guide_id' 
                                onChange={handleInput} className='w-[100%] rounded-lg outline-none border border-slate-200 p-4'>
                                    <option value=''>Select an option</option>
                                    {guides?.map((i, key) => (
                                        <option key={key} value={i.id}>{i.name}</option>
                                    ))}
                            </select>
                            {errMsg.guide_id &&
                                <p className='text-red-600'>{errMsg.guide_id}</p>
                            }
                        </div>
                        <div className='w-[15%] px-3 py-2 flex items-center justify-start gap-6'>
                            <FaRegPlusSquare onClick={() => setIsSubmit(true)} className='text-[2rem] hover:scale-110 hover:text-blue-600 transition-all duration-200 ease-in-out' />
                        </div>
                    </div>
                    {/*  */}
                    {placeGuides?.length > 0 &&
                        placeGuides?.map((i, key) => (
                        <div key={key} className='w-[100%] font-semibold flex items-center justify-start'>
                            <div className='w-[85%] px-6 py-3 border-r border-slate-300'>
                            {i.guide.name}
                            </div>
                            <div className='w-[15%] px-3 py-2 flex items-center justify-start gap-6'>
                                <CgRemoveR onClick={() => deleteGuide(i.id)} className='text-[1.5rem] hover:scale-110 hover:text-red-600 transition-all duration-200 ease-in-out' />
                            </div>
                        </div>

                        ))
                    
                    }
                </section>
            </div>
        </section>
    </div>
  )
}
