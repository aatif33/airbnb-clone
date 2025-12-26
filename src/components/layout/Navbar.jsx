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
  const [openProfile, setOpenProfile] = useState(false);

  const { user, logout } = useAuth();
  const { resetSearch } = useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      {searchActive && (
        <div
          onClick={() => setSearchActive(false)}
          className="fixed inset-0 bg-black/30 z-40"
        />
      )}

      {/* TOP BAR */}
      <div className="flex items-center justify-between px-6 py-4 relative">
        {/* LOGO */}
        <button
          onClick={() => {
            resetSearch();
            navigate("/");
          }}
          className="text-2xl font-bold text-rose-500"
        >
          airbnb
        </button>

        {/* NAV LINKS */}
        <div className="flex gap-3 items-center text-sm font-medium">
          <Link to="/favorites">❤️ Favorites</Link>
          <Link to="/bookings">🧳 Trips</Link>
          <Link to="/experiences">🎟️ Experiences</Link>
          <Link to="/services">🛠️ Services</Link>

          {/* USER / LOGIN */}
          {user ? (
  <>
    {/* BACKDROP to close dropdown */}
    {openProfile && (
      <div
        onClick={() => setOpenProfile(false)}
        className="fixed inset-0 z-[90]"
      />
    )}

    <div className="relative">
      <button
        onClick={() => setOpenProfile((p) => !p)}
        className="flex items-center gap-2 border rounded-full px-4 py-2 hover:shadow z-[100]"
      >
        👤
        <span className="hidden md:block">
          {user.email.split("@")[0]}
        </span>
      </button>

      {/* DROPDOWN */}
      {openProfile && (
        <div
          className="
            fixed right-6 top-[72px]
            w-60 bg-white border rounded-2xl
            shadow-2xl z-[100]
            animate-slideUp
          "
        >
          <div className="px-4 py-3 text-sm text-gray-600 border-b">
            Signed in as
            <div className="font-medium text-gray-900 truncate">
              {user.email}
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              setOpenProfile(false);
            }}
            className="
              w-full text-left px-4 py-3
              text-sm font-medium text-red-600
              hover:bg-gray-100 rounded-b-2xl
            "
          >
            Logout
          </button>
        </div>
      )}
    </div>
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
      <div className={`${scrolled ? "hidden" : "block"}`}>
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
