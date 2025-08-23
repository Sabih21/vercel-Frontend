// "use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "../assets/13th-aug-25-bannerRTW-desktop.jpg";
import Image1 from "../assets/13th-aug-25-banner-luxe-web.jpg";

const images = [
//   "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1920&auto=format&fit=crop",
  Image,
  Image1
];

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <Carousel opts={{ loop: true }} className="w-full h-[500px]">
        <CarouselContent>
          {images.map((src, idx) => (
            <CarouselItem key={idx} className="w-full">
              <div className="relative w-full h-[500px]">
                <img
                  src={src}
                  alt={`Hero ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-10 left-10 text-white drop-shadow-lg">
                  <h2 className="text-4xl font-bold">
                    {`Slide ${idx + 1} Caption`}
                  </h2>
                  <button className="mt-4 px-5 py-2 bg-white text-black font-semibold">
                    SHOP NOW
                  </button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl" />
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl" />
      </Carousel>
    </section>
  );
}

export default HeroSection