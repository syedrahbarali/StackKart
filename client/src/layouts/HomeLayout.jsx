import React from 'react'
import Navbar from '../components/Navbar'
import Container from '../components/Container'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <>
        <Navbar />
        <Container className='h-full mt-[74px]'>
            <Outlet />
        </Container>
        <Footer />
    </>
  )
}

export default HomeLayout
