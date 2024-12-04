"use client"

import axiosClientAPI from "@/api/axiosClientAPI";
import { baseURL } from "@/api/baseURL";
import Loader from "@/app/components/Loader";
import { tokenAuth } from "@/tokens/tokenAuth";
import { darkBounce } from "@/utils/roastifyDark";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";



export default function PlaceAdd() {
  const router = useRouter();
    const [data, setData] = useState({});
    const [imgItem, setImgItem] = useState([]);
    const [image, setImage] = useState({})
    const [errMsg, setErrMsg] = useState({});
    const [provinces, setProvinces] = useState();
    const [cities, setCities] = useState();
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
    /* GET */
    async function getProvinces() {
      try{
        const result = await axiosClientAPI.get(`province-all/`, config)
        .then((response) => {
          setProvinces(response.data.data)
        })
      } catch (error) {
        console.error(`Error: ${error}`)
      }   
    }    
    /* GET */
    async function getCities() {
      try{
        const result = await axiosClientAPI.get(`city-all/`, config)
        .then((response) => {
          setCities(response.data.data)
        })
      } catch (error) {
        console.error(`Error: ${error}`)
      }   
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
      const formData = {
          priority: data?.priority,
          city_id: data?.city_id,
          province_id: Number(data?.province_id),
          name: data?.name,
          slug: data?.slug,
          description: data?.description,
          phone: data?.phone,
          address: data?.address,
          email: data?.email,
          website: data?.website,
          place_images: imgItem,
      };
      try{
          const result = await axiosClientAPI.post(`place`, formData, config)
          .then((response) => {
            toast.success(response.data.message, darkBounce);
            router.push(`/admin/place`);
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
      getCities()
      getProvinces(); 
    }, []);

    useEffect(() => {
        isSubmit === true && postData();
    }, [isSubmit]);

    if(!provinces && !cities){ return ( <Loader /> ) }
  
  
  return (
    <section className='w-[100%]'>
          <div className='mx-auto w-[90%]'>
              {/*  */}
              <div className='mb-6'>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
                  {/* COL */}
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
                  {/* COL */}
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
                  {/* COL */}
                  <div className="w-[100%]">
                    <p className='font-semibold mb-2'>Image:</p>
                    <input type='file'
                      name="img3"
                      onChange={(e) => {
                        setImage({...image, img3: URL.createObjectURL(e.target.files[0])})
                        setImgItem([...imgItem, e.target.files[0]])
                      }}
                      placeholder="Enter name here..."
                      className='w-[70%] rounded-lg outline-none mb-3 px-4 py-3 border border-slate-300'/>
                    <div className="w-[70%] aspect-[5/3] rounded-xl border border-slater-200 overflow-hidden">
                      <img src={image?.img3 ? image?.img3 : baseURL + 'assets/img/no-img.jpg'} 
                        className="w-[100%] h-[100%] object-cover" />
                    </div>
                  </div>
                  {/* COL */}
                  <div className="w-[100%]">
                    <p className='font-semibold mb-2'>Image:</p>
                    <input type='file'
                      name="img4"
                      onChange={(e) => {
                        setImage({...image, img4: URL.createObjectURL(e.target.files[0])})
                        setImgItem([...imgItem, e.target.files[0]])
                      }}
                      placeholder="Enter name here..."
                      className='w-[70%] rounded-lg outline-none mb-3 px-4 py-3 border border-slate-300'/>
                    <div className="w-[70%] aspect-[5/3] rounded-xl border border-slater-200 overflow-hidden">
                      <img src={image?.img4 ? image?.img4 : baseURL + 'assets/img/no-img.jpg'} 
                        className="w-[100%] h-[100%] object-cover" />
                    </div>
                  </div>
                </div>
              </div>
              {/*  */}
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
              {/*  */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Address:</p>
                  <input type='text'
                    name="address"
                    onChange={handleInput}
                    placeholder="Enter name here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
              </div>
              {/*  */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Email:</p>
                  <input type='text'
                    name="email"
                    onChange={handleInput}
                    placeholder="Enter Email here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
              </div>
              {/*  */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Slug:</p>
                  <input type='text'
                    name="slug"
                    onChange={handleInput}
                    placeholder="Enter name here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
              </div>
              {/*  */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Description:</p>
                  <textarea
                    name="description"
                    onChange={handleInput}
                    placeholder="Enter Description here..."
                    className='w-[100%] h-[7rem] rounded-lg outline-none px-4 py-3 border border-slate-300'></textarea>
              </div>
              {/*  */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Phone:</p>
                  <input type='text'
                    name="phone"
                    onChange={handleInput}
                    placeholder="Enter Slug here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
              </div>
              {/*  */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Website:</p>
                  <input type='text'
                    name="website"
                    onChange={handleInput}
                    placeholder="Enter Website here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
              </div>
              {/*  */}
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
