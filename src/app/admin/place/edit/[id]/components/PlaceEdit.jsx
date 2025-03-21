"use client"

import { placeUpdateApiAction } from "@/actions/placeActions";
import { placeImageDeleteApiAction } from "@/actions/placeImageActions";
import axiosClientAPI from "@/api/axiosClientAPI";
import { baseURL } from "@/api/baseURL";
import Loader from "@/app/components/Loader";
import { tokenAuth } from "@/tokens/tokenAuth";
import { darkBounce } from "@/utils/roastifyDark";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";



export default function PlaceEdit({ id, placeData, cityData, provinceData }) {
    const place_images = placeData?.data?.place_images;
    let img1; let img2;
    if(place_images?.length > 0) {
      img1 = place_images[0]?.image 
        ? {id: place_images[0]?.id, img: (baseURL + place_images[0]?.image)} 
        : '';
      img2 = place_images[1]?.image 
        ? {id: place_images[1]?.id, img: (baseURL + place_images[1]?.image)} 
        : '';

    }
    const [image, setImage] = useState({ img1: img1, img2: img2 });
    const router = useRouter();
    const [data, setData] = useState(placeData?.data ?? '');
    const [imgItem, setImgItem] = useState([
      {id: 1}, {id: 2}
    ]);
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
    

    /* DELETE DATA */
    async function deleteImage(img_id) {
      try{
      const res = await placeImageDeleteApiAction(img_id)
        if(res.status == 1) {
          toast.success(res?.message, darkBounce);
        }
      } catch (error) {
      console.error(`Error: ${error}`)
      }   
    }  

    const postData = async () => {
      if(!data?.city_id){
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
        formData.append('place_images[]', imgItem[i]?.image);
      }
      try{
          const res = await placeUpdateApiAction(formData, id)
          if(res?.status == 1) {
            toast.success(res?.message, darkBounce);
            router.push(`/admin/place/${id}`);
            setIsSubmit(false)
            return;
          }
          toast.success(res?.message, darkBounce);
          setIsSubmit(false)
          return;
              
          } catch (error) {
              console.error(`Error: ${error}`);
              console.error(`Error Message: ${error.message}`);
              console.error(`Error Response: ${error.response}`);
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
                        setImage({...image, img1: {img: URL.createObjectURL(e.target.files[0])}}) // change viewed image
                        //setImgItem([...imgItem, e.target.files[0]])
                        setImgItem(prev => prev.map(i => (i.id == 1 ? {...i, image: e.target.files[0]} : i)))// Add new image to the list for saving
                        image?.img1?.id ? deleteImage(image?.img1?.id) : ''; // Delete image
                      }}
                      placeholder="Enter name here..."
                      className='w-[100%] md:w-[70%] rounded-lg outline-none mb-3 px-4 py-3 border border-slate-300'/>
                    <div className="w-[100%] md:w-[70%] aspect-[5/3] rounded-xl border border-slater-200 overflow-hidden">
                      <img src={image?.img1?.img ? image?.img1?.img : baseURL + 'assets/img/no-img.jpg'} 
                        className="w-[100%] h-[100%] object-cover" />
                    </div>
                  </div>
                  {/* IMAGE COL */}
                  <div className="w-[100%]">
                    <p className='font-semibold mb-2'>Image:</p>
                    <input type='file'
                      name="img2"
                      onChange={(e) => {
                        setImage({...image, img2: {img: URL.createObjectURL(e.target.files[0])}})
                        //setImgItem([...imgItem, e.target.files[0]])
                        setImgItem(prev => prev.map(i => (i?.id == 2 ? {...i, image: e.target.files[0]} : i)))
                        image?.img2?.id ? deleteImage(image?.img2?.id) : '';
                      }}
                      placeholder="Enter name here..."
                      className='w-[100%] md:w-[70%] rounded-lg outline-none mb-3 px-4 py-3 border border-slate-300'/>
                    <div className="w-[100%] md:w-[70%] aspect-[5/3] rounded-xl border border-slater-200 overflow-hidden">
                      <img src={image?.img2?.img ? image?.img2?.img : baseURL + 'assets/img/no-img.jpg'} 
                        className="w-[100%] h-[100%] object-cover" />
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
                    value={data?.name}
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
                        <option 
                          value={key+1} 
                          selected={data?.priority == (key+1) && 'selected'}>
                          {key+1}</option>
                      ))}
                  </select>
              </div>
              {/* ADDRESS */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Address:</p>
                  <input type='text'
                    name="address"
                    value={data?.address}
                    onChange={handleInput}
                    placeholder="Enter name here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
              </div>
              {/* EMAIL */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Email:</p>
                  <input type='text'
                    name="email"
                    value={data?.email}
                    onChange={handleInput}
                    placeholder="Enter Email here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
              </div>
              {/* SLUG */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Slug:</p>
                  <input type='text'
                    name="slug"
                    value={data?.slug}
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
                    value={data?.description}
                    placeholder="Enter Description here..."
                    className='w-[100%] h-[7rem] rounded-lg outline-none px-4 py-3 border border-slate-300'></textarea>
              </div>
              {/* PHONE */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Phone:</p>
                  <input type='text'
                    name="phone"
                    value={data?.phone}
                    onChange={handleInput}
                    placeholder="Enter Slug here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
              </div>
              {/* WEBSITE */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Website:</p>
                  <input type='text'
                    name="website"
                    value={data?.website}
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
                        <option key={key} value={i?.id} selected={i?.id == data?.city_id && 'selected'}>{i?.name}</option>
                      ))}
                      </select>
                      {errMsg?.city_id &&
                        <p className="text-red-600">{errMsg?.city_id}</p>
                      }
                </div>
              }
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
                        <option key={key} value={i?.id} selected={i?.id == data?.province_id && 'selected'}>
                          {i.name}</option>
                      ))}
                      </select>
                      {errMsg?.province_id &&
                        <p className="text-red-600">{errMsg?.province_id}</p>
                      }
                </div>
              }
              {/* BUTTON */}
              <div className='flex items-center justify-center pb-[4rem]'>
                  <button 
                    type="submit"
                    className='btn__one'>
                    { isSubmit ? 'Processing' : 'Submit' }
                  </button>
              </div>

            </form>
          </div>
      </section>
  )
}
