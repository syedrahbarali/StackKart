import { useState, useEffect, useRef } from "react";
import { addProduct, fetchCategories } from "../../services/adminService"; // Assuming services for adding product and fetching categories
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([null, null, null, null, null]);
  const [imagePreviews, setImagePreviews] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const imageRowRef = useRef();

  useEffect(() => {
    fetchCategories().then((res) => {
      setCategoriesList(res.categories || []);
    });
  }, []);

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
    const newPreviews = [...imagePreviews];
    newPreviews[index] = URL.createObjectURL(file);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("brand", brand);
      formData.append("stock", stock);
      images.forEach((image) => {
        if (image) formData.append("gallery", image);
      });
      console.log("Form Data:", formData);

      await addProduct(formData)
        .then((res) => {
          console.log("Response:", res);
          if (res?.ok) {
            toast.success(res.message);
          }
        })
        .catch((err) => {
          console.error("Error adding product:\n", err.message);
        });

      // // Reset form
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setBrand("");
      setStock("");
      setImages([null, null, null, null, null]);
      setImagePreviews([null, null, null, null, null]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const scrollImages = (direction) => {
    if (!imageRowRef.current) return;
    const scrollAmount = 120; // px
    if (direction === "left") {
      imageRowRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      imageRowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-500 hover:shadow-2xl animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
          Add New Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-200 hover:border-purple-300"
              placeholder="Enter product name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-200 hover:border-purple-300"
              placeholder="Enter product description"
              rows="4"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (₹)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-200 hover:border-purple-300"
              placeholder="Enter price"
              min="0"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-200 hover:border-purple-300"
              required
            >
              <option value="">Select category</option>
              {categoriesList.map((cat) => (
                <option key={cat._id} value={cat.name || cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand
            </label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-200 hover:border-purple-300"
              placeholder="Enter brand name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stock Quantity
            </label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-200 hover:border-purple-300"
              placeholder="Enter stock quantity"
              min="0"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images (Up to 5, one per box)
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => scrollImages("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-1 hover:bg-gray-100 focus:outline-none"
                style={{ display: "flex", alignItems: "center" }}
              >
                <FaChevronLeft />
              </button>
              <div
                ref={imageRowRef}
                className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {[0, 1, 2, 3, 4].map((idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center flex-shrink-0"
                  >
                    <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-300 hover:bg-gray-50 transition duration-200">
                      {imagePreviews[idx] ? (
                        <img
                          src={imagePreviews[idx]}
                          alt={`Preview ${idx + 1}`}
                          className="w-24 h-24 object-cover rounded-lg shadow-md"
                        />
                      ) : (
                        <>
                          <svg
                            className="w-8 h-8 mb-2 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                          <span className="text-xs text-gray-500">
                            Image {idx + 1}
                          </span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageChange(idx, e)}
                      />
                    </label>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => scrollImages("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-1 hover:bg-gray-100 focus:outline-none"
                style={{ display: "flex", alignItems: "center" }}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={
              loading ||
              !name ||
              !description ||
              !price ||
              !category ||
              !brand ||
              !stock ||
              images.filter(Boolean).length === 0
            }
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mr-2"></div>
                Adding...
              </div>
            ) : (
              "Add Product"
            )}
          </button>
        </form>
      </div>
      {/* Custom CSS for animations */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AddProduct;
