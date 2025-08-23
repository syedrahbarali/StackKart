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
    { id: 1, image: "https://images.unsplash.com/photo-1501091975279-8a337f4a2b3b?q=80&w=1632&auto=format&fit=crop" },
    { id: 2, image: "https://images.unsplash.com/photo-1528906442209-2c4ada1ae286?q=80&w=2070&auto=format&fit=crop" },
    { id: 3, image: "https://images.unsplash.com/photo-1587058101908-d72ee23a3044?w=600&auto=format&fit=crop&q=60" },
    { id: 4, image: "https://images.unsplash.com/photo-1519906193555-b379ccaa9714?w=600&auto=format&fit=crop&q=60" },
    { id: 5, image: "https://images.unsplash.com/photo-1479859546309-cd77fa21c8f6?w=600&auto=format&fit=crop&q=60" }
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
    <div className="relative w-full max-w-4xl mx-auto">
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
                    className="w-full h-[400px] object-cover rounded-2xl"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Arrows */}
        <CarouselPrevious />
        <CarouselNext />
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
