"use client";
import axiosClientAPI from "@/api/axiosClientAPI";
import Loader from "@/app/components/Loader";
import { tokenAuth } from "@/tokens/tokenAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Bounce } from 'react-toastify';




export default function ProvinceEdit({ id }) {
    const router = useRouter();
    const [data, setData] = useState();
    const [isSubmit, setIsSubmit] = useState(false);
    const { getAuthToken } = tokenAuth();
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
    }};

    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    /* GET DATA */
    async function getData() {
      try{
        const result = await axiosClientAPI.get(`province/${id}`, config)
        .then((response) => {
          console.log(response.data.data)
          setData(response.data.data)
        })
      } catch (error) {
        console.error(`Error: ${error}`)
      }   
    }    

    const postData = async () => {
      const formData = {
          name: data?.name,
          slug: data?.slug,
          priority: data?.priority,
      }
      try{
          const result = await axiosClientAPI.post(`province/${id}`, formData, config)
          .then((response) => {
              if(response.data.status == 1){
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
                router.push(`/admin/province/${id}`);
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
      getData();
    }, [])

    useEffect(() => {
        isSubmit === true && postData();
    }, [isSubmit]);

    if(!data){
      return (
        <Loader />
      )
    }


    return (
      <section className='w-[100%]'>
          <div className='mx-auto w-[90%]'>
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Name</p>
                  <input 
                    type='text'
                    name="name"
                    onChange={handleInput}
                    value={data.name}
                    placeholder="Enter Name here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
              </div>
              {/* PRIORITY */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Priority:</p>
                  <select
                    name="priority"
                    onChange={handleInput}
                    placeholder="Enter Priority here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'>
                      <option value=''>Select an option.</option>
                      <option value={1} selected={data?.priority == 1 && 'selected'}>1</option>
                      <option value={2} selected={data?.priority == 2 && 'selected'}>2</option>
                      <option value={3} selected={data?.priority == 3 && 'selected'}>3</option>
                      <option value={4} selected={data?.priority == 4 && 'selected'}>4</option>
                      <option value={5} selected={data?.priority == 5 && 'selected'}>5</option>
                      <option value={6} selected={data?.priority == 6 && 'selected'}>6</option>
                      <option value={7} selected={data?.priority == 7 && 'selected'}>7</option>
                      <option value={8} selected={data?.priority == 8 && 'selected'}>8</option>
                      <option value={9} selected={data?.priority == 9 && 'selected'}>9</option>
                      <option value={10} selected={data?.priority == 10 && 'selected'}>10</option>
                      <option value={11} selected={data?.priority == 11 && 'selected'}>11</option>
                      <option value={12} selected={data?.priority == 12 && 'selected'}>12</option>
                  </select>
              </div>
              {/*  */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Slug:</p>
                  <input type='text'
                    name="slug"
                    value={data.slug}
                    onChange={handleInput}
                    placeholder="Enter Slug here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
              </div>
             
             
              <div className='flex items-center justify-center pb-[4rem]'>
                  <button 
                    onClick={() => setIsSubmit(true)}
                    className='btn__one'>
                      {isSubmit === true ? 'Processing' : 'Submit'}
                  </button>
              </div>
          </div>
      </section>
    )
  }