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
  const [openMenu, setOpenMenu] = useState(false); // 🔥 MOBILE MENU

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
      {/* 🔥 SEARCH BACKDROP */}
      {searchActive && (
        <div
          onClick={() => setSearchActive(false)}
          className="fixed inset-0 bg-black/30 z-40"
        />
      )}

      {/* 🔥 MOBILE MENU BACKDROP */}
      {openMenu && (
        <div
          onClick={() => setOpenMenu(false)}
          className="fixed inset-0 bg-black/40 z-50"
        />
      )}

      {/* 🔥 MOBILE SLIDE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50
        transform transition-transform duration-300
        ${openMenu ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 flex flex-col gap-5">

          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Menu</span>
            <button onClick={() => setOpenMenu(false)}>✕</button>
          </div>

          <Link to="/favorites" onClick={() => setOpenMenu(false)}>
            ❤️ Favorites
          </Link>

          <Link to="/bookings" onClick={() => setOpenMenu(false)}>
            🧳 Trips
          </Link>

          <Link to="/experience-bookings" onClick={() => setOpenMenu(false)}>
            🎟️ Experiences
          </Link>

          <Link to="/service-bookings" onClick={() => setOpenMenu(false)}>
            🛠️ Services
          </Link>

          <hr />

          {user ? (
            <>
              <div className="text-sm text-gray-600 truncate">
                {user.email}
              </div>

              <button
                onClick={() => {
                  logout();
                  setOpenMenu(false);
                }}
                className="text-left text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setShowLogin(true);
                setOpenMenu(false);
              }}
              className="bg-rose-500 text-white py-2 rounded-lg"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* 🔥 TOP BAR */}
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={() => {
            resetSearch();
            navigate("/");
          }}
          className="text-2xl font-bold text-rose-500"
        >
          airbnb
        </button>

        {/* 🔥 DESKTOP LINKS */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/favorites">❤️ Favorites</Link>
          <Link to="/bookings">🧳 Trips</Link>
          <Link to="/experience-bookings">🎟️ Experiences</Link>
          <Link to="/services">🛠️ Services</Link>

          {user ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="bg-rose-500 text-white px-5 py-2 rounded-full"
            >
              Login
            </button>
          )}
        </div>

        {/* 🔥 MOBILE HAMBURGER */}
        <button
          onClick={() =>{ setOpenMenu(true);
            setSearchActive(false);}
          }
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* 🔥 TABS */}
      <div className={`${scrolled ? "hidden" : "block"}`}>
        <TopTabs />
      </div>

      {/* 🔥 SEARCH */}
      <div className={`${openMenu ? "hidden" : "block"}`}>
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
