import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import randomParagraph from "random-paragraph";
import { toast } from "react-toastify";

function TypingTest() {
  const [paragraph, setParagraph] = useState(randomParagraph({ sentences: 10 }));

  console.log();

  const maxTime = 30;

  const [timeLeft, setTimeLeft] = useState(maxTime);
  const [mistakes, setMistakes] = useState(0);
  const [WPM, setWPM] = useState(0);
  const [CPM, setCPM] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [correctWrong, setCorrectWrong] = useState([]);
  const charRefs = useRef([]);
  const inputRef = useRef();

  function handleFocusClick() {
    inputRef.current.focus();
  }

  function handleReset() {
    setIsTyping(false);
    setTimeLeft(maxTime);
    setCharIndex(0);
    setMistakes(0);
    setCPM(0);
    setWPM(0);
    setCorrectWrong(Array(charRefs.current.length).fill(""));
    inputRef.current.focus();
  }

  useEffect(() => {
    handleFocusClick();
    setCorrectWrong(Array(charRefs.current.length).fill(""));
  }, []);

  useEffect(() => {
    let interval;
    if (isTyping && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        let correctChars = charIndex - mistakes;
        let totalTime = maxTime - timeLeft;

        let cpm = correctChars * (60 / totalTime);
        cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm;
        setCPM(parseInt(cpm, 10));

        let wpm = Math.round((correctChars / 5 / totalTime) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        setWPM(wpm);
      }, 1000);
    } else if (timeLeft === 0) {
      inputRef.current.blur();
      clearInterval(interval);
      setIsTyping(false);

      const makeReq = async () => {
        await axios
          .post("https://typing-speed-app-backend.onrender.com/user/update", {
            token: localStorage.getItem("token"),
            wpm: WPM,
            cpm: CPM,
          })
          .then((res) => {
            const { success, message } = res.data;

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
          })
          .catch((err) => {
            alert("update user mein dikkat aa rahi hai");
          });
      };
      makeReq();
    }
    return () => {
      clearInterval(interval);
    };
  }, [isTyping, timeLeft]);

  function handleChange(e) {
    console.log("change hua hai bro");
    console.log(e.target.value);

    const characters = charRefs.current;
    let currentChar = charRefs.current[charIndex];
    let typedChar = e.target.value.slice(-1);

    if (charIndex < characters.length && timeLeft > 0) {
      if (!isTyping) {
        setIsTyping(true);
      }

      if (typedChar === currentChar.textContent) {
        setCharIndex(charIndex + 1);
        correctWrong[charIndex] = "right";
      } else {
        setCharIndex(charIndex + 1);
        setMistakes(mistakes + 1);
        correctWrong[charIndex] = "wrong";
      }
      if (charIndex === characters.length - 1) {
        setIsTyping(false);
      }
    } else {
      setIsTyping(false);
    }
  }

  return (
    <div className=" py-[6%] flex justify-center items-center">
      <div
        className="bg-red-400 rounded-md w-[85%] p-4 shadow-xl min-h-[60%] md:w-1/2 flex flex-col justify-around"
        onClick={handleFocusClick}
      >
        <div className="bg-pink-400 p-4 text-xl font-semibold">
          <input
            type="text"
            className=" opacity-0 -z-50 absolute"
            ref={inputRef}
            onChange={handleChange}
          />
          {paragraph.split("").map((letter, index) => {
            return (
              <span
                key={index}
                className={`${
                  index === charIndex
                    ? "border-b-4 border-blue-500 border-solid"
                    : ""
                } ${
                  correctWrong[index] === "right"
                    ? "text-green-600"
                    : correctWrong[index] === "wrong"
                    ? "text-red-600"
                    : ""
                }`}
                ref={(e) => (charRefs.current[index] = e)}
              >
                {letter}
              </span>
            );
          })}
        </div>

        <div className="flex justify-around  border-t-2 border-black pt-2 items-center">
          <p className="text-lg font-semibold">Time Left : {timeLeft}</p>
          <p className="text-lg font-semibold">Mistakes: {mistakes}</p>
          <p className="text-lg font-semibold">WPM: {WPM}</p>
          <p className="text-lg font-semibold">CPM: {CPM}</p>
          <button
            className={`bg-red-500 px-5 py-2 rounded-md hover:scale-110 duration-300 ease-in-out ${isTyping? "" : "animate-bounce"}`}
            onClick={handleReset}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default TypingTest;
