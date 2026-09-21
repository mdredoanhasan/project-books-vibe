import React from "react";
import Image from "next/image";
import banner from '@/assets/hero_img.jpg'


const HeroSection = () => {
  return (
    <>
      <div className="container mx-auto bg-[#131313]/8 mt-15 flex justify-between p-20 rounded-2xl">
        <div className="flex flex-col justify-center">
          <h1 className="text-6xl font-bold mb-8">
            Books to freshen up <br/> your bookshelf
          </h1>
          <button className="btn bg-[#23BE0A] mr-3 text-white w-40">View The List </button>
        </div>
        <div>
          <Image src={banner} alt="Books" width={600} height={600} className="rounded-2xl"/>
        </div>
          </div>
          


          
    </>
  );
};

export default HeroSection;
