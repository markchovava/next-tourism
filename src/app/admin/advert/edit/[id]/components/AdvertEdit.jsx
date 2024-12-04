"use client";
import { advertUpdateApiAction } from "@/actions/advertActions";
import axiosClientAPI from "@/api/axiosClientAPI";
import { baseURL } from "@/api/baseURL";
import Loader from "@/app/components/Loader";
import { tokenAuth } from "@/tokens/tokenAuth";
import { darkBounce } from "@/utils/roastifyDark";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast, Bounce } from 'react-toastify';




export default function AdvertEdit({ id, dbData }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isSubmit, setIsSubmit] = useState(false)
    const [data, setData] = useState(dbData?.data);
    const [image, setImage] = useState({
      portrait: dbData?.data?.portrait ? baseURL + dbData?.data?.portrait : null,
      landscape: dbData?.data?.landscape ? baseURL + dbData?.data?.landscape : null,
    });
    const [errMsg, setErrMsg] = useState({});
    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }
    /* POST DATA */
    const postData = async () => {
      if(!data?.name){
        const message = 'Name is required';
        setErrMsg({name: message})
        toast.warn(message, darkBounce);
        return;
      }
      const formData = new FormData();
      formData.append('name', data?.name ?? '');
      formData.append('priority', data?.priority ?? '');
      formData.append('slug', data?.slug ?? '');
      formData.append('href', data?.href ?? '');
      formData.append('description', data?.description ?? '');
      formData.append('portrait', data?.portrait ?? '');
      formData.append('landscape', data?.landscape ?? '');
      try{
          const res = await advertUpdateApiAction(formData, id);
          startTransition(() => res);
          if(res?.status == 1){
            toast.success(res?.message, darkBounce);
            setIsSubmit(false);
            router.push(`/admin/advert/${id}`);
          }
          setIsSubmit(false);
          } catch (error) {
              console.error(`Error: ${error}`);
              console.error(`Error Message: ${error.message}`);
              console.error(`Error Response: ${error.response}`);
              setIsSubmit(false);
          }
    }


    if(!data ){ return (<Loader />) }


    return (
      <section className='w-[100%]'>
          <div className='mx-auto w-[90%]'>
            <form action={postData} onSubmit={() => setIsSubmit(true)}>
              {/* IMAGES */}
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
                    <img src={image.portrait ? image.portrait : baseURL + 'assets/img/no-img.jpg'} className="w-[100%] h-[100%] object-cover" />
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
                    <img src={image.landscape ? image.landscape : baseURL + 'assets/img/no-img.jpg'} 
                      className="w-[100%] h-[100%] object-cover" />
                  </div>
                </div>
              </div>
              {/* NAME */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Name:</p>
                  <input type='text'
                    name="name"
                    value={data?.name}
                    onChange={handleInput}
                    placeholder="Enter Name here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
                  { errMsg?.name &&
                    <div className="text-sm text-red-500">
                      {errMsg?.name}
                    </div>
                  }
              </div>
              {/* SLUG */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Slug:</p>
                  <input type='text'
                    name="slug"
                    value={data?.slug}
                    onChange={handleInput}
                    placeholder="Enter Slug here..."
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
              {/* LINK */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Link:</p>
                  <input type='text'
                    name="href"
                    value={data?.href}
                    onChange={handleInput}
                    placeholder="Enter Slug here..."
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
              {/* SUBMIT */}
              <div className='flex items-center justify-center pb-[4rem]'>
                  <button 
                    type="submit"
                    className='btn__one'>
                    {isSubmit ? 'Processing' : 'Submit'}
                  </button>
              </div>
            </form>
          </div>
      </section>
    )
  }