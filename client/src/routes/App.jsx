import HomeLayout from '../layouts/HomeLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Toaster} from "react-hot-toast";
import Product from '../pages/Product'

const App = () => {
  return (
    <div id='wrapper' className=''>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route path="" element={<Home />} />
          <Route path="/product/:productId" element={<Product />} />
        </Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
