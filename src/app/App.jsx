import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Chatbot from "../components/chatbot/Chatbot";
import Home from "../pages/Home";
import Experiences from "../pages/Experiences";
import Services from "../pages/Services";
import ListingDetails from "../pages/ListingDetails";
import Favorites from "../pages/Favorites";
import Bookings from "../pages/Bookings";
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
          <Route path="/favorites" element={<Favorites />} /> {/* ✅ FIX */}
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route path="/bookings" element={<Bookings />} />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>

      <Chatbot />
      <Footer />
    </>
  );
}
