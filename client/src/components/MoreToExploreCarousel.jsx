import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Image from "../assets/bf70bc66-2ee4-47de-8d59-7c9c459f9c78.png";

const MyCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(1);

  const items = [
    {
      id: 1,
      title: "DS - READY TO WEAR",
      subtitle: "Men's best shades, tailored for you!",
      image: Image,
    },
    {
      id: 2,
      title: "THE JOY OF UNSCRIPTED MOMENTS",
      subtitle:
        "This season is all about returning to the essence of joy, and our Unstitched Summer '25 welcomes you into that feeling!",
      image: Image,
    },
    {
      id: 3,
      title: "FABRIC GLOSSARY",
      subtitle: "Learn more about what went in making of your favourite",
      image: Image,
    },

    {
      id: 1,
      title: "DS - READY TO WEAR",
      subtitle: "Men's best shades, tailored for you!",
      image: Image,
    },
    {
      id: 2,
      title: "THE JOY OF UNSCRIPTED MOMENTS",
      subtitle:
        "This season is all about returning to the essence of joy, and our Unstitched Summer '25 welcomes you into that feeling!",
      image: Image,
    },
    {
      id: 3,
      title: "FABRIC GLOSSARY",
      subtitle: "Learn more about what went in making of your favourite",
      image: Image,
    },
  ];

  // Slow auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % items.length);
    }, 5000); // 5 seconds per slide
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="w-full py-16 px-4 overflow-hidden">
      <h2 className="text-3xl font-medium underline decoration-gray-200 font-poppins tracking-wide text-center mb-5">
        MORE TO EXPLORE
      </h2>

      <Carousel
        className="w-full"
        opts={{
          startIndex: currentSlide,
          align: "center",
          slidesToScroll: 1,
          loop: true,
          onSelect: (newSlide) => setCurrentSlide(newSlide),
        }}
      >
        <CarouselContent className="flex items-center">
          {items.map((item, index) => {
            const isActive = index === currentSlide;
            return (
              <CarouselItem
                key={item.id}
                className="basis-1/3 flex flex-col items-center"
              >
                <div className="relative w-full flex justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`rounded-lg shadow-xl object-cover transition-all duration-500
                      ${isActive ? "w-[100%] h-[500px]" : "w-[70%] h-[350px]"}`}
                  />
                </div>
                {isActive && (
                  <div className="mt-4 text-center">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {item.subtitle}
                    </p>
                  </div>
                )}
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white" />
      </Carousel>

      {/* Indicators */}
      <div className="flex justify-center mt-8 space-x-3">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? "bg-black w-8" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MyCarousel;
