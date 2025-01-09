import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Optional for icons
import Header from "./components/Header";
import Description from "./components/Description";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import Admin from "./components/Admin";
import AdminDash from "./components/AdminDash";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div className="content-container">
              <Description />
              <LoginPage />
            </div>
          }
        />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/AdminDash" element={<AdminDash />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
