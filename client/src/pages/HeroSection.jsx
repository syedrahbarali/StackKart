import { useEffect, useState } from "react";
import Banner from "../components/Banner"
import CategoriesSlide from "../components/CategoriesSlide";
import { fetchCategories } from "../services/productServices";
import RenderProducts from "../components/RenderProducts";

const HeroSection = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const handleFetchCategories = async () => {
      console.log("UseEffect is running")
      setLoading(true);

      await fetchCategories().then(res => {
        res.categories.unshift({ id: 0, name: "All" });
        setCategories(res.categories);
      }).finally(() => {
        setLoading(false)
      });
    }

    handleFetchCategories();
  },[]);

  return (
    <>
      {
        loading ? (
          <div className="flex items-center justify-center h-screen w-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <>
            <Banner categories={categories} />
            <div>
              <CategoriesSlide categories={categories} setSelectedCategory={setSelectedCategory}  />
              <RenderProducts selectedCategory={selectedCategory} />
            </div>

          </>
        )
      }
    </>
  )
}

export default HeroSection
