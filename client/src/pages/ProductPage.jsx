import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById, fetchRelatedProduct } from "../services/productServices";
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import Product from '../components/Product';
import { BreadcrumbNavigation } from '../components/BreadcrumbNavigation';

const ProductPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const productFromStore = useSelector((state) =>
        state.product?.find((product) => product._id === productId)
    );


    useEffect(() => {
        if (productFromStore) {
            console.log("Product Fetched From Store");
            setProduct(productFromStore);
            fetchRelatedProduct(productId).then(res => {
                if (res?.ok) {
                    setRelatedProducts(res.relatedProducts);
                }
            }).finally(() => {
                setLoading(false);
            });
        } else {
            setLoading(true);

            fetchProductById(productId)
                .then((res) => {
                    if (res?.ok) {
                        console.log("Product Fetched From API");
                        setProduct(res.product);

                        // Fetching Related Products
                        fetchRelatedProduct(productId).then(res => {
                            if (res?.ok) {
                                setRelatedProducts(res.relatedProducts);
                            }
                        }).finally(() => {
                            setLoading(false);
                        });
                    }
                })

        }
    }, [productFromStore, productId]);

    return <>
        {
            loading ?
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500" ></div>
                </div >
                :
                <>
                    <BreadcrumbNavigation product={product} />
                    <Product product={product} productId={productId} />

                    {
                        relatedProducts?.length ? <>
                            <h3 className="text-2xl font-semibold mb-4">Related Products</h3>
                            {
                                relatedProducts?.map(product => <ProductCard product={product} />)
                            }
                        </> : null
                    }
                </>
        }
    </>

}

export default ProductPage
