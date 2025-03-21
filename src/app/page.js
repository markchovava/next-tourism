import { getCategoriesOne} from "@/api/getCategories";
import { getProvinces } from "@/api/getProvinces";
import CarouselCategory from "./components/CarouselCategory";
import CarouselCity from "./components/CarouselCity";
import { getCitiesOne } from "@/api/getCities";
import CarouselPlace from "./components/CarouselPlace";
import { getPlacesByGuideSlug } from "@/api/getPlaceGuides";
import CarouselProvince from "./components/CarouselProvince";
import SectionAdvert from "./components/SectionAdvert";
import { getAdvertbyPriority } from "@/api/getAdverts";
import SliderMainPlaces from "./components/SliderMainPlaces";




export default async function Home() {
   const [ citiesOne, categoriesOne, 
          placeThingsToSee, placeNationalHeritage, placeSpecialActivities,
          placesEntertainment, placeEatSleep, provinces, advertData1, advertData2 ] = await Promise.all([ 
          getCitiesOne(), getCategoriesOne(), getPlacesByGuideSlug('things-to-see'), 
          getPlacesByGuideSlug('national-heritage'), getPlacesByGuideSlug('special-activities'), 
          getPlacesByGuideSlug('entertainment'), getPlacesByGuideSlug('where-to-eat-and-sleep'), 
          getProvinces(), getAdvertbyPriority(1), 
          getAdvertbyPriority(2)
    ]);

  return (
   <div>

    <SliderMainPlaces dbData={placeNationalHeritage} />
    {/* Advert */}
    <SectionAdvert dbData={advertData1} />
    {/*  */}
    <CarouselPlace dbData={placeThingsToSee} title={'Things to see.'} slug={'things-to-see'} />
    {/*  */}
    <CarouselPlace dbData={placeSpecialActivities} title={'Special Activities.'} slug={'special-activities'} />
    {/*  */}
    <CarouselPlace dbData={placesEntertainment} title={'Entertainment.'} slug={'entertainment'} />

    <CarouselPlace dbData={placeEatSleep} title={'Where to eat and sleep?'} slug={'where-to-eat-and-sleep'} />

    <CarouselProvince title='Provinces' dbData={provinces} />

    <CarouselCity title='Top Cities' dbData={citiesOne} />
    
    <CarouselCategory title='Top Categories' categoriesOne={categoriesOne} />


    {/* Advert */}
    <SectionAdvert dbData={advertData2} />



  </div>
  );
}
