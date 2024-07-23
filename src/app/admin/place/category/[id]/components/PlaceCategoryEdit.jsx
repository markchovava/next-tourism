"use client";
import axiosClientAPI from '@/api/axiosClientAPI';
import { tokenAuth } from '@/tokens/tokenAuth';
import React, { useEffect, useState } from 'react'
import { FaRegPlusSquare, FaSearch } from "react-icons/fa";
import { CgRemoveR } from "react-icons/cg";
import Loader from '@/app/components/Loader';
import { Bounce, toast } from 'react-toastify';
import { redirect } from 'next/navigation';



export default function PlaceCategoryEdit({ id }) {
    const [data, setData] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [place, setPlace] = useState()
    const [categories, setCategories] = useState()
    const [placeCategories, setPlaceCategories] = useState()
    const [errMsg, setErrMsg] = useState({});
    const { getAuthToken } = tokenAuth();
    if(!getAuthToken()) { 
        redirect('/login');
      }
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
    /* GET Place Categories */
    async function getPlaceCategories() {
        try{
        const result = await axiosClientAPI.get(`place-category-by-id/${id}`, config)
        .then((response) => {
            console.log('PlaceCategories')
            console.log(response.data.data)
            setPlaceCategories(response.data.data)
        })
        } catch (error) {
        console.error(`Error: ${error}`)
        }   
    } 
    /* GET CATEGORIES */
    async function getCategories() {
        try{
        const result = await axiosClientAPI.get(`category-all`, config)
        .then((response) => {
            setCategories(response.data.data)
        })
        } catch (error) {
        console.error(`Error: ${error}`)
        }   
    }

    /* DELETE DATA */
    async function deleteCategory(item_id) {
        try{
        const result = await axiosClientAPI.delete(`place-category/${item_id}`, config)
        .then((response) => {
            if(response.data.status == 1) {
              toast.success(response.data.message, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  transition: Bounce,
              });
              getPlaceCategories();
            }
        })
        } catch (error) {
        console.error(`Error: ${error}`)
        }   
    }   
    
    /* POST DATA */
    const postData = async () => {
        if(!data.category_id){
          setErrMsg({category_id: 'Category is required.'})
          setIsSubmit(false)
          return;
        }  
        const formData = {
            place_id: place.id,
            category_id: data.category_id,
        };
        console.log(formData)
        setIsSubmit(false)
        try{
            const result = await axiosClientAPI.post(`place-category`, formData, config)
            .then((response) => {
                if(response.data.status == 0) {
                    toast.success(response.data.message, {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                      transition: Bounce,
                    });
                    setIsSubmit(false)
                }
                if(response.data.status == 1) {
                    toast.success(response.data.message, {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                      transition: Bounce,
                    });
                    getPlaceCategories();
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
    getPlaceCategories()
    getCategories();
    getPlace();
  }, []);

  useEffect(() => {
    isSubmit == true && postData();
  }, [isSubmit]);


  if(!place && !placeCategories && !categories) { return ( <Loader />)}



  return (
    <div>
        <section className='w-[100%]'>
            <div className='w-[90%] mx-auto'>
                <h5>{place?.name}</h5>
                <section className='mb-[3rem]'>
                    <div className='w-[100%] font-semibold text-lg bg-slate-200 py-2 flex items-center justify-start'>
                        <div className='w-[85%] px-3 py-2 border-r border-white'>Category</div>
                        <div className='w-[15%] px-3 py-2'>Action</div>
                    </div>
                    {/*  */}
                    <div className='w-[100%] font-semibold flex items-center justify-start mb-6 py-2 border-b border-slate-300'>
                        <div className='w-[85%] px-3 py-3 border-r border-slate-300'>
                            <select 
                                name='category_id' 
                                onChange={handleInput} className='w-[100%] rounded-lg outline-none border border-slate-200 p-4'>
                                    <option value=''>Select an option</option>
                                    {categories?.map((i, key) => (
                                        <option key={key} value={i.id}>{i.name}</option>
                                    ))}
                            </select>
                            {errMsg.category_id &&
                                <p className='text-red-600'>{errMsg.category_id}</p>
                            }
                        </div>
                        <div className='w-[15%] px-3 py-2 flex items-center justify-start gap-6'>
                            <FaRegPlusSquare onClick={() => setIsSubmit(true)} className='text-[2rem] hover:scale-110 hover:text-blue-600 transition-all duration-200 ease-in-out' />
                        </div>
                    </div>
                    {/*  */}
                    {placeCategories?.length > 0 &&
                        placeCategories?.map((i, key) => (
                        <div key={key} className='w-[100%] font-semibold flex items-center justify-start'>
                            <div className='w-[85%] px-6 py-3 border-r border-slate-300'>
                            {i.category.name}
                            </div>
                            <div className='w-[15%] px-3 py-2 flex items-center justify-start gap-6'>
                                <CgRemoveR onClick={() => deleteCategory(i.id)} className='text-[1.5rem] hover:scale-110 hover:text-red-600 transition-all duration-200 ease-in-out' />
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
