import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserPlus } from "lucide-react";
import { toast } from "react-toastify";

function Create() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(username, email, password);

    toast.warn("Trying to create user", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    await axios
      .post("https://typing-speed-app-backend.onrender.com/user/createUser", {
        username,
        email,
        password,
      })
      .then((res) => {
        console.log("res mein hu");
        const { success, message } = res.data;
        console.log();

        if (success) {
          toast.success(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          toast.error(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          console.log("success ke else mein hu");
        }
      });

    setUsername("");
    setPassword("");
    setEmail("");
  }

  function goToLogin(e) {
    e.preventDefault();
    navigate("/");
  }

  return (
    <div className=" h-lvh flex flex-col">
      <h1
        className=" 
	font-bold text-3xl text-center py-6"
      >
        <UserPlus className="inline-block h-full w-[5%] mr-4" />

        <span className="text-zinc-400 inline-block text-3xl">Register</span>
      </h1>

      <form className=" w-3/4 m-auto items-stretch rounded-md flex flex-col p-4 gap-2">
        <div className="flex  justify-around items-center p-3 my-4 rounded-xl bg-[#313133]">
          <input
            type="text"
            id="username"
            placeholder="Tap to Add Username"
            className="outline-none bg-transparent text-white text-2xl text-center bg-blue-400 w-full h-full"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        <div className="flex  justify-around items-center p-3 my-4 rounded-xl bg-[#313133]">
          <input
            type="email"
            id="email"
            placeholder="Tap To Add Email"
            value={email}
            className="outline-none bg-transparent text-white text-2xl text-center bg-blue-400 w-full h-full"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="flex  justify-around items-center p-3 my-4 rounded-xl bg-[#313133]">
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            className="outline-none bg-transparent text-white text-2xl text-center bg-blue-400 w-full h-full"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <input
          type="submit"
          value="Create User"
          onClick={handleSubmit}
          className="bg-[#313133] text-[#b3abbf] m-auto
			p-4 rounded-xl hover:scale-110 duration-300 ease-in-out cursor-pointer text-3xl font-semibold hover:px-6 my-4
		  "
        />

        <input
          type="button"
          value="Already have an account? Login!"
          onClick={goToLogin}
          className="bg-[#313133] text-green-600 m-auto
			p-4 rounded-xl hover:scale-110 duration-300 ease-in-out cursor-pointer text-3xl font-semibold hover:px-6 my-4"
        />
      </form>
    </div>
  );
}

export default Create;
