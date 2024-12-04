"use client"

import axiosClientAPI from "@/api/axiosClientAPI";
import { baseURL } from "@/api/baseURL";
import { tokenAuth } from "@/tokens/tokenAuth";
import { darkBounce } from "@/utils/roastifyDark";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";


export default function CategoryAdd() {
  const { getAuthToken } = tokenAuth();
  if(!getAuthToken()) { 
    redirect('/login');
  }
  const router = useRouter();
  const [data, setData] = useState();
  const [image, setImage] = useState({})
  const [isSubmit, setIsSubmit] = useState(false);
  const [errMsg, setErrMsg] = useState({});
  const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${getAuthToken()}`
  }};
  const handleInput = (e) => {
      setData({...data, [e.target.name]: e.target.value})
  }

  const postData = async () => {
      if(!data?.name) {
        const message = 'Name is required.';
        setErrMsg({name: message});
        toast.warn(message, darkBounce)
        return;
      }
      if(!data?.slug) {
        const message = 'Slug is required.';
        setErrMsg({slug: message});
        toast.warn(message, darkBounce)
        return;
      }
      if(!data?.priority) {
        const message = 'Priority is required.';
        setErrMsg({priority: message});
        toast.warn(message, darkBounce)
        return;
      }
      const formData = {
          name: data?.name,
          image: data.image,
          description: data?.description,
          slug: data?.slug,
          priority: data?.priority,
      }
      try{
          const result = await axiosClientAPI.post(`category`, formData, config)
          .then((response) => {
            router.push(`/admin/category`);
            toast.success(response.data.message, darkBounce);
            setIsSubmit(false)
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
  
  
  return (
    <section className='w-[100%]'>
          <div className='mx-auto w-[90%]'>
               {/*  */}
               <div className='mb-6'>
                  <p className='font-semibold mb-2'>Image:</p>
                  <input type='file'
                    name="image"
                    onChange={(e) => {
                      setImage(URL.createObjectURL(e.target.files[0]))
                      setData({...data, image: e.target.files[0]})
                    }}
                    placeholder="Enter name here..."
                    className='w-[40%] rounded-lg outline-none mb-3 px-4 py-3 border border-slate-300'/>
                  <div className="w-[30%] aspect-[5/3] rounded-xl border border-slater-200 overflow-hidden">
                    <img src={image ? image : baseURL + 'assets/img/no-img.jpg'} className="w-[100%] h-[100%] object-cover" />
                  </div>
              </div>
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Name</p>
                  <input type='text'
                    name="name"
                    onChange={handleInput}
                    placeholder="Enter name here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
                    {errMsg.name && 
                      <p className="text-red-500">{errMsg.name}</p>
                    }
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
                      {[...Array(12)].map((i, key) => (
                         <option value={key+1}>{key+1}</option>
                      ))}
                  </select>
                  {errMsg.priority && 
                    <p className="text-red-500">{errMsg.priority}</p>
                  }
              </div>
              {/*  */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Slug:</p>
                  <input type='text'
                    name="slug"
                    onChange={handleInput}
                    placeholder="Enter Slug here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
                    {errMsg.slug && 
                     <p className="text-red-500">{errMsg.slug}</p>
                    }
              </div>
              {/*  */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Description:</p>
                  <textarea type='text'
                    name="description"
                    onChange={handleInput}
                    placeholder="Enter Description here..."
                    className='w-[100%] h-[8rem] rounded-lg outline-none px-4 py-3 border border-slate-300'></textarea>
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
