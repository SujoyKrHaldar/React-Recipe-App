import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="container w-full h-auto">{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
