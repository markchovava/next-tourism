"use client";
import axiosClientAPI from '@/api/axiosClientAPI';
import Loader from '@/app/components/Loader';
import { tokenAuth } from '@/tokens/tokenAuth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast, Bounce } from 'react-toastify';



export default function UserEdit({ id }) {
    const router = useRouter();
    const [data, setData] = useState();
    const [errMsg, setErrMsg] = useState({})
    const [roles, setRoles] = useState()
    const [isSubmit, setIsSubmit] = useState(false);
    const { getAuthToken } = tokenAuth()
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
    }};
    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }
    /* */
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
    /* GET DATA */
    async function getData() {
        try{
        const result = await axiosClientAPI.get(`user/${id}`, config)
        .then((response) => {
            setData(response.data.data)
        })
        } catch (error) {
        console.error(`Error: ${error}`)
        }   
    } 

    const postData = async () => {
        if(!data.email){
            setErrMsg({email: 'Email is required.'})
            setIsSubmit(false);
            return;
        }
        const formData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            role_level: data.role_level,
        }
        try{
            const result = await axiosClientAPI.post(`user/${id}`, formData, config)
            .then((response) => {
                if(response.data.status == 0){
                    const message = response.data.message;
                    setErrMsg({emai: message});
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
                    router.push(`/admin/user/${id}`)
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
        getData();
    }, []);

    useEffect(() => {
        isSubmit === true && postData();
    }, [isSubmit]);

    if(!data && !roles){ return (<Loader /> ) }

  return (
    <section className='w-[100%]'>
        <div className='mx-auto w-[90%]'>
            
            {/* Name */}
            <div className='mb-6'>
                <p className='mb-2 font-semibold'>Name:</p>
                <input 
                    type='text' 
                    name='name'
                    onChange={handleInput}
                    value={data?.name}
                    placeholder='Enter Email here...'
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
            </div>
            {/* Email */}
            <div className='mb-6'>
                <p className='mb-2 font-semibold'>Email:</p>
                <input 
                    type='text' 
                    name='email'
                    onChange={handleInput}
                    value={data?.email}
                    placeholder='Enter Email here...'
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
                {errMsg.email &&
                    <p className='text-red-600'>{errMsg.email}</p>
                }
            </div>
            {/* Phone */}
            <div className='mb-6'>
                <p className='mb-2 font-semibold'>Phone:</p>
                <input 
                    type='text'
                    name='phone'
                    onChange={handleInput}
                    value={data?.phone}
                    placeholder='Enter Phone here...' 
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
            </div>
            {/* Address */}
            <div className='mb-6'>
                <p className='mb-2 font-semibold'>Address:</p>
                <input 
                    type='text' 
                    name='address'
                    onChange={handleInput}
                    value={data?.address}
                    placeholder='Enter Address here...' 
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
            </div>
           
            {/* Role */}
            {roles?.length > 0 &&
            <div className='mb-6'>
                <p className='mb-2 font-semibold'>Role:</p>
                <select 
                    name='role_level'
                    onChange={handleInput} 
                    placeholder="Enter Address here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'>
                    <option>Select an option.</option>
                    {roles.map((item, i) => (
                        <option value={item.level} selected={data?.role_level === item.level && 'selected' }>
                            {item.name}</option>
                    ))}
                </select>
            </div>
            }
            
            <div className='flex items-center justify-center pb-[4rem]'>
                <button 
                    onClick={() => setIsSubmit(true) }
                    className='btn__one'>
                    {isSubmit == true ? 'Processing' : 'Submit'}
                </button>
            </div>

        </div>
    </section>
  )
}
