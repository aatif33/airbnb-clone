import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import { SearchProvider } from "./context/SearchContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
<AuthProvider>
  <BrowserRouter>
      <SearchProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </SearchProvider>
  </BrowserRouter>
</AuthProvider>
);
