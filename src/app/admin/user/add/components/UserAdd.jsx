"use client"

import axiosClientAPI from "@/api/axiosClientAPI";
import Loader from "@/app/components/Loader";
import { tokenAuth } from "@/tokens/tokenAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Bounce } from 'react-toastify';



export default function UserAdd() {
    const router = useRouter();
    const [roles, setRoles] = useState()
    const [data, setData] = useState({});
    const [errMsg, setErrMsg] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const { getAuthToken } = tokenAuth()
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
    }};
    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    /* GET DATA */
    async function getRoles() {
        try{
          const result = await axiosClientAPI.get(`role-all/`, config)
          .then((response) => {
            console.log('Roles DATA')
            console.log(response.data)
            setRoles(response.data.data)
          })
        } catch (error) {
          console.error(`Error: ${error}`)
        }   
    }    
  
    const postData = async () => {
        const formData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            role_level: data.role_level,
        }
        try{
            const result = await axiosClientAPI.post(`user`, formData, config)
            .then((response) => {
                if(response.data.status == 0){
                    const message = response.data.message;
                    setErrMsg({emai: message})
                    toast.success(message, {
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
                    return;
                } 
                if(response.data.status == 1){
                    const message = response.data.message;
                    toast.success(message, {
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
                    router.push('/admin/user')
                    setIsSubmit(false)
                    return;
                }
              
            })
          } catch (error) {
            console.error(`Error: ${error}`)
            setIsSubmit(false)
          }   
    }

    useEffect(() => {
        getRoles();
    }, []);
 

    useEffect(() => {
        isSubmit === true && postData();
    }, [isSubmit]);


    if(!roles){ return ( <Loader />)}

  return (
    <section className='w-[100%]'>
        <div className='mx-auto w-[90%]'>
          
            {/* NAME */}
            <div className='mb-6'>
                <p className='mb-2 font-semibold'>Name:</p>
                <input 
                    type='text' 
                    name='name'
                    onChange={handleInput}
                    placeholder="Enter Name here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300' />
            </div>
            {/* EMAIL */}
            <div className='mb-6'>
                <p className='mb-2 font-semibold'>Email:</p>
                <input 
                    type='text' 
                    name='email'
                    onChange={handleInput}
                    placeholder="Enter Email here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300' />
                {errMsg.email &&
                <p className="text-red-600">{errMsg.email}</p>}
            </div>
            {/* PHONE */}
            <div className='mb-6'>
                <p className='mb-2 font-semibold'>Phone:</p>
                <input 
                    type='text'
                    name='phone'
                    onChange={handleInput} 
                    placeholder="+263 782 100 200"
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300' />
            </div>
            {/* ADDRESS */}
            <div className='mb-6'>
                <p className='mb-2 font-semibold'>Address:</p>
                <input 
                    type='text' 
                    name='address'
                    onChange={handleInput} 
                    placeholder="Enter Address here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
            </div>
            {/* Role */}
            {roles.length > 0 &&
            <div className='mb-6'>
                <p className='mb-2 font-semibold'>Role:</p>
                <select 
                    name='role_level'
                    onChange={handleInput} 
                    placeholder="Enter Address here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'>
                    <option>Select an option.</option>
                    {roles.map((item, i) => (
                        <option value={item.level}>{item.name}</option>
                    ))}
                </select>
            </div>
            }
            {/* Submit */}
            <div className='flex items-center justify-center pb-[4rem]'>
                <button 
                    onClick={() => setIsSubmit(true)}
                    className='btn__one'>
                    {isSubmit == true ? 'Processing' : 'Submit' }
                </button>
            </div>
        </div>
    </section>
  )
}
