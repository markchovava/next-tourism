"use client"

import axiosClientAPI from "@/api/axiosClientAPI";
import { baseURL } from "@/api/baseURL";
import Loader from "@/app/components/Loader";
import { tokenAuth } from "@/tokens/tokenAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";



export default function PlaceEdit({ id }) {
    const router = useRouter();
    const [data, setData] = useState({});
    const [imgItem, setImgItem] = useState([
      {id: 1},
      {id: 2},
      {id: 3},
      {id: 4},
      {id: 5},
    ]);
    const [image, setImage] = useState({})
    const [errMsg, setErrMsg] = useState({});
    const [provinces, setProvinces] = useState();
    const [cities, setCities] = useState();
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
        const result = await axiosClientAPI.get(`place/${id}`, config)
        .then((response) => {
          const place_images = response?.data?.data?.place_images;
          setData(response.data.data)
          const img1 = place_images[0]?.image 
            ? {id: place_images[0]?.id, img: (baseURL + place_images[0]?.image)} 
            : '';
          const img2 = place_images[1]?.image 
            ? {id: place_images[1]?.id, img: (baseURL + place_images[1]?.image)} 
            : '';
          const img3 = place_images[2]?.image 
            ? {id: place_images[2]?.id, img: (baseURL + place_images[2]?.image)} 
            : '';
          const img4 = place_images[3]?.image 
            ? {id: place_images[3]?.id, img: (baseURL + place_images[3]?.image)} 
            : '';
          const img5 = place_images[4]?.image 
            ? {id: place_images[4]?.id, img: (baseURL + place_images[4]?.image)} 
            : '';
          setImage({
            img1: img1, img2: img2, img3: img3, img4: img4, img5: img5,
          })
        })
      } catch (error) {
        console.error(`Error: ${error}`)
      }   
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

    /* DELETE DATA */
    async function deleteImage(id) {
      //console.log('Deleted image is', id)
      try{
      const result = await axiosClientAPI.delete(`place-image/${id}`, config)
      .then((response) => {
          if(response.data.status == 1) {
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
          }
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

      let place_images = [];
      for(let i = 0; imgItem.length > i; i++){
        if(imgItem[i]?.image){
          place_images = [...place_images, imgItem[i].image]
        }
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
          place_images: place_images,
      };
      try{
          const result = await axiosClientAPI.post(`place/${id}`, formData, config)
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
            router.push(`/admin/place/${id}`);
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
      getData()
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
                <div className="grid grid-cols-4 gap-8">
                  {/* COL */}
                  <div className="w-[100%]">
                    <p className='font-semibold mb-2'>Image:</p>
                    <input type='file'
                      name="img1"
                      onChange={(e) => {
                        setImage({...image, img1: {img: URL.createObjectURL(e.target.files[0])}}) // change viewed image
                        //setImgItem([...imgItem, e.target.files[0]])
                        setImgItem(prev => prev.map(i => (i.id == 1 ? {...i, image: e.target.files[0]} : i)))// Add new image to the list for saving
                        image.img1?.id ? deleteImage(image.img1.id) : ''; // Delete image
                      }}
                      placeholder="Enter name here..."
                      className='w-[100%] rounded-lg outline-none mb-3 px-4 py-3 border border-slate-300'/>
                    <div className="w-[100%] aspect-[5/3] rounded-xl border border-slater-200 overflow-hidden">
                      <img src={image.img1.img} className="w-[100%] h-[100%] object-cover" />
                    </div>
                  </div>
                  {/* COL */}
                  <div className="w-[100%]">
                    <p className='font-semibold mb-2'>Image:</p>
                    <input type='file'
                      name="img2"
                      onChange={(e) => {
                        setImage({...image, img2: {img: URL.createObjectURL(e.target.files[0])}})
                        //setImgItem([...imgItem, e.target.files[0]])
                        setImgItem(prev => prev.map(i => (i.id == 2 ? {...i, image: e.target.files[0]} : i)))
                        image.img2?.id ? deleteImage(image.img2.id) : '';
                      }}
                      placeholder="Enter name here..."
                      className='w-[100%] rounded-lg outline-none mb-3 px-4 py-3 border border-slate-300'/>
                    <div className="w-[100%] aspect-[5/3] rounded-xl border border-slater-200 overflow-hidden">
                      <img src={image.img2.img} className="w-[100%] h-[100%] object-cover" />
                    </div>
                  </div>
                  {/* COL */}
                  <div className="w-[100%]">
                    <p className='font-semibold mb-2'>Image:</p>
                    <input type='file'
                      name="img3"
                      onChange={(e) => {
                        setImage({...image, img3: {img: URL.createObjectURL(e.target.files[0])}})
                        setImgItem(prev => prev.map(i => (i.id == 3 ? {...i, image: e.target.files[0]} : i)))
                        image.img3?.id ? deleteImage(image.img3.id) : '';
                      }}
                      placeholder="Enter name here..."
                      className='w-[100%] rounded-lg outline-none mb-3 px-4 py-3 border border-slate-300'/>
                    <div className="w-[100%] aspect-[5/3] rounded-xl border border-slater-200 overflow-hidden">
                      <img src={image.img3.img} className="w-[100%] h-[100%] object-cover" />
                    </div>
                  </div>
                  {/* COL */}
                  <div className="w-[100%]">
                    <p className='font-semibold mb-2'>Image:</p>
                    <input type='file'
                      name="img4"
                      onChange={(e) => {
                        setImage({...image, img4: {img: URL.createObjectURL(e.target.files[0])}})
                        setImgItem(prev => prev.map(i => (i.id == 4 ? {...i, image: e.target.files[0]} : i)))
                        image.img4?.id ? deleteImage(image.img4.id) : '';
                      }}
                      placeholder="Enter name here..."
                      className='w-[100%] rounded-lg outline-none mb-3 px-4 py-3 border border-slate-300'/>
                    <div className="w-[100%] aspect-[5/3] rounded-xl border border-slater-200 overflow-hidden">
                      <img src={image.img4.img} className="w-[100%] h-[100%] object-cover" />
                    </div>
                  </div>
                  {/* COL */}
                  <div className="w-[100%]">
                    <p className='font-semibold mb-2'>Image:</p>
                    <input type='file'
                      name="img5"
                      onChange={(e) => {
                        setImage({...image, img5: {img: URL.createObjectURL(e.target.files[0])}}) // change viewed image
                        setImgItem(prev => prev.map(i => (i.id == 5 ? {...i, image: e.target.files[0]} : i))); // Add new image to the list for saving
                        image.img5?.id ? deleteImage(image.img5.id) : ''; // Delete image
                      }}
                      placeholder="Enter name here..."
                      className='w-[100%] rounded-lg outline-none mb-3 px-4 py-3 border border-slate-300'/>
                    <div className="w-[100%] aspect-[5/3] rounded-xl border border-slater-200 overflow-hidden">
                      <img src={image.img5.img} className="w-[100%] h-[100%] object-cover" />
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
                  <p className='font-semibold mb-2'>Address:</p>
                  <input type='text'
                    name="address"
                    value={data.address}
                    onChange={handleInput}
                    placeholder="Enter name here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
              </div>
              {/*  */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Email:</p>
                  <input type='text'
                    name="email"
                    value={data.email}
                    onChange={handleInput}
                    placeholder="Enter Email here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
              </div>
              {/*  */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Slug:</p>
                  <input type='text'
                    name="slug"
                    value={data.slug}
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
                    value={data.description}
                    placeholder="Enter Description here..."
                    className='w-[100%] h-[7rem] rounded-lg outline-none px-4 py-3 border border-slate-300'></textarea>
              </div>
              {/*  */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Phone:</p>
                  <input type='text'
                    name="phone"
                    value={data.phone}
                    onChange={handleInput}
                    placeholder="Enter Slug here..."
                    className='w-[100%] rounded-lg outline-none px-4 py-3 border border-slate-300'/>
              </div>
              {/*  */}
              <div className='mb-6'>
                  <p className='font-semibold mb-2'>Website:</p>
                  <input type='text'
                    name="website"
                    value={data.website}
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
                        <option key={key} value={i.id} selected={i.id == data.city_id && 'selected'}>{i.name}</option>
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
                        <option key={key} value={i.id} selected={i.id == data.province_id && 'selected'}>
                          {i.name}</option>
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
