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
    localStorage.setItem("token", "");
    navigate("/");
  }

  return (
    <div className=" m-auto flex justify-between sm:justify-around p-2">
      <div className="flex justify-center items-center cursor-default">
        <p className="text-4xl font-black underline text-[#00BFFF]">
          Speed Testing
        </p>
      </div>
      <div className="w-1/3 flex justify-around gap-3 ">
        {links.map((link, index) => {
          return <NavbarButtons link={link} key={index} />;
        })}

        <div className="text-[tomato] py-2 px-4 rounded-md hover:scale-110 duration-300 ">
          <button
            className="text-2xl font-semibold h-full w-full"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
