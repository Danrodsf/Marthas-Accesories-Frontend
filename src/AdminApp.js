import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Menu from "./Components/Menu/Menu";
import SignIn from "./Containers/Admin/SignIn/SignIn";
import Main from "./Containers/Admin/Main/Main";
import Clients from "./Containers/Admin/Clients/Clients";
import Orders from "./Containers/Admin/Orders/Orders";
import Products from "./Containers/Admin/Products/Products";
import Messages from "./Containers/Admin/Messages/Messages";
import ClientDetails from "./Containers/Admin/ClientDetails/ClientDetails";
import OrderDetails from "./Containers/Admin/OrderDetails/OrderDetails";
import ProductDetails from "./Containers/Admin/ProductDetails/ProductDetails";
import MessageDetails from "./Containers/Admin/MessageDetails/MessageDetails";
import AddClient from "./Containers/Admin/AddClient/AddClient";
import AddProduct from "./Containers/Admin/AddProduct/AddProduct";
import AddOrder from "./Containers/Admin/AddOrder/AddOrder";
import AddMessage from "./Containers/Admin/AddMessage/AddMessage";
import SearchBar from "./Components/SearchBar/SearchBar";
import "./App.scss";

const AdminApp = () => {
  const location = useLocation();
  return (
    <div className="adminApp">
      {location.pathname !== "/admin" && location.pathname !== "/admin/" ? (
        <Menu />
      ) : null}
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route exact path="/main" element={<Main />} />
        <Route exact path="/clients" element={<Clients />} />
        <Route exact path="/orders" element={<Orders />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/messages" element={<Messages />} />
        <Route exact path="/clientDetails" element={<ClientDetails />} />
        <Route exact path="/orderDetails" element={<OrderDetails />} />
        <Route exact path="/productDetails" element={<ProductDetails />} />
        <Route exact path="/messageDetails" element={<MessageDetails />} />
        <Route exact path="/addClient" element={<AddClient />} />
        <Route exact path="/addProduct" element={<AddProduct />} />
        <Route exact path="/addOrder" element={<AddOrder />} />
        <Route exact path="/addMessage" element={<AddMessage />} />
        <Route exact path="/searchBar" element={<SearchBar />} />
      </Routes>
    </div>
  );
};

export default AdminApp;
