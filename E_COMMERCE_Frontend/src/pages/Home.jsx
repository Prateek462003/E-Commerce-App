import React from 'react'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import Category from '../components/Category'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
const Home = () => {
  return (
    <div>
        <Navbar/>
        <Slider/>
        <Category/>
        <Products/>        
        <Newsletter/>
    </div>
  )
}

export default Home