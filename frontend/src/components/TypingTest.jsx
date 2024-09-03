import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import randomParagraph from "random-paragraph";
import { toast } from "react-toastify";

function TypingTest() {
  const [p, setP] = useState([
    `Nature is an intricate tapestry of life and beauty that unfolds in myriad forms across the planet. From the vast, rolling plains of the savanna to the dense, verdant canopies of the rainforest, every corner of the Earth offers a unique glimpse into the marvels of the natural world. Mountains rise majestically against the horizon, their snow-capped peaks standing as silent sentinels over the land below. Rivers and lakes, shimmering with the reflection of the sky, weave their way through the landscape, nurturing ecosystems and sustaining countless species. The air is filled with the melodies of birdsong, while the ground beneath is alive with the rustle of leaves and the scurry of tiny creatures. Each season brings its own palette of colors and textures, from the vibrant blossoms of spring to the crisp, golden hues of autumn. The ocean, with its boundless expanse, holds mysteries deep beneath its surface, while its shores are constantly reshaped by the ebb and flow of tides. Nature's resilience is evident in the way life adapts and thrives even in the harshest conditions, showcasing an extraordinary ability to rebound and flourish. Forests offer shelter and sustenance, teeming with biodiversity and intricate networks of life. Desert landscapes, though arid and sparse, reveal their own form of rugged elegance and adaptation. The interplay of sunlight and shadow creates enchanting patterns and moods, further highlighting the dynamic essence of the natural world. Stars twinkle above, forming constellations that have guided humanity for millennia, while the moon’s phases mark the passage of time. Nature’s grandeur is not just in its scale but also in its minutiae; the delicate structure of a spider’s web or the intricate patterns on a butterfly's wings remind us of the beauty in small things. Through its ever-changing yet constant presence, nature inspires awe and reflection, urging us to appreciate and protect the delicate balance that sustains all life.`,
    `Mental health is a crucial aspect of overall well-being, encompassing emotional, psychological, and social dimensions of our lives. It influences how we think, feel, and act, affecting our ability to handle stress, relate to others, and make decisions. Struggles with mental health can manifest in various ways, from anxiety and depression to more complex conditions such as bipolar disorder and schizophrenia. These challenges often carry stigma and misunderstanding, which can hinder individuals from seeking help or support. Yet, mental health is as vital as physical health, and taking proactive steps to maintain it is essential. This includes engaging in self-care practices, fostering supportive relationships, and seeking professional help when needed. Therapy and counseling provide valuable tools and strategies for managing mental health issues and promoting emotional resilience. Mindfulness and meditation are also effective in reducing stress and enhancing self-awareness. Additionally, lifestyle factors such as regular exercise, a balanced diet, and adequate sleep play significant roles in mental well-being. Public awareness and education are key to dismantling stigma and encouraging open conversations about mental health. It's important to recognize that mental health struggles are common and that reaching out for support is a sign of strength, not weakness. By prioritizing mental health, individuals can lead more fulfilling and balanced lives. Communities and workplaces should foster environments that support mental wellness and provide resources for those in need. Ultimately, understanding and addressing mental health can lead to more compassionate and resilient societies.`,
    `The environment encompasses the intricate web of natural systems that sustain life on Earth, from the air we breathe to the soil that supports plant growth. It includes ecosystems like forests, oceans, and wetlands, each playing a crucial role in maintaining ecological balance and supporting biodiversity. Human activities, such as deforestation, pollution, and overexploitation of resources, have led to significant environmental challenges, including climate change, loss of habitat, and declining water quality. Protecting the environment requires a collective effort to reduce our carbon footprint and adopt sustainable practices. Conservation initiatives, such as preserving natural habitats and promoting renewable energy sources, are essential for mitigating environmental damage. Education and awareness about environmental issues can empower individuals and communities to make more informed decisions that benefit the planet. Recycling, reducing waste, and supporting green technologies contribute to a healthier environment and a more sustainable future. Policies and regulations aimed at protecting endangered species and regulating industrial emissions are vital in addressing environmental degradation. The health of the environment directly impacts human well-being, influencing everything from food security to public health. By fostering a sense of stewardship and responsibility, we can work towards restoring and preserving the natural world for future generations. Innovations in science and technology also offer promising solutions for tackling environmental challenges and improving resource management. It’s crucial to recognize the interconnectedness of environmental health with economic and social systems, ensuring that efforts to protect the planet also consider human needs. Collaborative global initiatives and local actions both play significant roles in shaping a sustainable future. Embracing a holistic approach to environmental protection can lead to more resilient ecosystems and a better quality of life for all.`,
    `Music, a universal language, weaves together emotions and experiences in ways that transcend boundaries and cultures. From the haunting melodies of ancient instruments to the pulsating rhythms of modern beats, music captures the essence of human expression. It can soothe a troubled mind, energize a weary soul, or evoke memories long forgotten. Each genre tells a unique story, whether it’s the lyrical depth of classical compositions, the raw intensity of rock, or the rhythmic intricacies of jazz. Music fosters community, bringing people together through shared experiences and celebrations. It evolves continuously, adapting to new trends while honoring its rich history. The beauty of music lies in its ability to connect us on a profound level, offering solace, joy, and a sense of belonging. Whether experienced in a grand concert hall or through a personal playlist, music remains an integral part of our lives, reflecting and shaping the world around us.`,
  ]);

  const [paragraph, setParagraph] = useState(
    p[Math.round(Math.random() * 100) % p.length]
  );

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
    <div className="py-[6%] flex justify-center items-center">
      <div
        className=" rounded-md p-4 shadow-xl min-h-[60%] w-[90%] flex flex-col justify-around text-[#646669]"
        onClick={handleFocusClick}
      >
        <div className=" p-4 font-semibold">
          <input
            type="text"
            className="opacity-0 -z-50 absolute"
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
                    ? "text-green-400"
                    : correctWrong[index] === "wrong"
                    ? "text-red-500"
                    : ""
                }  tracking-widest text-2xl`}
                ref={(e) => (charRefs.current[index] = e)}
              >
                {letter}
              </span>
            );
          })}
        </div>

        <div className="flex justify-around  border-t-2 border-black pt-2 items-center text-white">
          <p className="text-xl font-semibold">Time Left : {timeLeft}</p>
          <p className="text-xl font-semibold">Mistakes: {mistakes}</p>
          <p className="text-xl font-semibold">WPM: {WPM}</p>
          <p className="text-xl font-semibold">CPM: {CPM}</p>
          <button
            className={`bg-red-500 px-5 py-2 text-xl font-semibold rounded-md hover:scale-110 duration-300 ease-in-out ${
              isTyping ? "" : "animate-bounce"
            }`}
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
