"use client";
import axiosClientAPI from "@/api/axiosClientAPI";
import Loader from "@/app/components/Loader";
import { tokenAuth } from "@/tokens/tokenAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Bounce } from 'react-toastify';




export default function RoleEdit({ id }) {
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
        const result = await axiosClientAPI.get(`role/${id}`, config)
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
          level: data?.level,
          description: data?.description,
          slug: data?.slug,
      }
      try{
          const result = await axiosClientAPI.post(`role/${id}`, formData, config)
          .then((response) => {
              router.push(`/admin/role/${id}`);
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
              {/*  */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Level</p>
                  <select
                    name="level"
                    onChange={handleInput}
                    placeholder="Enter name here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'>
                    <option value=''>Select an option.</option>
                    <option value={1} selected={data.level === 1 && 'selected'}>1</option>
                    <option value={2} selected={data.level === 2 && 'selected'}>2</option>
                    <option value={3} selected={data.level === 3 && 'selected'}>3</option>
                    <option value={4} selected={data.level === 4 && 'selected'}>4</option>
                  </select>
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