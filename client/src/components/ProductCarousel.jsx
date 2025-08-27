"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FaHeart } from "react-icons/fa";
import { getSingleProduct } from "../utils/product-api.js";
import { useNavigate } from "react-router-dom"; // ✅ Add this

const ProductCarousel = ({ title, categories }) => {
  const isTrending = title.toLowerCase().includes("trending");
  const carouselRef = React.useRef(null);
  const navigate = useNavigate(); // ✅ Initialize

  // Auto-slide
  React.useEffect(() => {
    const interval = setInterval(() => {
      carouselRef.current?.querySelector("[data-carousel-next]")?.click();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="my-16 px-6">
      <h2 className="text-3xl font-medium underline decoration-gray-200 text-center mb-5">
        {title}
      </h2>

      <div ref={carouselRef}>
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-2">
            {categories?.map((cat, idx) => (
              <CarouselItem
                key={idx}
                className="basis-1/2 sm:basis-1/3 lg:basis-1/4 pl-2"
              >
                {/* Product Card */}
                <div
                  onClick={() => navigate(`/product-detail/${cat.id}`)} // ✅ Navigate with id
                  className="flex flex-col bg-white hover:shadow-xl transition relative"
                >
                  {/* Image */}
                  <img
                    src={`${import.meta.env.VITE_API_URL}${cat.img}`}
                    alt={cat.name}
                    className="w-full h-100 object-cover transition-transform duration-300 hover:scale-105"
                  />

                  {/* Product details */}
                  {isTrending ? (
                    <div className="flex justify-between items-center p-3">
                      <div>
                        <p className="text-lg font-bold text-gray-800">
                          {cat.name}
                        </p>
                        <p className="text-xs text-gray-500">{cat.brand}</p>
                        <p className="text-sm font-medium text-gray-600 mt-1">
                          Rs. {cat.price}
                        </p>
                        {cat.tag && (
                          <span className="text-xs bg-gray-200 text-black font-bold px-2 py-0.5 mt-1 inline-block">
                            {cat.tag}
                          </span>
                        )}
                      </div>
                      <div className="p-2 cursor-pointer">
                        <FaHeart size={20} />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center p-3">
                      <p className="text-lg font-semibold text-gray-800 text-center">
                        {cat.name}
                      </p>
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            data-carousel-prev
            className="absolute -left-4 top-1/2 -translate-y-1/2"
          />
          <CarouselNext
            data-carousel-next
            className="absolute -right-4 top-1/2 -translate-y-1/2"
          />
        </Carousel>
      </div>
    </section>
  );
};

export default ProductCarousel;
