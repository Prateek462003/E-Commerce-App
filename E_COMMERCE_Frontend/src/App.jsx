import React from 'react'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import Product from './pages/Product'
import Register from "./pages/Register"
import Login from './pages/Login'
import Cart from "./pages/Cart"
import {
  BrowserRouter,
  Route,
  Redirect,
  Routes,
} from "react-router-dom";
const App = () => {
  const user = true;

  return(
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/products/:category" element={<ProductList/>} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App