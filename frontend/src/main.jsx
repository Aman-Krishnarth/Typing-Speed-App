import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TypingTest from "./components/TypingTest.jsx";
import Login from "./components/Login.jsx";
import Create from "./components/Create.jsx";
import Progress from "./components/Progress.jsx";
import Home from "./components/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
		{
			path: "",
			element: <Login/>
		},
		{
			path: "/home",
			element: <Home/>,
			children: [
				{
					path: "",
					element: <TypingTest/>
				},
				{
					path: "progress",
					element: <Progress/>
				}
			]
		},
		{
			path: "/create",
			element: <Create/>
		}
	]
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
