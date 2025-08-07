import React from 'react'
import Navbar from '../components/Navbar'
import Container from '../components/Container'
import Footer from '../components/Footer'

const HomeLayout = () => {
  return (
    <>
        <Navbar />
        <Container>
            <Outlet />
        </Container>
        <Footer />
    </>
  )
}

export default HomeLayout
