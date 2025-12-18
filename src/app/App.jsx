import { Routes, Route } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Home from "../pages/Home";
import ListingDetails from "../pages/ListingDetails";
import Chatbot from "../components/chatbot/Chatbot";
import Login from "../pages/Login";
export default function App() {
  return (
    <>
      <Navbar />
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/listing/:id" element={<ListingDetails />} />
  <Route path="/login" element={<Login />} />
</Routes>
      <Chatbot />
    </>
  );
}

