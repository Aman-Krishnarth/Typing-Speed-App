import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className=" bg-[#323437] min-h-lvh grid grid-rows-[auto_1fr_auto]">
      <Outlet />
    </div>
  );
}

export default App;
