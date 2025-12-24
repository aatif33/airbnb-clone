import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TopTabs from "./TopTabs";
import SearchBar from "../search/SearchBar";
import LoginModal from "../auth/LoginModal";
import { useAuth } from "../../context/AuthContext";
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const { user, logout } = useAuth();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white transition-all duration-300">
      {searchActive && (
        <div
          onClick={() => setSearchActive(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        />
      )}

      {/* TOP ROW */}
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-rose-500">
          airbnb
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/favorites" className="text-sm font-medium">
            ❤️ Favorites
          </Link>

          <Link to="/bookings" className="text-sm font-medium">
            🧳 Trips
          </Link>

          {user ? (
          <>
          <span classname="text-sm">Hi,{user.email}</span>
        {user && (
          <button onClick={async()=>{
            await logout();
          }
          }>
            Logout
          </button>
        )}

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

      {/* TOP TABS */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          scrolled ? "max-h-0 opacity-0" : "max-h-20 opacity-100"
        }`}
      >
        <TopTabs />
      </div>

      {/* SEARCH BAR */}
      <div className="flex justify-center pb-4">
        <SearchBar
          compact={scrolled}
          active={searchActive}
          setActive={setSearchActive}
        />
      </div>

      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </header>
  );
}
