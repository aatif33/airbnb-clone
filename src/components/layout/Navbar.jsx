import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TopTabs from "./TopTabs";
import SearchBar from "../search/SearchBar";

export default function Navbar({searchActive,setSearchActive}) {
  const [scrolled, setScrolled] = useState(false);

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
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-all"
    />
  )}

      
      {/* TOP ROW */}
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-rose-500">
          airbnb
        </Link>

        <button className="bg-rose-500 text-white px-5 py-2 rounded-full">
          Login
        </button>
      </div>

      {/* TOP TABS (hide on scroll) */}
      <div
        className={`
          transition-all duration-300 ease-in-out overflow-hidden
          ${scrolled ? "max-h-0 opacity-0 -translate-y-4" : "max-h-20 opacity-100"}
        `}
      >
        <TopTabs />
      </div>

      {/* SEARCH BAR (shrink + pill) */}
      <div className="flex justify-center pb-4">
        <SearchBar
          compact={scrolled}
          active={searchActive}
          setActive={setSearchActive}
        />

      </div>
    </header>
  );
}
