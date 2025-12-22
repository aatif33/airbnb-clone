import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Services from "../pages/Services";
import Navbar from "../components/layout/Navbar";
import Home from "../pages/Home";
import Experiences from "../pages/Experiences";
import ListingDetails from "../pages/ListingDetails";
import NotFound from "../pages/NotFound";
import Footer from "../components/layout/Footer";
import Chatbot from "../components/chatbot/Chatbot";

export default function App() {
  const [searchActive, setSearchActive] = useState(false);

  return (
    <>
      <Navbar
        searchActive={searchActive}
        setSearchActive={setSearchActive}
      />

      {/* BLUR CONTENT WHEN SEARCH ACTIVE */}
       <div className={searchActive ? "blur-sm transition-all" : "transition-all"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/services" element={<Services />} />
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Chatbot />
        <Footer />
      </div>

      {/* CLICK-TO-CLOSE OVERLAY */}
      {searchActive && (
        <div
          onClick={() => setSearchActive(false)}
          className="fixed inset-0 z-40"
        />
      )}
    </>
  );
}
