import HomeLayout from '../layouts/HomeLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import Product from '../pages/Product'
import Cart from '../pages/Cart'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { loginWithToken } from '../services/authServices'
import { login } from '../store/slices/auth.slice'
import { getCartItems } from '../store/slices/cart.slice'
import { FourSquare } from 'react-loading-indicators'
import Profile from '../pages/Profile'
import AdminDashboard from '../pages/admin/AdminDashboard'
import ProductList from '../pages/admin/ProductList'
import OrderList from '../pages/admin/OrderList'
import EditProduct from '../pages/admin/EditProduct'
import UserList from '../pages/admin/UserList'
// import UserList from '../pages/admin/UserList'

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user.status) loginWithToken().then(res => {
      setLoading(true);
      console.log(res);
      if (res?.ok) {
        dispatch(login(res.user));
        dispatch(getCartItems(res.user.cart))
      }
    }).catch(err => console.log(err)).finally(() => setLoading(false));
  }, [user.status, dispatch])

  return <>
    {
      loading ? <div className='flex h-screen items-center justify-center'>
        <FourSquare color="#3c31cc" size="medium" text="" textColor="" className="" />
      </div> :
        <div id='wrapper'>
          <Toaster />
          <Routes>
            <Route path="/" element={<HomeLayout />}>
              <Route path="" element={<Home />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<ProductList />} />
              <Route path="/admin/products/:productId/edit" element={<EditProduct />} />
              <Route path="/admin/orders" element={<OrderList />} />
              <Route path="/admin/users" element={<UserList />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
    }
  </>
}

export default App
