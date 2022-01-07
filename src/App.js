import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeApp from "./HomeApp";
import AdminApp from "./AdminApp";
import "./App.scss";
import "./scss/main.scss";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<HomeApp />} />
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
