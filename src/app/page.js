import MainCarousel from "./components/MainCarousel";
import CategoryCarousel from "./components/CategoryCarousel";
import { getCategoriesOne, getCategoryPlaces } from "@/api/getCategories";
import { getCitiesOne } from "@/api/getCities";
import { getPlacesOne } from "@/api/getPlaces";
import CarouselRestaurants from "./components/CarouselRestaurants";
import CarouselHotels from "./components/CarouselHotels";
import GridPlaces from "./components/GridPlaces";




export default async function Home() {
   const [citiesOne, categoriesOne, placesOne, hotelPlaces, restaurantPlaces] = await Promise.all([ 
        getCitiesOne(), 
        getCategoriesOne(), 
        getPlacesOne(), 
        getCategoryPlaces('hotels'),
        getCategoryPlaces('restaurants'),
    ]);

  return (
   <div>
    {/* CAROUSEL */}
    <MainCarousel citiesOne={citiesOne} />

    <CategoryCarousel title='Top Categories' categoriesOne={categoriesOne} />

    <GridPlaces title='Places to be.' placesOne={placesOne} />

    <CarouselHotels title='Hotels' slug='hotels' hotelPlaces={hotelPlaces} />

    <CarouselRestaurants title='Restaurants' slug='restaurants' restaurantPlaces={restaurantPlaces} />
  </div>
  );
}
