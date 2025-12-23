import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Chatbot from "../components/chatbot/Chatbot";

import Home from "../pages/Home";
import Experiences from "../pages/Experiences";
import Services from "../pages/Services";
import ListingDetails from "../pages/ListingDetails";
import NotFound from "../pages/NotFound";

export default function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/services" element={<Services />} />
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>

      <Chatbot />
      <Footer />
    </>
  );
}
