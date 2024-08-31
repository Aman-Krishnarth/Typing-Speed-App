import React, { useEffect, useState } from "react";
import NavbarButtons from "./NavbarButtons";
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

  function handleLogout() {
    console.log("handle logout hai");
    localStorage.setItem("token", "");
    navigate("/");
  }

  return (
    <div className="bg-gray-400 m-auto flex justify-between p-2">
      <div className="bg-pink-600 flex justify-center items-center cursor-default">
        <p className="text-2xl font-black underline">Speed Testing</p>
      </div>
      <div className="w-1/3 flex justify-around gap-3 ">
        {links.map((link, index) => {
          return <NavbarButtons link={link} key={index} />;
        })}

        <div className="bg-red-400 py-2 px-4 rounded-md hover:scale-110 duration-300 ">
          <button
            className="text-xl font-semibold h-full w-full"
            onClick={handleLogout}
          >
            logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
