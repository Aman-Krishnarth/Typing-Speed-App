import React, { useEffect, useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function Progress() {
  const [progressData, setProgressData] = useState([]);

 console.log("wpm = ", localStorage.getItem("wpm"))
 console.log("cpm = ", localStorage.getItem("cpm"))

  const makeReq = async () => {

    if (localStorage.getItem("wpm") && localStorage.getItem("cpm")) {
      await axios
        .post("https://typing-speed-app-backend.onrender.com/user/update", {
          token: localStorage.getItem("token"),
          wpm: localStorage.getItem("wpm"),
          cpm: localStorage.getItem("cpm"),
        })
        .then((res) => {
          const { success, message } = res.data;
          console.log(res.data)         
        })
        .catch((err) => {
          console.log(err);
          alert("update user mein dikkat aa rahi hai");
        });
    }
  };

  const fetchData = async () => {
    await axios
      .post("https://typing-speed-app-backend.onrender.com/progress", {
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        setProgressData(res.data.wpm);
      })
      .catch((err) => {
        console.log("PROGRESS AXIOS ERROR");
      });
  };

  useEffect(() => {
    async function useEffectCalls() {
      await makeReq();
      await fetchData();
      localStorage.removeItem("wpm")
      localStorage.removeItem("cpm")
      
    }

    useEffectCalls();
  }, []);

  return (
    <div className="relative">
      <h1 className=" text-center text-4xl font-bold py-5 mb-10 underline text-white">
        Your Progress
      </h1>

      <div>
        <div className="  grid grid-cols-[1fr_2fr_1fr]">
          <div className="py-3 text-center font-semibold text-2xl text-[#646669] underline">
            Date
          </div>

          <div className="py-3 text-center font-semibold text-2xl text-[#646669] underline">
            Words Per Minute
          </div>

          <div className=" text-center font-semibold text-2xl text-[#646669] underline">
            Characters Per Minute
          </div>
        </div>

        {progressData.map((p, index) => {
          return (
            <div key={nanoid()} className="grid grid-cols-[1fr_2fr_1fr]">
              <div className=" py-3 text-center font-medium text-xl text-[#e2B714]">
                {p.date}
              </div>

              <div className="py-3 text-center font-medium text-xl text-[#e2B714]">
                {p.wpm}
              </div>

              <div className="py-3 text-center font-medium text-xl text-[#e2B714]">
                {p.cpm}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Progress;
