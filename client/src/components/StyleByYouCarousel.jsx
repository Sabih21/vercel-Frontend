import { useEffect, useRef } from "react";
import { FiShoppingBag } from "react-icons/fi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "../assets/bf70bc66-2ee4-47de-8d59-7c9c459f9c78.png";
const StyledByYou = () => {
  const testimonials = [
    {
      username: "noorullfajr",
      name: "Noor-Ull-Fajr",
      outfit: "3 Piece - Embroidered Lawn Suit",
      image: Image,
    },
    {
      username: "mainmaele",
      name: "Mahin Dar",
      outfit: "Printed Lawn Shirt",
      image: Image,
    },
    {
      username: "mornineashy",
      name: "Mornina",
      outfit: "2 Piece - Embroidered Lawn Suit",
      image: Image,
    },
    {
      username: "makenalayumi",
      name: "Iman",
      outfit: "2 Piece - Embroidered Lawn Suit",
      image: Image,
    },
    {
      username: "fashionlover",
      name: "Ayesha Khan",
      outfit: "Embroidered Net Suit",
      image: Image,
    },
    {
      username: "styleicon",
      name: "Zara Ahmed",
      outfit: "Printed Cotton Shirt",
      image: Image,
    },
  ];

  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.querySelector("[data-carousel-next]")?.click();
      }
    }, 3000); // 3 seconds delay — adjust as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-4 md:px-8 lg:px-12 bg-[#FEF9E8] py-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-medium text-center mb-8">
          STYLED BY YOU
        </h2>

        {/* Carousel */}
        <div className="relative" ref={carouselRef}>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-2 h-full">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                      {/* Image */}
                      <div className="overflow-hidden relative">
                        <img
                          src={testimonial.image}
                          alt={testimonial.outfit}
                          className="w-full h-[300px] object-cover mx-auto"
                        />
                        {/* Shopping Bag Icon */}
                        <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                          <FiShoppingBag size={20} />
                        </button>
                      </div>

                      {/* Text */}
                      <div className="p-4 flex-grow">
                        <h4 className="font-bold text-lg">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-600 mb-1">
                          @{testimonial.username}
                        </p>
                        <p className="text-gray-500 italic mb-2">wearing our</p>
                        <p className="font-medium text-gray-800">
                          {testimonial.outfit}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              data-carousel-prev
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
            />
            <CarouselNext
              data-carousel-next
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
            />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default StyledByYou;
