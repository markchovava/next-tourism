"use client"

import axiosClientAPI from "@/api/axiosClientAPI";
import Loader from "@/app/components/Loader";
import { tokenAuth } from "@/tokens/tokenAuth";
import { darkBounce } from "@/utils/roastifyDark";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


export default function EventAdd({ citiesData }) {
  const router = useRouter();
    const [data, setData] = useState();
    const [image, setImage] = useState({})
    const [cities, setCities] = useState(citiesData?.data);
    const [isSubmit, setIsSubmit] = useState(false);
    const { getAuthToken } = tokenAuth();
    if(!getAuthToken()) { 
      redirect('/login');
    }
    const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${getAuthToken()}`
    }};
    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const postData = async () => {
        const formData = {
            name: data?.name,
            city_id: Number(data?.city_id),
            priority: data?.priority,
            date: data.date,
            time: data.time,
            description: data?.description,
            address: data?.address,
            email: data?.email,
            phone: data?.phone,
            portrait: data.portrait,
            landscape: data.landscape,
        
        };
        try{
          const result = await axiosClientAPI.post(`event`, formData, config)
          .then((response) => {
            if(response.data.status == 1){
              toast.success(response.data.message, darkBounce);
              router.push(`/admin/event`);
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
        isSubmit === true && postData();
    }, [isSubmit]);


    if(!cities){ return ( <Loader /> ) }
  
  
  return (
    <section className='w-[100%]'>
          <div className='mx-auto w-[90%]'>
              {/*  */}
              <div className='mb-6 grid lg:grid-cols-2 grid-cols-1'>
                <div className="w-[100%]">
                  <p className='font-semibold mb-2'>Potrait:</p>
                  <input type='file'
                    name="portrait"
                    onChange={(e) => {
                      setImage({...image, portrait: URL.createObjectURL(e.target.files[0])})
                      setData({...data, portrait: e.target.files[0]})
                    }}
                    className='w-[70%] rounded-lg outline-none mb-3 px-4 py-3 border border-slate-300'/>
                  <div className="lg:h-[13rem] h-[10rem] aspect-[10/7] rounded-xl border border-slater-200 overflow-hidden">
                    <img src={image.portrait} className="w-[100%] h-[100%] object-cover" />
                  </div>
                </div>
                {/*  */}
                <div className="w-[100%]">
                  <p className='font-semibold mb-2'>Landscape:</p>
                  <input type='file'
                    name="lanscape"
                    onChange={(e) => {
                      setImage({...image, landscape: URL.createObjectURL(e.target.files[0])})
                      setData({...data, landscape: e.target.files[0]})
                    }}
                    className='w-[70%] rounded-lg outline-none mb-3 px-4 py-3 border border-slate-300'/>
                  <div className="lg:h-[13rem] h-[10rem] aspect-[5/2] rounded-xl border border-slater-200 overflow-hidden">
                    <img src={image.landscape} className="w-[100%] h-[100%] object-cover" />
                  </div>
                </div>
              </div>
             
              {/* NAME */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Name:</p>
                  <input type='text'
                    name="name"
                    onChange={handleInput}
                    placeholder="Enter Name here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
              </div>
              {/* DESCRIPTION */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Description:</p>
                  <textarea
                    name="description"
                    onChange={handleInput}
                    placeholder="Enter Description here..."
                    className='w-[100%] h-[6rem] rounded-lg outline-none px-4 py-3 border border-slate-300'></textarea>
              </div>
              {/* PHONE & EMAIL */}
              <div className='mb-6 grid grid-cols-2 gap-8'>
                  <div className="w-[100%]">
                    <p className='font-semibold mb-2'>Phone:</p>
                    <input type='text'
                      name="phone"
                      onChange={handleInput}
                      placeholder="Enter Phone Number here..."
                      className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
                  </div>
                  <div className="w-[100%]">
                    <p className='font-semibold mb-2'>Email:</p>
                    <input type='email'
                      name="email"
                      onChange={handleInput}
                      placeholder="Enter Email here..."
                      className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
                  </div>
              </div>
              {/* ADDRESS */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Address:</p>
                  <input type='text'
                    name="address"
                    onChange={handleInput}
                    placeholder="Enter Address here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
              </div>
              {/* TIME & DATE */}
              <div className='mb-6 grid grid-cols-2 gap-8'>
                  <div className="w-[100%]">
                    <p className='font-semibold mb-2'>Date:</p>
                    <input type='text'
                      name="date"
                      onChange={handleInput}
                      placeholder="01 January 2024"
                      className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
                  </div>
                  <div className="w-[100%]">
                    <p className='font-semibold mb-2'>Time:</p>
                    <input type='text'
                      name="time"
                      onChange={handleInput}
                      placeholder="08.00 am - 01.00pm"
                      className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
                  </div>
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
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                      <option value={8}>8</option>
                      <option value={9}>9</option>
                      <option value={10}>10</option>
                      <option value={11}>11</option>
                      <option value={12}>12</option>
                  </select>
              </div>
              
              {/*  */}
              { cities.length > 0 &&
                <div className='mb-6'>
                    <p className='font-semibold mb-2'>City:</p>
                    <select
                      name="city_id"
                      onChange={handleInput}
                      className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'>
                      <option value=''>Select an option.</option>
                      {cities.map((i, key) => (
                        <option key={key} value={i.id}>{i.name}</option>
                      ))}
                      </select>
                </div>
              }
              
              
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
