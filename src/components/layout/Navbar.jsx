import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopTabs from "./TopTabs";
import SearchBar from "../search/SearchBar";
import LoginModal from "../auth/LoginModal";
import { useAuth } from "../../context/AuthContext";
import { useSearch } from "../../context/SearchContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const { user, logout } = useAuth();
  const { resetSearch } = useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white">
      {searchActive && (
        <div
          onClick={() => setSearchActive(false)}
          className="fixed inset-0 bg-black/30 z-40"
        />
      )}

      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={() => {
            resetSearch();      // 🔥 clears search
            navigate("/");     // 🔥 goes home
          }}
          className="text-2xl font-bold text-rose-500"
        >
          airbnb
        </button>

        <div className="flex gap-6 items-center">
          <Link to="/favorites">❤️ Favorites</Link>
          <Link to="/bookings">🧳 Trips</Link>

          {user ? (
            <>
              <span className="text-sm">{user.email}</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="bg-rose-500 text-white px-5 py-2 rounded-full"
            >
              Login
            </button>
          )}
        </div>
      </div>

      <div className={`${scrolled ? "hidden" : "block"}`}>
        <TopTabs />
      </div>

      <div className="flex justify-center pb-4">
        <SearchBar
          compact={scrolled}
          active={searchActive}          // ✅ BOOLEAN
          setActive={setSearchActive}
        />
      </div>

      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </header>
  );
}
