import { useEffect, useRef, useState } from "react";
import { next, prev } from "../services/bannerService";
import { useMemo } from "react";

const Banner = () => {
    const bannerContainer = useRef();

    const bannerImages = useMemo(() => [
        { id: 1, image: "https://images.unsplash.com/photo-1501091975279-8a337f4a2b3b?q=80&w=1632&auto=format&fit=crop" },
        { id: 2, image: "https://images.unsplash.com/photo-1528906442209-2c4ada1ae286?q=80&w=2070&auto=format&fit=crop" },
        { id: 3, image: "https://images.unsplash.com/photo-1587058101908-d72ee23a3044?w=600&auto=format&fit=crop&q=60" },
        { id: 4, image: "https://images.unsplash.com/photo-1519906193555-b379ccaa9714?w=600&auto=format&fit=crop&q=60" },
        { id: 5, image: "https://images.unsplash.com/photo-1479859546309-cd77fa21c8f6?w=600&auto=format&fit=crop&q=60" }
    ], []);

    const [slideCount, setSlideCount] = useState(1);

    const handleNextSlide = () => {
        next(bannerContainer, bannerImages, slideCount, setSlideCount);
    };

    const handlePrevSlide = () => {
        prev(bannerContainer, bannerImages, slideCount, setSlideCount);
    };

    useEffect(() => {
        console.log("Rendering")
        const interval = setTimeout(() => {
            setSlideCount(prevCount => {
                const newCount = prevCount + 1 > bannerImages.length ? 1 : prevCount + 1;
                next(bannerContainer, bannerImages, newCount, () => { });
                return newCount;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [bannerImages]); // sirf bannerImages pe depend karega


    return (
        <div className="relative w-full h-[300px]">
            <div
                ref={bannerContainer}
                className="h-full w-full overflow-x-scroll scroll-smooth scrollbar-hide"
                style={{ scrollBehavior: "smooth" }}
            >
                <ul className="flex max-h-full">
                    {bannerImages.map((image, index) => (
                        <li key={index} className="min-w-full max-h-full">
                            <img
                                src={image.image}
                                alt=""
                                className="min-w-full max-h-full object-cover"
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <button
                className="absolute left-4 top-1/2 -translate-y-1/2 
               bg-black/50 text-white px-4 py-2 rounded-full 
               shadow-lg backdrop-blur-sm
               hover:bg-black/70 active:scale-95
               transition-all duration-300 ease-in-out"
                onClick={handleNextSlide}
            >
                Next
            </button>

            <button
                className="absolute right-4 top-1/2 -translate-y-1/2 
               bg-black/50 text-white px-4 py-2 rounded-full 
               shadow-lg backdrop-blur-sm
               hover:bg-black/70 active:scale-95
               transition-all duration-300 ease-in-out"
                onClick={handlePrevSlide}
            >
                Prev
            </button>

        </div>
    );
};

export default Banner;
