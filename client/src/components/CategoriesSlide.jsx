import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CategoriesSlide = ({ categories, setSelectedCategory }) => {
  const categorieContainer = useRef(null);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (categorieContainer.current) {
        const hasOverflow = categorieContainer.current.scrollWidth > categorieContainer.current.clientWidth;
        setShowButtons(hasOverflow);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [categories]);

  const handleNext = () => {
    if (!categorieContainer.current) return;

    const container = categorieContainer.current;
    const item = container.querySelector('li');
    if (!item) return;

    const itemWidth = item.offsetWidth + parseInt(getComputedStyle(item).marginLeft) + parseInt(getComputedStyle(item).marginRight); // Include margins for accurate scrolling
    const maxScroll = container.scrollWidth - container.clientWidth;
    const newScroll = Math.min(container.scrollLeft + itemWidth, maxScroll);

    container.scrollTo({
      left: newScroll,
      behavior: "smooth"
    });
  };

  const handlePrev = () => {
    if (!categorieContainer.current) return;

    const container = categorieContainer.current;
    const item = container.querySelector('li');
    if (!item) return;

    const itemWidth = item.offsetWidth + parseInt(getComputedStyle(item).marginLeft) + parseInt(getComputedStyle(item).marginRight);
    const newScroll = Math.max(container.scrollLeft - itemWidth, 0);

    container.scrollTo({
      left: newScroll,
      behavior: "smooth"
    });
  };

  return (
    <>
      {categories.length ? (
        <nav className="relative w-full">
          {showButtons && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-0 top-[50%] translate-y-[-50%] bg-gray-900 rounded-full text-white p-2 px-4 z-10 shadow-md hover:bg-gray-800 transition-colors"
                aria-label="Previous category"
              >
                {"<"}
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-[50%] translate-y-[-50%] bg-gray-900 rounded-full text-white p-2 px-4 z-10 shadow-md hover:bg-gray-800 transition-colors"
                aria-label="Next category"
              >
                {">"}
              </button>
            </>
          )}
          <div ref={categorieContainer} className="py-2 overflow-x-auto scrollbar-hide scroll-smooth">
            <ul className="flex items-center whitespace-nowrap">
              {categories?.map((category, index) => (
                <li
                  key={index}
                  onClick={() => {
                    console.log(category);
                    setSelectedCategory(category);
                  }}
                  className="m-2 py-2 px-4 bg-gray-400/50 hover:bg-gray-400/80 transition-[background-color] rounded-xl cursor-pointer flex-shrink-0"
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      ) : null}
    </>
  );
};

export default CategoriesSlide;