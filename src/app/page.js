import { getCategoriesOne, getCategoryPlaces } from "@/api/getCategories";
import { getPlacesOne } from "@/api/getPlaces";
import CarouselRestaurants from "./components/CarouselRestaurants";
import CarouselHotels from "./components/CarouselHotels";
import GridPlaces from "./components/GridPlaces";
import { getProvinces, getProvincesAll } from "@/api/getProvinces";
import CarouselCategory from "./components/CarouselCategory";
import CarouselCity from "./components/CarouselCity";
import { getCitiesOne } from "@/api/getCities";
import SliderMain from "./components/SliderMain";
import { getEventsByNumber } from "@/api/getEvents";
import CarouselPlace from "./components/CarouselPlace";
import { getPlacesByGuideSlug } from "@/api/getPlaceGuides";
import CarouselProvince from "./components/CarouselProvince";




export default async function Home() {
   const [eventsByNumber, citiesOne, categoriesOne, placeNationalHeritage, placeSpecialActivities,
          placesEntertainment, placeEatSleep, provinces] = await Promise.all([ 
          getEventsByNumber(4), getCitiesOne(), getCategoriesOne(), 
          getPlacesByGuideSlug('national-heritage'), getPlacesByGuideSlug('special-activities'),
          getPlacesByGuideSlug('entertainment'), getPlacesByGuideSlug('where-to-eat-and-sleep'), 
          getProvinces()
    ]);

  return (
   <div>

    <SliderMain eventsByNumber={eventsByNumber} />
    {/*  */}
    <CarouselPlace dbData={placeNationalHeritage} title={'National Heritage'} slug={'national-heritage'} />
    {/*  */}
    <CarouselPlace dbData={placeSpecialActivities} title={'Special Activities'} slug={'special-activities'} />
    {/*  */}
    <CarouselPlace dbData={placesEntertainment} title={'Entertainment'} slug={'entertainment'} />

    <CarouselPlace dbData={placeEatSleep} title={'Where to eat and sleep'} slug={'where-to-eat-and-sleep'} />

    <CarouselProvince title='Provinces' dbData={provinces} />

    <CarouselCity title='Top Cities' dbData={citiesOne} />
    
    <CarouselCategory title='Top Categories' categoriesOne={categoriesOne} />



  </div>
  );
}
