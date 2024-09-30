import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {Navigate, Route, Routes } from "react-router-dom";

import Navbars from "./components/Navbars";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Pizza from "./pages/Pizza";
import Cart from "./pages/Cart";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import { useContext } from "react";
import { CartContext } from "./context/CartContext";

function App() {
  const {token} = useContext(CartContext);
  return (
    <>
      <Navbars />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={token ? <Navigate to="/" /> : <RegisterPage />} />
        <Route path="/login" element={token ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<Pizza />} />
        <Route path="profile" element={token ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/404" element={<NotFound />} /> 
        <Route path="*" element={<NotFound />} /> 
      </Routes>

      <Footer />
    </>
  );
}

export default App;
