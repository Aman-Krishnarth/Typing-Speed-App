import React, { useEffect, useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";

function Progress() {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    console.log("progress section hai");

    axios
      .post("https://typing-speed-app-backend.onrender.com/progress", { token: localStorage.getItem("token") })
      .then((res) => {
        console.log("get mein hu");
        console.log(res.data.wpm);
        setProgressData(res.data.wpm);
      })
      .catch((err) => {
        console.log("progress ke error waale mein");
      });
  }, []);

  return (
    <div className="relative">
      <h1 className=" text-center text-3xl font-bold py-5 bg-blue-400 mb-10 underline">
        Your Progress
      </h1>

      <div>
        <div className="  grid grid-cols-[1fr_2fr_1fr]">
          <div className=" py-3 text-center font-semibold text-2xl text-yellow-600 underline">
            Date
          </div>

          <div className="py-3 text-center font-semibold text-2xl text-yellow-600 underline">
            Words Per Minute
          </div>

          <div className=" text-center font-semibold text-2xl text-yellow-600 underline">
            Characters Per Minute
          </div>
        </div>

        {progressData.map((p, index) => {
          return (
            <div key={nanoid()} className="  grid grid-cols-[1fr_2fr_1fr]">
              <div className=" py-3 text-center font-medium text-xl text-green-600">
                {p.date}
              </div>

              <div className="font-medium flex items-center justify-center text-xl text-green-600">
                {p.wpm}
              </div>

              <div className="font-mediumt flex items-center justify-center text-xl text-green-600">
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
