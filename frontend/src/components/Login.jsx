import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LogIn } from "lucide-react";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleCreateUser(e) {
    e.preventDefault();
    navigate("/create");
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  }, []);

  async function handleFormSubmit(e) {
    e.preventDefault();
    console.log(email, password);

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
        console.log("LOGIN KE POST KA RES");
        console.log(res);

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
        console.log("LOGIN KE POST KA ERROR");
      });

    setEmail("");
    setPassword("");
  }

  return (
    <div className=" h-lvh flex flex-col ">
      <h1 className="font-bold text-3xl text-center pt-10 flex justify-center items-center ">
        <LogIn className="inline-block mr-4  h-full w-[15%] sm:w-[10%] md:w-[7%] xl:w-[5%] text-white" />

        <span className="text-white inline-block text-5xl">Login</span>
      </h1>
      <form
        onSubmit={handleFormSubmit}
        className="w-3/4 m-auto items-stretch rounded-md flex flex-col p-4 gap-2"
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
  );
}

export default Login;
