import { useEffect, useState } from 'react'
import { fetchAllProducts, fetchProductByCategory } from '../services/productServices'
import { toast } from 'react-hot-toast'
import ProductCard from './ProductCard';
import { useDispatch } from 'react-redux';
import { getProducts } from '../store/slices/product.slice';

const RenderProducts = ({ selectedCategory }) => {


    const dispatch = useDispatch();

    // FIX: Products Not changing while changing the Category
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleFetchProducts = async () => {
            if (selectedCategory === 'All') {
                await fetchAllProducts().then(res => {
                    if (res?.ok) {
                        console.log(res)
                        dispatch(getProducts(res.products));
                        setProducts(res.products)
                    } else {
                        toast.error(res.message)
                    }
                }).finally(() => {
                    setLoading(false)
                })
            } else {
                await fetchProductByCategory().then(res => {
                    if (res?.ok) {
                        console.log(res)
                    }
                }).finally(() => {
                    setLoading(false)
                })
            }
        }

        handleFetchProducts();
    }, [selectedCategory]);

    return <>
        {
            loading ? <div>
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div> : 
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {
                    products?.map(product => {
                        return (
                            <ProductCard key={product._id} product={product} />
                        )
                    })
                }
            </div>
        }
    </>
}

export default RenderProducts
