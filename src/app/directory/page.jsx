import { getCategoriesOne, getCategoryPlaces } from "@/api/getCategories";
import { getPlaces, getPlacesOne } from "@/api/getPlaces";
import { getProvinces, getProvincesAll } from "@/api/getProvinces";
import { getCities, getCitiesOne } from "@/api/getCities";
/* COMPONENTS */
import CarouselCategory from "../components/CarouselCategory";
import CarouselCity from "../components/CarouselCity";
import MainCarousel from "./components/MainCarousel";
import CarouselPlaceListing from "./components/CarouselPlaceListing";
import CarouselGuide from "../components/CarouselGuide";
import { getGuides } from "@/api/getGuides";
import CarouselProvince from "../components/CarouselProvince";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";
import SectionAdvert from "../components/SectionAdvert";
import { getAdvertbyPriority } from "@/api/getAdverts";




export default async function Home() {
   const [
    provincesData, citiesData, 
    categoriesOne, placesData, 
    guidesData, advertData ] = await Promise.all([ 
        getProvinces(), getCities(), 
        getCategoriesOne(), getPlaces(), 
        getGuides(), getAdvertbyPriority(3)
    ]);

  return (
   <>
    {/* Bread Crumbs */}
    <section className='w-[100%]'>
      <div className='mx-auto w-[90%] border-b border-slate-200'>
          <ul className='flex items-center justify-start gap-2 px-3 py-2'>
              <li><Link href='/'>Home</Link></li>
              <li><FaAngleRight /></li>
              <li><Link href='/directory'>Directory Listings</Link></li>                               
          </ul>
      </div>
    </section>

    <section className="">
      <h3 className="pt-[10rem] pb-[5rem] font-bold text-[3rem] flex items-center justify-center">
        Zimbabwe Directory Listing</h3>
    </section>

    <CarouselProvince title='Province Listings' dbData={provincesData} />

    <SectionAdvert dbData={advertData} />

    <CarouselCategory title='Category Listings' categoriesOne={categoriesOne} />

    <CarouselCity title='Cities Listing' dbData={citiesData} />

    <CarouselPlaceListing dbData={placesData} title={'Places to visit.'} />

    <CarouselGuide title={'Travel Guides'} dbData={guidesData} />

    
  </>
  );
}
