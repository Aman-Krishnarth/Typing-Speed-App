import React from "react";
import { Link } from "react-router-dom";

function NavbarButtons({ link }) {
  console.log(link);
  return (
    <div className="bg-red-400 py-2 px-4 rounded-md hover:scale-110 duration-300 ">
      <Link to={link.to} className="text-xl font-semibold h-full w-full">{link.linkName}</Link>
    </div>
  );
}

export default NavbarButtons;
