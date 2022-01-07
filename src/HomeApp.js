import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Card from "./Components/Card/Card";
import Home from "./Containers/Home/Home";
import UserHub from "./Containers/UserHub/UserHub";
import Profile from "./Containers/Profile/Profile";
import SignIn from "./Containers/SignIn/SignIn";
import SignUp from "./Containers/SignUp/SignUp";
import Contact from "./Containers/Contact/Contact";
import Messages from "./Containers/Messages/Messages";
import Products from "./Containers/Products/Products";
import Product from "./Containers/Product/Product";
import Wishlist from "./Containers/Wishlist/Wishlist";
import Cart from "./Containers/Cart/Cart";
import Orders from "./Containers/Orders/Orders";
import "./App.scss";
import "./scss/main.scss";

const HomeApp = (props) => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/userHub" element={<UserHub />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/card" element={<Card />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product" element={<Product />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default HomeApp;