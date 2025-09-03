import { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";

const Banner = () => {
  const bannerImages = useMemo(() => [
    { id: 2, image: "./banner-2.jpg" },
    { id: 1, image: "./banner-1.jpg" },
    { id: 3, image: "./banner-3.jpg" },
  ], []);

const [api, setApi] = useState(null);
const [activeIndex, setActiveIndex] = useState(0);

useEffect(() => {
  if (!api) return;

  const onSelect = () => {
    setActiveIndex(api.selectedScrollSnap());
  };

  api.on("select", onSelect);
  onSelect();

  return () => {
    api.off("select", onSelect);
  };
}, [api]);

return (
  <div className="relative w-full mx-auto">
    <Carousel
      setApi={setApi}
      opts={{ loop: true }}   // 👈 looping enabled
      plugins={[
        Autoplay({
          delay: 3000,   // 3 sec ke baad next slide
          stopOnInteraction: false, // user click kare to bhi autoplay continue rahe
        }),
      ]}
      className="w-full"
    >
      <CarouselContent>
        {bannerImages.map((item, index) => (
          <CarouselItem key={item.id}>
            <Card>
              <CardContent className="flex items-center justify-center p-0">
                <img
                  src={item.image}
                  alt={`Banner ${index + 1}`}
                  className="w-full object-cover rounded-2xl"
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Arrows */}
      <CarouselPrevious className="left-4 md:-left-12" />
      <CarouselNext className="right-4 md:-right-12" />
    </Carousel>

    {/* Indicators */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      {bannerImages.map((_, index) => (
        <button
          key={index}
          className={`h-3 w-3 rounded-full transition-all duration-300 
              ${activeIndex === index ? "bg-indigo-600 scale-125" : "bg-gray-300"}`}
          onClick={() => api?.scrollTo(index)}
        />
      ))}
    </div>
  </div>
);
};

export default Banner;