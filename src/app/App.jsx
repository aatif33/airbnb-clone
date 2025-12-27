
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "../components/common/ScrollToTop";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Chatbot from "../components/chatbot/Chatbot";
import ProtectedRoute from "../components/common/ProtectedRoute";
import BookingReceipt from "../pages/BookingReceipt";
// Core pages
import Home from "../pages/Home";
import Experiences from "../pages/Experiences";
import ExperienceDetails from "../pages/ExperienceDetails";
import ExperienceBookings from "../pages/ExperienceBookings";
import ExperienceReceipt from "../pages/ExperienceReceipt";
import Services from "../pages/Services";
import ServiceDetails from "../pages/ServiceDetails";
import ServiceBookings from "../pages/ServiceBookings";
import ListingDetails from "../pages/ListingDetails";
import Favorites from "../pages/Favorites";
import Bookings from "../pages/Bookings";
import AdminExperience from "../pages/AdminExperience";
import NotFound from "../pages/NotFound";

// Support
import HelpCenter from "../pages/support/HelpCenter";
import Safety from "../pages/support/Safety";
import Cancellation from "../pages/support/Cancellation";
import Neighborhood from "../pages/support/Neighborhood";

// Hosting
import HostHome from "../pages/hosting/HostHome";
import HostExperience from "../pages/hosting/HostExperience";
import HostService from "../pages/hosting/HostService";
import Resources from "../pages/hosting/Resources";
import Community from "../pages/hosting/community";
import CoHost from "../pages/hosting/CoHost";
import ReferHost from "../pages/hosting/ReferHost";

// Company
import Newsroom from "../pages/company/Newsroom";
import Careers from "../pages/company/Careers";
import Investors from "../pages/company/Investors";
import AirbnbOrg from "../pages/company/AirbnbOrg";

// Policies
import AirCover from "../pages/policies/AirCover";
import AntiDiscrimination from "../pages/policies/AntiDiscrimination";

export default function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          {/* Core */}
          <Route path="/" element={<Home />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/experience/:id" element={<ExperienceDetails />} />
          <Route path="/experience-bookings" element={<ExperienceBookings />} />
          <Route path="/experience-receipt/:id" element={<ExperienceReceipt />} />

          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/service-bookings" element={<ServiceBookings />} />

          <Route path="/listing/:id" element={<ListingDetails />} />

          {/* Protected */}
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />

          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            }
          />
         <Route path="/booking-receipt/:id" element={<BookingReceipt />} />
          {/* Admin */}
          <Route path="/admin/experiences" element={<AdminExperience />} />

          {/* Support */}
          <Route path="/support/help" element={<HelpCenter />} />
          <Route path="/support/safety" element={<Safety />} />
          <Route path="/support/cancellation" element={<Cancellation />} />
          <Route path="/support/neighbourhood" element={<Neighborhood />} />

          {/* Hosting */}
          <Route path="/host/home" element={<HostHome />} />
          <Route path="/host/experience" element={<HostExperience />} />
          <Route path="/host/service" element={<HostService />} />
          <Route path="/host/resources" element={<Resources />} />
          <Route path="/host/community" element={<Community />} />
          <Route path="/host/co-host" element={<CoHost />} />
          <Route path="/host/refer" element={<ReferHost />} />

          {/* Company */}
          <Route path="/company/newsroom" element={<Newsroom />} />
          <Route path="/company/careers" element={<Careers />} />
          <Route path="/company/investors" element={<Investors />} />
          <Route path="/company/airbnb-org" element={<AirbnbOrg />} />

          {/* Policies */}
          <Route path="/policies/aircover" element={<AirCover />} />
          <Route
            path="/policies/anti-discrimination"
            element={<AntiDiscrimination />}
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>

      <Chatbot />
      <Footer />
    </>
  );
}
