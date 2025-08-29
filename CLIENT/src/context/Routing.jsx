import { Routes, Route, Navigate } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import TodoPage from "../pages/Todos";
import { useEffect, useState } from "react";

const Routing = () => {

  // basically problem ye hai ki user logged in hai aur uska cookies bhi save hai magar problem ye hai ki jab ham refresh kar rahe hai to qki react ki state memory me rehta hai to uska value phir se false ho jaraha hai isliye baar baar login karna par raha hai isliye ham uske value ko localStorage me save kar dege , taki refresh par bhi mera data persist kare

  // const [isAuthenticated, setIsAuthenticated] = useState(false); // wrong

  //  Ye ek state banayi hai "isAuthenticated"
  // iska kaam hai check karna ki user logged in hai ya nahi
  // initial value hum localStorage se read kar rahe hain
  // agar localStorage me "isAuthenticated" ki value "true" hai to state bhi true hogi
  // warna false hogi

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") === "true"
  );

  // Ye ek effect hai jo "isAuthenticated" state par dependent hai
  useEffect(() => {
    // agar user authenticated hai (state true hai)
    if (isAuthenticated) {
      // to localStorage me "isAuthenticated" ko "true" set kar do
      localStorage.setItem("isAuthenticated", "true");
    } else {
      // warna agar logout kar diya ya state false hai
      // to localStorage se "isAuthenticated" key hata do
      localStorage.removeItem("isAuthenticated");
    }
  }, [isAuthenticated]);
  // Yaha dependency array me isAuthenticated diya hai
  // iska matlab hai jab bhi isAuthenticated change hoga tab ye effect run karega

  return (
    <>
      <Routes>
        {/* By default jab koi root "/" pe aayega to use login page pe redirect kar dena */}
        <Route
          path="/"
          element={isAuthenticated ? <TodoPage /> : <Navigate to="/login" />}
        />
        {/* Public Routes (jinhe access karne ke liye login zaroori nahi hai) */}
        {/* Register page */}
        <Route path="/register" element={<Register />} />
        {/* Login page */}
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        {/* Private Route (sirf tabhi access hoga jab user login hai) */}
        <Route
          path="/todos"
          // agar user authenticated hai to Todos page dikhao
          // warna use login page pe redirect kar do
          element={
            isAuthenticated ? (
              <TodoPage setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </>
  );
};

export default Routing;
