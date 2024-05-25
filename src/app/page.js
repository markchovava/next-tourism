import MainCarousel from "./components/MainCarousel";
import Carousel4 from "./components/Carousel4";
import Grid8 from "./components/Grid8";
import CategoryCarousel from "./components/CategoryCarousel";




export default function Home() {
  return (
   <div>
    {/* CAROUSEL */}
    <MainCarousel />

    <CategoryCarousel title='Top Categories' />

    <Grid8 title='Places to be.' />

    <Carousel4 title='Hotels'/>

    <Carousel4 title='Things to do.'/>
  </div>
  );
}
