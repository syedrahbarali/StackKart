import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, ShoppingBag, Heart, Settings } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllOrders } from "../services/orderServices";
import Loading from "../components/Loading";
import toast from "react-hot-toast";
import Logout from "../components/Logout";

export default function Dashboard() {
    const user = useSelector(state => state.auth.user);
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getAllOrders().then(res => {
            console.log(res)
            setOrders(res.orders)
        })
            .catch(err => toast.error(err.message))
            .finally(() => setLoading(false));
    }, []);

    return <>
        {
            loading ? <Loading /> : <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Section */}
                <Card className="col-span-1 shadow-lg rounded-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl font-bold">
                            <User className="w-6 h-6 text-blue-600" />
                            My Profile
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center text-center">
                            <img
                                src={user?.avatar || "https://via.placeholder.com/100"}
                                alt="profile"
                                className="w-24 h-24 rounded-full border border-black mb-4"
                            />
                            <h2 className="text-lg font-semibold">{user?.name}</h2>
                            <p className="text-gray-500">{user?.email}</p>
                            <p className="text-sm text-gray-400 mt-1">
                                Joined: {new Date(user?.timestamp).toLocaleDateString()}
                            </p>
                            <Button className="mt-4 w-full">Edit Profile</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Orders Section */}
                <Card className="col-span-2 shadow-lg rounded-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl font-bold">
                            <ShoppingBag className="w-6 h-6 text-green-600" />
                            My Orders
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {orders?.length > 0 ? (
                            <div className="space-y-6">
                                {orders.map((order) => (
                                    <div
                                        key={order._id}
                                        className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                                    >
                                        {/* Order header */}
                                        <div className="flex justify-between items-center border-b pb-2 mb-3">
                                            <div>
                                                <p className="font-semibold">Order #{order._id}</p>
                                                <p className="text-sm text-gray-500">
                                                    {order.products?.length} items • ₹{order?.totalAmount}
                                                </p>
                                            </div>
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs ${order.deliveryStatus === "Delivered"
                                                        ? "bg-green-100 text-green-600"
                                                        : order.paymentStatus === "pending"
                                                            ? "bg-yellow-100 text-yellow-600"
                                                            : "bg-green-100 text-green-600"
                                                    }`}
                                            >
                                                {order.paymentStatus}
                                            </span>
                                        </div>

                                        {/* Product Thumbnails */}
                                        <div className="flex gap-3 overflow-x-auto pb-2">
                                            {order.items?.map(({productId}) => (
                                                <div
                                                    key={productId._id}
                                                    className="flex flex-col items-center text-center border rounded-lg p-2 min-w-[100px]"
                                                >
                                                    <img
                                                        src={productId.images[0].path || "https://via.placeholder.com/80"}
                                                        alt={productId.name}
                                                        className="w-16 h-16 object-cover rounded-md mb-2"
                                                    />
                                                    <p className="text-sm font-medium truncate w-20">{productId.name}</p>
                                                    <p className="text-xs text-gray-500">x{productId.quantity}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                <Link
                                    to="/orders"
                                    className="text-blue-600 text-sm hover:underline block text-right"
                                >
                                    View All Orders →
                                </Link>
                            </div>
                        ) : (
                            <p className="text-gray-500">No orders yet.</p>
                        )}
                    </CardContent>

                </Card>

                {/* Wishlist Section */}
                <Card className="col-span-1 shadow-lg rounded-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl font-bold">
                            <Heart className="w-6 h-6 text-pink-600" />
                            Wishlist
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-500">You have {user?.wishlist?.length || 0} items saved.</p>
                        <Button asChild className="mt-3 w-full">
                            <Link to="/wishlist">View Wishlist</Link>
                        </Button>
                    </CardContent>
                </Card>

                {/* Settings Section */}
                <Card className="col-span-2 shadow-lg rounded-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl font-bold">
                            <Settings className="w-6 h-6 text-gray-600" />
                            Account Settings
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Button variant="outline" className="w-full">Change Password</Button>
                        <Logout />
                    </CardContent>
                </Card>
            </div>
        }
    </>
}
