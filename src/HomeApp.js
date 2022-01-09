import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Card from "./Components/Card/Card";
import Home from "./Containers/Main/Home/Home";
import UserHub from "./Containers/Main/UserHub/UserHub";
import Profile from "./Containers/Main/Profile/Profile";
import SignIn from "./Containers/Main/SignIn/SignIn";
import SignUp from "./Containers/Main/SignUp/SignUp";
import Contact from "./Containers/Main/Contact/Contact";
import Messages from "./Containers/Main/Messages/Messages";
import Products from "./Containers/Main/Products/Products";
import ProductDetail from "./Containers/Main/ProductDetail/ProductDetail";
import Wishlist from "./Containers/Main/Wishlist/Wishlist";
import Cart from "./Containers/Main/Cart/Cart";
import Orders from "./Containers/Main/Orders/Orders";
import "./App.scss";
import "./scss/main.scss";

const HomeApp = () => {
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
        <Route path="/productDetail" element={<ProductDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default HomeApp;
