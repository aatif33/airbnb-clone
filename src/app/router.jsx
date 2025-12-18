import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ListingDetails from "../pages/ListingDetails";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/listing/:id" element={<ListingDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
