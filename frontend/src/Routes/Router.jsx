import { Route, Routes } from "react-router-dom";
import Home from "../pages/home"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Service from "../pages/Service"
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import ProductDetails from "../pages/ProductDetails";
import FruitVe from "../components/FruitVe/FruitVe";


const Router = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/service' element={<Service />} />
        <Route path='/fruits' element={<FruitVe productCategoryNew="fruit"/>} />
        <Route path='/vegetabels' element={<FruitVe productCategoryNew="vegetable"/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/product/:id' element={<ProductDetails />} />
      </Routes>
    </div>
  )
}

export default Router
