// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { LoadingProvider, useLoading } from "./context/LoadingContext";
import { LoadingSpinner } from "./components/ui/LoadingSpinner";
import HomeLayout from "./components/home/HomeLayout";
import ShopLayout from "./components/shop/ShopLayout";
import "./App.css";

const AppContent = () => {
  const { isLoading } = useLoading();

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeLayout />} />
          <Route path="/shop" element={<ShopLayout />} />
          {/* Add more routes as needed */}
        </Routes>
        <Footer />
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <LoadingProvider>
        <AppContent />
      </LoadingProvider>
    </Router>
  );
}

export default App;
