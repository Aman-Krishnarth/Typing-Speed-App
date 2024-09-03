import React from "react";
import { Link } from "react-router-dom";

function NavbarButtons({ link }) {
  console.log(link);
  return (
    <Link
      to={link.to}
      className="text-2xl font-semibold h-full
      text-[tomato] py-2 px-4 rounded-md hover:scale-110 duration-300 "
    >
      {link.linkName}
    </Link>
  );
}

export default NavbarButtons;
