import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./Containers/Admin/Admin";
import "./App.scss";

const AdminApp = (props) => {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Admin />} />
      </Routes>
    </div>
  );
};

export default AdminApp;
