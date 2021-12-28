import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Home from "./Containers/Home/Home";
import Login from "./Containers/Login/Login";
import Register from "./Containers/Register/Register";
import Profile from "./Containers/Profile/Profile";
import "./App.scss";
import "./scss/main.scss";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signIn" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signUp" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
