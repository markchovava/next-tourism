"use client"

import { placeStoreApiAction } from "@/actions/placeActions";
import axiosClientAPI from "@/api/axiosClientAPI";
import { baseURL } from "@/api/baseURL";
import Loader from "@/app/components/Loader";
import { tokenAuth } from "@/tokens/tokenAuth";
import { darkBounce } from "@/utils/roastifyDark";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";



export default function PlaceAdd({cityData, provinceData}) {
  console.log(cityData)
  console.log(provinceData)
  const router = useRouter();
    const [data, setData] = useState({});
    const [imgItem, setImgItem] = useState([]);
    const [image, setImage] = useState({})
    const [errMsg, setErrMsg] = useState({});
    const [provinces, setProvinces] = useState(provinceData?.data ?? []);
    const [cities, setCities] = useState(cityData?.data ?? []);
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
   

    const postData = async () => {
      if(!data.city_id){
        setErrMsg({city_id: 'City is required.'})
        setIsSubmit(false)
        return;
      }
      if(!data.province_id){
        setErrMsg({province_id: 'Province is required.'})
        setIsSubmit(false)
        return;
      }  
      const formData = new FormData();
      formData.append('priority', data?.priority ?? '');
      formData.append('city_id', data?.city_id ?? '');
      formData.append('province_id', data?.province_id ?? '');
      formData.append('name', data?.name ?? '');
      formData.append('slug', data?.slug ?? '');
      formData.append('description', data?.description ?? '');
      formData.append('phone', data?.phone ?? '');
      formData.append('address', data?.address ?? '');
      formData.append('email', data?.email ?? '');
      formData.append('website', data?.website ?? '');
      for (let i = 0; i < imgItem.length; i++) {
        formData.append('place_images[]', imgItem[i]);
      }
      try{
          const res = await placeStoreApiAction(formData);
            if(res?.status == 1){
              toast.success(res?.message, darkBounce);
              router.push(`/admin/place`);
              setIsSubmit(false)
            }
            toast.success(res?.message, darkBounce);
            setIsSubmit(false)
          } catch (error) {
              console.error(`Error: ${error}`);
              console.error(`Error Message: ${error?.message}`);
              console.error(`Error Response: ${error?.response}`);
              setIsSubmit(false);
          } 
    }


    if(!provinces && !cities){ return ( <Loader /> ) }
  
  
  return (
    <section className='w-[100%]'>
          <div className='mx-auto w-[90%]'>
            <form action={postData} onSubmit={() => setIsSubmit(true)}>
              {/* IMAGES */}
              <div className='mb-6'>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
                  {/* IMAGE COL */}
                  <div className="w-[100%]">
                    <p className='font-semibold mb-2'>Image:</p>
                    <input type='file'
                      name="img1"
                      onChange={(e) => {
                        setImage({...image, img1: URL.createObjectURL(e.target.files[0])})
                        setImgItem([...imgItem, e.target.files[0]])
                      }}
                      placeholder="Enter name here..."
                      className='w-[70%] rounded-lg outline-none mb-3 px-4 py-3 border border-slate-300'/>
                    <div className="w-[70%] aspect-[5/3] rounded-xl border border-slater-200 overflow-hidden">
                      <img src={image?.img1 ? image?.img1 : baseURL + 'assets/img/no-img.jpg'} className="w-[100%] h-[100%] object-cover" />
                    </div>
                  </div>
                  {/* IMAGE COL */}
                  <div className="w-[100%]">
                    <p className='font-semibold mb-2'>Image:</p>
                    <input type='file'
                      name="img2"
                      onChange={(e) => {
                        setImage({...image, img2: URL.createObjectURL(e.target.files[0])})
                        setImgItem([...imgItem, e.target.files[0]])
                      }}
                      placeholder="Enter name here..."
                      className='w-[70%] rounded-lg outline-none mb-3 px-4 py-3 border border-slate-300'/>
                    <div className="w-[70%] aspect-[5/3] rounded-xl border border-slater-200 overflow-hidden">
                      <img src={image?.img2 ? image?.img2 : baseURL + 'assets/img/no-img.jpg'} className="w-[100%] h-[100%] object-cover" />
                    </div>
                  </div>
                </div>
              </div>
              {/* NAME */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Name</p>
                  <input type='text'
                    name="name"
                    onChange={handleInput}
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
                      {[...Array(12)].map((i, key) => (
                        <option value={key+1}>{key+1}</option>
                      ))}
                  </select>
              </div>
              {/* ADDRESS */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Address:</p>
                  <input type='text'
                    name="address"
                    onChange={handleInput}
                    placeholder="Enter name here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
              </div>
              {/* EMAIL */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Email:</p>
                  <input type='text'
                    name="email"
                    onChange={handleInput}
                    placeholder="Enter Email here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
              </div>
              {/* SLUG */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Slug:</p>
                  <input type='text'
                    name="slug"
                    onChange={handleInput}
                    placeholder="Enter name here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
              </div>
              {/* DESCRIPTION */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Description:</p>
                  <textarea
                    name="description"
                    onChange={handleInput}
                    placeholder="Enter Description here..."
                    className='w-[100%] h-[7rem] rounded-lg outline-none px-4 py-3 border border-slate-300'></textarea>
              </div>
              {/* PHONE */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Phone:</p>
                  <input type='text'
                    name="phone"
                    onChange={handleInput}
                    placeholder="Enter Slug here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
              </div>
              {/* WEBSITE */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Website:</p>
                  <input type='text'
                    name="website"
                    onChange={handleInput}
                    placeholder="Enter Website here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
              </div>
              {/* CITY */}
              { cities &&
                <div className='mb-6'>
                    <p className='font-semibold mb-2'>City:</p>
                    <select
                      name="city_id"
                      onChange={handleInput}
                      placeholder="Enter City here..."
                      className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'>
                      <option value=''>Select an option.</option>
                      {cities.map((i, key) => (
                        <option key={key} value={i.id}>{i.name}</option>
                      ))}
                      </select>
                      {errMsg.city_id &&
                        <p className="text-red-600">{errMsg.city_id}</p>
                      }
                </div>
              }
              {/* PROVINCE */}
              { provinces &&
                <div className='mb-6'>
                    <p className='font-semibold mb-2'>Province:</p>
                    <select
                      name="province_id"
                      onChange={handleInput}
                      placeholder="Enter Slug here..."
                      className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'>
                      <option value=''>Select an option.</option>
                      {provinces.map((i, key) => (
                        <option key={key} value={i.id}>{i.name}</option>
                      ))}
                      </select>
                      {errMsg.province_id &&
                        <p className="text-red-600">{errMsg.province_id}</p>
                      }
                </div>
              }
              {/* BUTTON */}
              <div className='flex items-center justify-center pb-[4rem]'>
                  <button 
                    type='submit'
                    className='btn__one'>
                    {isSubmit ? 'Processing' : 'Submit'}
                  </button>
              </div>
            </form>
          </div>
      </section>
  )
}
