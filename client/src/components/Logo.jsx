import React from 'react'
import { Link } from 'react-router-dom'

const Logo = ({className=""}) => {
  return (
    <div className={`${className} text-2xl font-extrabold text-indigo-600 hover:text-indigo-700 transition-colors duration-300`}>
      <Link to="/">StackKart</Link>
    </div>
  )
}

export default Logo
