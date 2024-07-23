"use client"

import axiosClientAPI from "@/api/axiosClientAPI";
import { tokenAuth } from "@/tokens/tokenAuth";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";


export default function CategoryAdd() {
  const router = useRouter();
    const [data, setData] = useState();
    const [image, setImage] = useState({})
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
            image: data.image,
            description: data?.description,
            slug: data?.slug,
            priority: data?.priority,
        }
        try{
            const result = await axiosClientAPI.post(`category`, formData, config)
            .then((response) => {
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
              router.push(`/admin/category`);
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
                    <img src={image} className="w-[100%] h-[100%] object-cover" />
                  </div>
              </div>
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Name</p>
                  <input type='text'
                    name="name"
                    onChange={handleInput}
                    placeholder="Enter name here..."
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
                      <option value={13}>13</option>
                      <option value={14}>14</option>
                      <option value={15}>15</option>
                      <option value={16}>16</option>
                      <option value={17}>17</option>
                      <option value={18}>18</option>
                      <option value={19}>19</option>
                      <option value={20}>20</option>
                  </select>
              </div>
              {/*  */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Slug:</p>
                  <input type='text'
                    name="slug"
                    onChange={handleInput}
                    placeholder="Enter Slug here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
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
