import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Service from "../pages/Service"
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import ProductDetails from "../pages/ProductDetails";
import FruitVe from "../components/FruitVe/FruitVe";
import MyCart from "../pages/MyCart";
import Payment from "../pages/Payment";
import MyOrders from "../pages/MyOrders";
import AddProduct from "../pages/AddProduct";
import PageNotFound from "../pages/PageNotFound";

const Router = () => {

  return (
    <div>
      <Routes>
        <Route path='/admin-add-product' element={<AddProduct />} />
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/service' element={<Service />} />
        <Route path='/all' element={<FruitVe productCategoryNew=""/>} />
        <Route path='/fruits' element={<FruitVe productCategoryNew="fruit"/>} />
        <Route path='/vegetabels' element={<FruitVe productCategoryNew="vegetable"/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/mycart' element={<MyCart />} />
        <Route path='/orders' element={<MyOrders />} />
        {/* <Route path='/orders' element={<ReviewForm />} /> */}
        {/* <Route path='/payment' element={<Payment />} /> */}
        <Route path='/Successfulpayment' element={<Payment isPaymentSuccessful={true} />} />
        <Route path='/Cancelpayment' element={<Payment isPaymentSuccessful={false} />} />
        <Route path='/*' element={<PageNotFound/>} />
      </Routes>
    </div>
  )
}

export default Router
