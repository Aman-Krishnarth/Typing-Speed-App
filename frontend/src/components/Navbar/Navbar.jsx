import React, { useEffect, useState } from "react";
import NavbarButtons from "./NavbarButtons";
import axios from "axios";
import useLoginContext from "../../contexts/loginContext";
import { useNavigate } from "react-router-dom";

function Navbar() {

	const navigate = useNavigate();

  const [links, setLinks] = useState([
    {
      to: "/",
      linkName: "Test",
    },
    {
      to: "progress",
      linkName: "Progress",
    },
  ]);

  const { isLoggedIn } = useLoginContext();

  useEffect(() => {
    console.log(`login status = ${isLoggedIn}`);
  }, []);

  function handleLogout() {
    console.log("handle logout hai");
    localStorage.setItem("token", "");
	navigate("/")
  }

  return (
    <div className="bg-gray-400 w-[90%] m-auto flex justify-between p-2">
      <div className="bg-pink-600 flex justify-center items-center cursor-default">
        <p className="text-2xl font-black underline">Speed Testing</p>
      </div>
      <div className="bg-indigo-400 w-[30%] flex justify-around">
        {links.map((link, index) => {
          return <NavbarButtons link={link} key={index} />;
        })}

        <button className="bg-red-400 text-white" onClick={handleLogout}>
          logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
