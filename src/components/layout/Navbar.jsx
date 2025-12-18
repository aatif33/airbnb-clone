import SearchBar from "../search/SearchBar";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-rose-500">airbnb</h1>

        <SearchBar />

        <button className="bg-rose-500 text-white px-4 py-2 rounded-full">
          Login
        </button>
      </div>
    </header>
  );
}
