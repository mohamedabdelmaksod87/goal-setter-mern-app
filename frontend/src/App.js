import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import Header from "./components/header";
import NotFound from "./pages/notFound";
import authService from "./services";
import { Slide, ToastContainer } from "react-toastify";

export default function App() {
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.user) : ""
  );

  const onLogout = () => {
    setUser("");
    authService.logout();
  };

  return (
    <div className="container">
      <Header user={user} onLogout={onLogout} />
      <Routes>
        <Route path="/" element={<Dashboard user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        transition={Slide}
        theme="colored"
        position="top-center"
      />
    </div>
  );
}
