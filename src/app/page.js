import MainCarousel from "./components/MainCarousel";
import { getCategoriesOne, getCategoryPlaces } from "@/api/getCategories";
import { getPlacesOne } from "@/api/getPlaces";
import CarouselRestaurants from "./components/CarouselRestaurants";
import CarouselHotels from "./components/CarouselHotels";
import GridPlaces from "./components/GridPlaces";
import { getProvincesAll } from "@/api/getProvinces";
import CarouselCategory from "./components/CarouselCategory";
import CarouselCity from "./components/CarouselCity";
import { getCitiesOne } from "@/api/getCities";




export default async function Home() {
   const [provinces, citiesOne, categoriesOne, placesOne, hotelPlaces, restaurantPlaces] = await Promise.all([ 
        getProvincesAll(), 
        getCitiesOne(),
        getCategoriesOne(), 
        getPlacesOne(), 
        getCategoryPlaces('hotels'),
        getCategoryPlaces('restaurants'),
    ]);

  return (
   <div>
    {/* CAROUSEL */}
    <MainCarousel provinces={provinces} />

    <CarouselCategory title='Top Categories' categoriesOne={categoriesOne} />

    <CarouselCity title='Top Cities' citiesOne={citiesOne} />

    <GridPlaces title='Places to be.' placesOne={placesOne} />

    <CarouselHotels title='Hotels' slug='hotels' hotelPlaces={hotelPlaces} />

    <CarouselRestaurants title='Restaurants' slug='restaurants' restaurantPlaces={restaurantPlaces} />
  </div>
  );
}
