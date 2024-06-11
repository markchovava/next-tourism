"use client";
import axiosClientAPI from "@/api/axiosClientAPI";
import { baseURL } from "@/api/baseURL";
import Loader from "@/app/components/Loader";
import { tokenAuth } from "@/tokens/tokenAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Bounce } from 'react-toastify';




export default function CategoryEdit({ id }) {
    const router = useRouter();
    const [data, setData] = useState();
    const [image, setImage] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const { getAuthToken } = tokenAuth();
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
        const result = await axiosClientAPI.get(`category/${id}`, config)
        .then((response) => {
          setData(response.data.data)
          setImage(response?.data?.data?.image ? (baseURL + response.data.data.image) : '')
        })
      } catch (error) {
        console.error(`Error: ${error}`)
      }   
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
          const result = await axiosClientAPI.post(`category/${id}`, formData, config)
          .then((response) => {
              router.push(`/admin/category/${id}`);
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
              {/*  */}
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
                      <option value={13} selected={data?.priority == 13 && 'selected'}>13</option>
                      <option value={14} selected={data?.priority == 14 && 'selected'}>14</option>
                      <option value={15} selected={data?.priority == 15 && 'selected'}>15</option>
                      <option value={16} selected={data?.priority == 16 && 'selected'}>16</option>
                      <option value={17} selected={data?.priority == 17 && 'selected'}>17</option>
                      <option value={18} selected={data?.priority == 18 && 'selected'}>18</option>
                      <option value={19} selected={data?.priority == 19 && 'selected'}>19</option>
                      <option value={20} selected={data?.priority == 20 && 'selected'}>20</option>
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
              {/*  */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Description:</p>
                  <textarea type='text'
                    name="description"
                    value={data.description}
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