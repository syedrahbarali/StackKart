import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../../services/productServices';
import { updateProducts } from '../../services/adminService';
import toast from 'react-hot-toast';

const EditProduct = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [originalProduct, setOriginalProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]); // all images (old + new)
    const [newImages, setNewImages] = useState([]); // only new files
    const fileInputRef = useRef();

    useEffect(() => {
        fetchProductById(productId).then(res => {
            if (res?.product) {
                console.log('Fetched product:', res.product);
                setProduct(res.product);
                setOriginalProduct(res.product);
                setImages(res.product.images || []);
            }
            setLoading(false);
        });
    }, [productId]);

    // Delete image handler
    const handleDeleteImage = (idx) => {
        setImages(prev => prev.filter((_, i) => i !== idx));
        // TODO: Call backend API to delete image from server
    };

    // Add image handler
    const handleAddImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImages(prev => [...prev, { path: URL.createObjectURL(file) }]); // for preview
        setNewImages(prev => [...prev, file]); // only new files
        e.target.value = '';
    };

    const handleChange = e => {
        setProduct(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!originalProduct) return;

        const formData = new FormData();
        // Only append changed fields
        ["name", "brand", "category", "price", "stock", "description"].forEach(field => {
            if (product[field] !== originalProduct[field]) {
                formData.append(field, product[field]);
            }
        });
        formData.append('_id', productId);

        // Only append new images
        newImages.forEach(file => {
            formData.append('gallery', file);
        });

        await updateProducts(formData).then(res => {
            if(res?.ok) {
                toast.success(res.message)
            } else {
                toast.error(res.message || 'Failed to update product');
            }
        })
    };

    if (loading) return <div className="text-center text-lg mt-10">Loading...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-8">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
                <h1 className="text-2xl font-bold text-indigo-800 mb-6">Edit Product</h1>

                {/* Product Images */}

                {/* Product Images with Add/Delete */}
                <div className="flex gap-2 mb-6 overflow-x-auto items-center">
                    {images.map((img, idx) => (
                        <div key={idx} className="relative group">
                            <img
                                src={img.path}
                                alt={`Product ${idx + 1}`}
                                className="w-24 h-24 object-cover rounded border border-gray-200 shadow"
                            />
                            <button
                                type="button"
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center opacity-80 hover:opacity-100 transition-all group-hover:scale-110"
                                onClick={() => handleDeleteImage(idx)}
                                title="Delete image"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2m2 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7h12z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 11v6m4-6v6" />
                                </svg>
                            </button>
                        </div>
                    ))}
                    
                    {images.length < 5 && (
                        <button
                            type="button"
                            className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-indigo-300 rounded text-indigo-400 hover:bg-indigo-50 transition-all"
                            onClick={() => fileInputRef.current.click()}
                            title="Add image"
                        >
                            <span className="text-3xl">+</span>
                            <span className="text-xs mt-1">Add Image</span>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleAddImage}
                            />
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Name</label>
                        <input name="name" value={product.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Brand</label>
                        <input name="brand" value={product.brand} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Category</label>
                        <input name="category" value={product.category} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Price</label>
                        <input name="price" type="number" value={product.price} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Stock</label>
                        <input name="stock" type="number" value={product.stock} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Description</label>
                        <textarea name="description" value={product.description} onChange={handleChange} className="w-full border rounded px-3 py-2" rows={3} />
                    </div>
                    <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition-all font-semibold">Update Product</button>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
