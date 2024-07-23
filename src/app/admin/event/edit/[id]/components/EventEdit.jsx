"use client";
import axiosClientAPI from "@/api/axiosClientAPI";
import { baseURL } from "@/api/baseURL";
import Loader from "@/app/components/Loader";
import { tokenAuth } from "@/tokens/tokenAuth";
import { darkBounce } from "@/utils/roastifyDark";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Bounce } from 'react-toastify';




export default function EventEdit({ id, citiesData }) {
    const router = useRouter();
    const [data, setData] = useState();
    const [image, setImage] = useState({});
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

    /* GET DATA */
    async function getData() {
      try{
        const result = await axiosClientAPI.get(`event/${id}`, config)
        .then((response) => {
          const res = response.data.data;
          setData(res)
          setImage({
            portrait: baseURL + res.portrait,
            landscape: baseURL + res.landscape,
          })
        })
      } catch (error) {
        console.error(`Error: ${error}`)
      }   
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
          const result = await axiosClientAPI.post(`event/${id}`, formData, config)
          .then((response) => {
              if(response.data.status == 1){
                toast.success(response.data.message, darkBounce);
                router.push(`/admin/event/${id}`);
                setIsSubmit(false);
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

    if(!data && !cities){ return (<Loader />) }


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
                    value={data?.name}
                    placeholder="Enter Name here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
              </div>
              {/* DESCRIPTION */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Description:</p>
                  <textarea
                    name="description"
                    value={data?.description}
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
                      value={data?.phone}
                      onChange={handleInput}
                      placeholder="Enter Phone Number here..."
                      className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
                  </div>
                  <div className="w-[100%]">
                    <p className='font-semibold mb-2'>Email:</p>
                    <input type='email'
                      name="email"
                      value={data?.email}
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
                    value={data?.address}
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
                      value={data?.date}
                      onChange={handleInput}
                      placeholder="01 January 2024"
                      className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
                  </div>
                  <div className="w-[100%]">
                    <p className='font-semibold mb-2'>Time:</p>
                    <input type='text'
                      value={data?.time}
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
                      <option value={1} selected={data?.priority === 1 && 'selected'} >1</option>
                      <option value={2} selected={data?.priority === 2 && 'selected'} >2</option>
                      <option value={3} selected={data?.priority === 3 && 'selected'}>3</option>
                      <option value={4} selected={data?.priority === 4 && 'selected'}>4</option>
                      <option value={5} selected={data?.priority === 5 && 'selected'}>5</option>
                      <option value={6} selected={data?.priority === 6 && 'selected'}>6</option>
                      <option value={7} selected={data?.priority === 7 && 'selected'}>7</option>
                      <option value={8} selected={data?.priority === 8 && 'selected'}>8</option>
                      <option value={9} selected={data?.priority === 9 && 'selected'}>9</option>
                      <option value={10} selected={data?.priority === 10 && 'selected'}>10</option>
                      <option value={11} selected={data?.priority === 11 && 'selected'}>11</option>
                      <option value={12} selected={data?.priority === 12 && 'selected'}>12</option>
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
                        <option key={key} value={i.id} selected={data?.city_id === i.id && 'selected'}>{i.name}</option>
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