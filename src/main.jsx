import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import { FavoritesProvider } from "./context/FavoritesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SearchProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </SearchProvider>
  </BrowserRouter>
);


