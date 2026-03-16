import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google"; // <--- 1. Import mới

export const Context = createContext({ isAuthorized: false });

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser }}>
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 2. Bọc Provider và điền Client ID */}
    <GoogleOAuthProvider clientId="606925811499-o8pqqonl1t2hksudphkavlugokvqoan1.apps.googleusercontent.com">
      <AppWrapper />
    </GoogleOAuthProvider>
  </React.StrictMode>
);