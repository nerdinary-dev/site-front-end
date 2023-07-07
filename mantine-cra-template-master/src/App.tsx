import React, { useState } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { SignUp } from "./Pages/SignUp";
import { LogIn } from "./Pages/LogIn";
import { NothingFoundBackground } from "./Pages/NotFound";
import { useLocalStorage } from "@mantine/hooks";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home";
import ItemPage from "./Pages/Item";
import { HeaderMegaMenu } from "./Components/Header";
import { Profile } from "./Pages/Profile";
import CartPage from "./Pages/Cart";
import { FooterLinks } from "./Components/Footer";
import { ContactPage } from "./Pages/Contact";

// const items = [
//   { name: 'Item 1', price: 9.99, quantity: 1 },
//   { name: 'Item 2', price: 19.99, quantity: 2 },
// ];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage<Boolean>({
    key: "isLoggedIn",
    defaultValue: false,
  });

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeaderMegaMenu />
                <Home />
                <FooterLinks />
              </>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn onLogin={handleLogin} />} />
          <Route
            path="/cart"
            element={
              <>
                <HeaderMegaMenu />
                {/* {isLoggedIn ? <CartPage /> : <Navigate to={"/"} replace />} */}
                <CartPage />
                <FooterLinks />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <HeaderMegaMenu />
                {/* {isLoggedIn ? (
                  <Profile
                    name="John Doe"
                    email="john.doe@example.com"
                    bio="Hi, I'm John Doe. I'm a software developer from San Francisco."
                    avatarUrl="https://i.pravatar.cc/300"
                  />
                ) : (
                  <Navigate to={"/"} replace />
                )} */}
                <Profile
                    name="John Doe"
                    email="john.doe@example.com"
                    bio="Hi, I'm John Doe. I'm a software developer from San Francisco."
                    avatarUrl="https://i.pravatar.cc/300"
                  />
                <FooterLinks />
              </>
            }
          />
          <Route
            path="/:title/:id"
            element={
              <>
                <HeaderMegaMenu />
                <ItemPage />
                <FooterLinks />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <HeaderMegaMenu />
                <ContactPage />
                <FooterLinks />
              </>
            }
          />
          <Route
            path="*"
            element={
              <>
                <HeaderMegaMenu />
                <NothingFoundBackground />
                <FooterLinks />
              </>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
