import Searchbar from "@/components/Searchbar";
import HeroCarousel from "@/components/HeroCarousel"
import Image from "next/image";
import { getAllProducts } from "@/lib/actions";
import ProductCard from "@/components/ProductCard";

const  Home =  async () =>  {

  const allProducts = await getAllProducts();

  return (
   <>
    <section className="px-6 md:mx-20 py-24  ">
      <div className="flex max-xl:flex-col gap-16 ">
        <div className="flex justify-center flex-col">
          <p className="flex gap-2 text-rose-600 text-sm font-medium">
            Smart Shoping Starts Here

            <Image 
            src="/assets/icons/arrow-right.svg"
            width={16}
            height={16}
            alt="arrow icon"
            />
          </p>

          <h1 className="mt-4 text-6xl font-bold leading-[72px] tracking-[-1.2px] text-gray-900 ">
            Unlease the power of 
            <span className="text-rose-600"> PriseWallah</span>      
            </h1>
            <p className="mt-6">
              Powerful, self-serve product and growth analytics to help you, convert, engage, and retain more.
            </p>

           <Searchbar/>
           
        </div>
        <HeroCarousel/>
      </div>
    </section>

    <section className="flex flex-col gap-10 px-6 md-px-[20px] py-24">
      <h2 className="text-secondary font-semibold text-[32px]">Trending</h2>
      <div className="flex flex-wrap gap-x-8 gap-y-16">
        {allProducts?.map((product) => (
          <ProductCard key={product._id} product={product}/>
        ))}
        
      </div>
    </section>
   </>
  );
}

export default Home;