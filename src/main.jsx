import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";

import { SearchProvider } from "./context/SearchContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { AuthProvider } from "./context/AuthContext";

// 🔥 REQUIRED STYLES
import "react-date-range/dist/styles.css"; // main style
import "react-date-range/dist/theme/default.css"; // theme
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <SearchProvider>
          <FavoritesProvider>
            <App />
          </FavoritesProvider>
        </SearchProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
