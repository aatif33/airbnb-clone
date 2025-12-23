import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Chatbot from "../components/chatbot/Chatbot";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Experiences from "../pages/Experiences";
import Services from "../pages/Services";
import ListingDetails from "../pages/ListingDetails";
import Favorites from "../pages/Favorites";
import NotFound from "../pages/NotFound";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/services" element={<Services />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Chatbot />
      <Footer />
    </div>
  );
}
