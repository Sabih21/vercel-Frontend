"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEVL4Bn3qcBGsjb1mmtwXnDXJY7JWqki0LYQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEVL4Bn3qcBGsjb1mmtwXnDXJY7JWqki0LYQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEVL4Bn3qcBGsjb1mmtwXnDXJY7JWqki0LYQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEVL4Bn3qcBGsjb1mmtwXnDXJY7JWqki0LYQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEVL4Bn3qcBGsjb1mmtwXnDXJY7JWqki0LYQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEVL4Bn3qcBGsjb1mmtwXnDXJY7JWqki0LYQ&s",
//   "https://images.unsplash.com/photo-1521336575822-6da63fb45455?q=80&w=1920&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1920&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1521336575822-6da63fb45455?q=80&w=1920&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1920&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1920&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1521336575822-6da63fb45455?q=80&w=1920&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1920&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1521336575822-6da63fb45455?q=80&w=1920&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1920&auto=format&fit=crop",
];

const WhatsNew = () => {
  const [blinkIndex, setBlinkIndex] = React.useState(null);

  const handleClick = (idx) => {
    setBlinkIndex(idx);
    setTimeout(() => setBlinkIndex(null), 300); // blink duration
  };

  return (
    <section className="my-16 px-6">
      {/* Heading + Carousel in one row */}
      <div className="flex items-center gap-20">
        <h2 className="text-4xl font-normal text-left font-poppins tracking-wide whitespace-nowrap">
          WHAT&apos;S <br /> NEW
        </h2>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="flex-1"
        >
          {/* gap aur compact layout */}
          <CarouselContent className="-ml-0.8">
            {images.map((src, idx) => (
              <CarouselItem
                key={idx}
                className="basis-2/5 sm:basis-1/3 lg:basis-1/6 pl-0.5"
              >
                <div
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => handleClick(idx)}
                >
                  <img
                    src={src}
                    alt={`Item ${idx + 1}`}
                    className={`w-44 h-44 rounded-full object-cover border-4 border-gray-200 shadow-lg transition
                      ${blinkIndex === idx ? "animate-blink" : ""}`}
                  />
                  <p className="font-poppins text-lg font-semibold mt-2">
                    Item {idx + 1}
                  </p>
                  <p className="text-gray-600 font-poppins text-sm">Subtitle</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-3 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute -right-3 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    </section>
  );
};

export default WhatsNew;
