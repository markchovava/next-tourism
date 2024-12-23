"use client";

import { loginAction } from '@/actions/authActions';
import { baseURL } from '@/api/baseURL';
import { cookieAuthClient } from '@/cookies/authCookieClient';
import { cookieRoleClient } from '@/cookies/roleCookieClient';
import { tokenAuth } from '@/tokens/tokenAuth';
import { tokenRole } from '@/tokens/tokenRole';
import { darkBounce } from '@/utils/roastifyDark';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useTransition } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Bounce, toast } from 'react-toastify';




export default function LoginEdit() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition()
    const { setAuthToken } = tokenAuth();
    const { setRoleToken } = tokenRole();
    const { setAuthCookie } = cookieAuthClient()
    const { setRoleCookie } = cookieRoleClient();
    const [isSubmit, setIsSubmit] = useState(false);
    const [data, setData] = useState({});
    const [errMsg, setErrMsg] = useState({});
    const handleInput = (e) => {
      setData({...data, [e.target.name]: e.target.value });
    }

    async function postData(){
        if(!data.email){
          setErrMsg({email: 'Email is required.'})
          return;
        }
        if(!data.password){
          setErrMsg({ password: 'Password is required.'})
          return;
        }
        const formData = {
          email: data.email,
          password: data.password,
        } 
        try{
            const res = await loginAction(formData)
            startTransition(() => res);
            if(res.status == 0){
              const message = res.message;
              setErrMsg({email: message });
              setIsSubmit(false);
              toast.warn(message, darkBounce);
              return;
            }
            if(res?.status == 2){
              const message = res?.message;
              setErrMsg({password: message });
              setIsSubmit(false);
              toast.warn(message, darkBounce);
              return;
            }
            if(res?.status == 1) {
              setAuthToken(res?.auth_token)
              setAuthCookie(res?.auth_token)
              if(res?.role_level) { 
                setRoleCookie(res?.role_level); 
                setRoleToken(res?.role_level); 
              }  
              router.push('/'); 
              toast.success(res.message, darkBounce);
              return;
            }
          } catch (error) {
              console.error(`Error: ${error}`);
        }
    
      }



  return (
    <section className='w-[100%]'>
        <div className='mx-auto w-[90%] flex items-center justify-center flex-col pt-[8rem] pb-[5rem]'>
            <h6>Login</h6>
            <section className="w-[50%] mx-auto bg-white drop-shadow-lg rounded-lg overflow-hidden px-6 py-8">
                
                <div className='mb-4'>
                    <button className='text-white rounded-lg px-6 py-4 bg-gradient-to-br from-blue-500 to-green-600 hover:bg-gradient-to-br hover:from-green-500 hover:to-blue-600 transition-all duration-200 ease-in-out'>
                        Sign in with Gmail</button>
                </div>

                <div className='flex items-center justify-between gap-2 mb-4'>
                    <hr className='border-slate-500 w-[50%]' />
                    <span className=''>OR</span>
                    <hr className='border-slate-500 w-[50%]' />
                </div>

                <div className=' mb-[1.5rem]'> 
                    <Link href='/register' className='transition-all ease-in-out underline hover:no-underline text-green-600 hover:text-green-700'>
                        Create a new Account</Link>
                </div>
                <form action={postData}>
                  {/* EMAIL */}
                  <div className='mb-4'>
                      <p className='font-semibold mb-1'>Email:</p>
                      <input 
                          type='text' 
                          name='email'
                          value={data?.email}
                          onChange={handleInput}
                          placeholder='Enter Email here...'
                          className='w-[100%] outline-none border border-slate-300 px-4 py-3 rounded-lg' />
                      {errMsg.email &&
                        <p className='text-red-600'>
                          {errMsg.email}</p>
                      }
                  </div>
                  {/* PASSWORD */}
                  <div className='mb-4'>
                      <p className='font-semibold mb-1'>Password:</p>
                      <input 
                          type='password'
                          name='password' 
                          onChange={handleInput}
                          placeholder='Enter Password here...'
                          className='w-[100%] outline-none border border-slate-300 px-4 py-3 rounded-lg' />
                      {errMsg.password &&
                        <p className='text-red-600'>
                          {errMsg.password}</p>
                      }
                  </div>

                  {/* BUTTON */}
                  <div className='w-[100%] flex items-center justify-center'>
                      <button type='submit'
                        className='flex items-center justify-center gap-3 group text-white duration-200 transition-all ease-in-out text-md rounded-full p-5 w-[20rem] bg-gradient-to-br from-green-600 to-cyan-700 hover:drop-shadow-md hover:bg-gradient-to-br hover:from-cyan-700 hover:to-green-600'>
                          { isPending
                              ? 'Processing' :
                              <>
                                  Submit 
                                  <FaArrowRightLong className='group-hover:translate-x-2 duration-200 transition-all ease-in-out' />
                              </>
                          }
                      </button>
                  </div>
                </form>
        
            </section>
        </div>
    </section>
  )
}
