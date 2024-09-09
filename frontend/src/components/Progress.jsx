import React, { useEffect, useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";

function Progress() {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    axios
      .post("https://typing-speed-app-backend.onrender.com/progress", {
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        setProgressData(res.data.wpm);
      })
      .catch((err) => {
        console.log("PROGRESS AXIOS ERROR");
      });
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
