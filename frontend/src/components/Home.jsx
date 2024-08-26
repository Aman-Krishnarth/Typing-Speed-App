import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("use effect mein hai home page ke");
    console.log(Boolean(localStorage.getItem("token")));
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar />

      <Outlet />
    </div>
  );
}

export default Home;
