import randomParagraph from "random-paragraph";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { LoginContextProvider } from "./contexts/loginContext.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const changeStatus = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <LoginContextProvider value={{ isLoggedIn, changeStatus }}>
      <div className=" bg-zinc-700 min-h-lvh grid grid-rows-[auto_1fr_auto]">
        <Outlet />
      </div>
    </LoginContextProvider>
  );
}

export default App;
