import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  // Load favorites when user changes
  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }

    const stored =
      JSON.parse(localStorage.getItem(`favorites_${user.uid}`)) || [];

    setFavorites(stored);
  }, [user]);

  // Save favorites per user
  useEffect(() => {
    if (user) {
      localStorage.setItem(
        `favorites_${user.uid}`,
        JSON.stringify(favorites)
      );
    }
  }, [favorites, user]);

  const toggleFavorite = (id) => {
    if (!user) {
      alert("Please login to save favorites");
      return;
    }

    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((fid) => fid !== id)
        : [...prev, id]
    );
  };

  const isFavorite = (id) => favorites.includes(id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }
  return ctx;
};
