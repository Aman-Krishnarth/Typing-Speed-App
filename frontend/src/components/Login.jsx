import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LogIn } from "lucide-react";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showLoading, setShowLoading] = useState(true);

  function handleCreateUser(e) {
    e.preventDefault();
    navigate("/create");
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  }, []);

  useEffect(() => {
    async function runBackend() {
      await axios
        .get("https://typing-speed-app-backend.onrender.com/")
        .then((res) => {
          setShowLoading(false)
        })
        .catch((err) => {
          console.log("LOGIN GET ERROR");
        });
    }
    runBackend();
  }, []);

  async function handleFormSubmit(e) {
    e.preventDefault();

    toast.warn("Trying to login user", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    await axios
      .post("https://typing-speed-app-backend.onrender.com/user/loginUser", {
        email,
        password,
      })
      .then((res) => {
        const { success, message, token } = res.data;

        if (success) {
          toast.success(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          localStorage.setItem("token", token);

          setTimeout(() => {
            navigate("/home");
          }, 1000);
        } else {
          toast.error(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      })
      .catch((err) => {
        console.log("LOGIN POST ERROR");
      });

    setEmail("");
    setPassword("");
  }

  return (
    <>
      {showLoading ? (
        <div className="flex flex-col h-screen w-screen items-center justify-center">
          <button
            type="button"
            className="flex items-center rounded-lg bg-green-700 px-4 py-2 text-white"
            disabled
          >
            <svg
              className="mr-3 h-7 w-7 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="font-medium text-3xl"> Loading... </span>
            </button>
            <p className="text-[red] text-center text-xl">Hang tight! This might take 10-15 seconds to load. Your patience is appreciated!</p>
        </div>
      ) : (
        <div className=" h-lvh flex flex-col ">
          <form
            onSubmit={handleFormSubmit}
            className="w-3/4 min-h-3/4 m-auto items-stretch rounded-md flex flex-col p-4 gap-2 "
          >
            <div className="flex  justify-around items-center p-3 my-4 rounded-xl bg-[#121315]">
              <input
                type="text"
                placeholder="Tap to Add Email"
                className="outline-none bg-transparent text-white text-2xl text-center bg-blue-400 w-full h-full text-wrap"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="flex  justify-around items-center p-3 my-4 rounded-xl bg-[#121315]">
              <input
                type="password"
                placeholder="Password"
                className="outline-none bg-transparent text-white text-2xl text-center bg-blue-400 w-full h-full"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <input
              type="submit"
              value="Login"
              className="bg-[#121315] m-auto
			p-4 rounded-xl hover:scale-110 duration-300 ease-in-out cursor-pointer text-3xl font-semibold hover:px-6 my-4 text-white hover:text-green-500"
            />

            <input
              type="button"
              value="Not a user? Register Now!"
              className=" text-white mx-auto my-7
			p-4 rounded-xl hover:scale-110 duration-300 ease-in-out cursor-pointer text-3xl font-semibold hover:px-6 bg-[#121315] text-wrap hover:text-green-500"
              onClick={handleCreateUser}
            />
          </form>
        </div>
      )}
    </>
  );
}

export default Login;
