import { useRef } from "react";
import { Link } from "react-router-dom"

const CategoriesSlide = ({ categories, setSelectedCategory }) => {
    const categorieContainer = useRef(null);
    const liBox = useRef(null);

    const handleNext = () => {

        const itemWidth = liBox.current.offsetWidth;
        const container = categorieContainer.current;
        const maxScroll = container.scrollWidth - container.clientWidth;

        const newScroll = Math.min(container.scrollLeft + itemWidth, maxScroll);
        container.scrollTo({
            left: newScroll,
            behavior: "smooth"
        });
    };

    const handlePrev = () => {
        const itemWidth = liBox.current.offsetWidth;
        const container = categorieContainer.current;

        const newScroll = Math.max(container.scrollLeft - itemWidth, 0);
        container.scrollTo({
            left: newScroll,
            behavior: "smooth"
        });
    };

    return (
        <nav className="relative w-full  ">
            <button onClick={handlePrev} className="absolute  left-0 top-[50%] translate-y-[-50%]  bg-gray-900 rounded-full text-white p-2 px-4">{"<"}</button>
            <button onClick={handleNext} className="absolute  right-0 top-[50%] translate-y-[-50%]  bg-gray-900 rounded-full text-white p-2 px-4">{">"}</button>

            <div ref={categorieContainer} className="py-2 overflow-x-scroll scrollbar-hide">
                <ul className="flex items-center mx-10">
                    {
                        categories?.map((category, index) => (
                            <li key={index} ref={liBox} onClick={() => { console.log(category); setSelectedCategory(category)}} className="m-2 py-2 px-4 bg-gray-400/50 hover:bg-gray-400/80 transition-[background-color] rounded-xl cursor-pointer">{category.name}</li>
                        ))
                    }
                </ul>
            </div>
        </nav>
    )
}

export default CategoriesSlide
