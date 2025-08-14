import { useEffect } from 'react'
import HeroSection from './HeroSection'
import { loginWithToken } from '../services/authServices'
import { useSelector } from 'react-redux'

const Home = () => {
  

  return (
    <div className=''>
      <HeroSection />
    </div>
  )
}

export default Home
