"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProductCategoryCarousel = ({ category }) => {
  // console.log(
  //   `${import.meta.env.VITE_API_URL}${
  //     Array.isArray(category.category_img)
  //       ? category.category_img[0]
  //       : category.category_img
  //   }`
  // );
  //   console.log("Category data:", category);

  // ✅ Safe parse: agar stringified array hai to parse karo
  let imgUrl = "";
  try {
    if (
      typeof category.category_img === "string" &&
      category.category_img.startsWith("[")
    ) {
      const parsed = JSON.parse(category.category_img); // parse string to array
      imgUrl = parsed[0]; // first image
    } else {
      imgUrl = category.category_img; // direct string
    }
  } catch (error) {
    console.error("Image parse error:", error);
  }

  const carouselRef = React.useRef(null);

  // ✅ Auto-slide every 3s
  React.useEffect(() => {
    const interval = setInterval(() => {
      carouselRef.current?.querySelector("[data-carousel-next]")?.click();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!category) return null; // object na mile to skip karna

  return (
    <section className="my-16 px-6">
      <h2 className="text-3xl font-medium underline decoration-gray-200 text-center mb-5">
        YOU MAY ALSO LIKE
      </h2>

      <div ref={carouselRef}>
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-2">
            <CarouselItem className="basis-1/2 sm:basis-1/3 lg:basis-1/4 pl-2">
              {/* Category Card */}
              <div className="flex flex-col bg-white hover:shadow-xl transition cursor-pointer">
                {/* Category Image */}
                <img
                  src={`${import.meta.env.VITE_API_URL}${imgUrl}`}
                  alt={category.name}
                  className="
                        w-[250px] h-[250px]    /* default (mobile) */
                        sm:w-[300px] sm:h-[300px]  /* tablets */
                        md:w-[350px] md:h-[350px]  /* medium screens */
                        lg:w-[400px] lg:h-[400px]  /* large screens */
                        object-cover rounded-lg mx-auto
                    "
                />

                {/* Category Name */}
                <div className="flex flex-col items-center p-3">
                  <p className="text-xl font-semibold text-gray-800 text-center">
                    {category.name}
                  </p>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>

          {/* Arrows */}
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

export default ProductCategoryCarousel;
