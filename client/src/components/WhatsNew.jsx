"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getAllProducts } from "../utils/product-api.js";

const WhatsNew = () => {
  const [blinkIndex, setBlinkIndex] = React.useState(null);
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        // ✅ filter only whats_new = 1
        const whatsNewProducts = res?.rows?.filter((p) => p.whats_new === 1);
        setProducts(whatsNewProducts || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

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
          <CarouselContent className="-ml-0.8">
            {products.length > 0 ? (
              products.map((product, idx) => (
                <CarouselItem
                  key={product.id}
                  className="basis-2/5 sm:basis-1/3 lg:basis-1/6 pl-0.5"
                >
                  <div
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => handleClick(idx)}
                  >
                    <img
                      src={`${import.meta.env.VITE_API_URL}${
                        JSON.parse(product.productImg || "[]")[0]
                      }`}
                      alt={product.name}
                      className={`w-44 h-44 rounded-full object-cover border-4 border-gray-200 shadow-lg transition
                        ${blinkIndex === idx ? "animate-blink" : ""}`}
                    />
                    <p className="font-poppins text-lg font-semibold mt-2">
                      {product.name}
                    </p>
                    {/* <p className="text-gray-600 font-poppins text-sm">
                      Rs. {Number(product.price).toFixed(2)}
                    </p> */}
                  </div>
                </CarouselItem>
              ))
            ) : (
              <p className="text-gray-500">No new products available</p>
            )}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-3 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute -right-3 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    </section>
  );
};

export default WhatsNew;
