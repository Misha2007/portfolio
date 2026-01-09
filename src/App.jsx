import { use, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Player from "./components/Player";
import { Canvas } from "@react-three/fiber";
import Room from "./components/Room";
import Menu from "./components/Menu";
import MainCube from "./components/MainCube";
import Guitar from "./components/Guitar";

function App() {
  const textParts = [
    "Hi! I am Mykhailo Drogovoz, 17 y.o, and currently  I am a student at Tartu Vocational School in a software development faculty. I've been studying here for the past three years. Prior to this, I spent one year studying at a school in Tartu Descartes School before enrolling in vocational school. Before moving abroad, I attended gymnasium Kyiv-Mohyla Collegium in my home country.",
    "I decided to become a software developer, because this speciality opens a lot of opportunities and you can be so creative as you want. My first experience with coding came through a website building course and after working on a few projects, I realized that software development was the perfect field for me. The more I learned, the more I felt motivated to continue pursuing this path.",
    "Even though I haven't participated in official competitions yet, I took part in Hack Club's Neighborhood program. The goal of the program was to build a project over 100 hours and potentially get invited to San Francisco. Although the project was closed before I could complete it, I received valuable feedback from testers and learned a lot through the process.",
    "Outside of programming, I enjoy playing volleyball and ping pong. I also like to play the guitar in my free time, it's a great way to relax and express creativity in a different way.",
    "Thank you for visiting my portfolio, and feel free to explore my work!",
  ];
  const [currentPart, setCurrentPart] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  const [canEnter, setCanEnter] = useState(true);
  const [quest, setQuest] = useState(false);

  const switchQuest = (quest) => {
    setQuest(quest);
  };

  const switchCanEnter = (menu) => {
    setCanEnter(menu);
  };

  const nextPart = () => {
    if (currentPart < textParts.length - 1) {
      setCurrentPart(currentPart + 1);
    } else {
      setCurrentPart(0);
      setQuest(false);
    }
  };

  useEffect(() => {
    if (!quest) return;
    let currentIndex = 0;
    const text = textParts[currentPart];
    setDisplayedText("");

    const interval = setInterval(() => {
      if (currentIndex >= text.length) {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentPart((prev) => (prev + 1) % textParts.length);
        }, 1000);
        return;
      }

      setDisplayedText((prev) => prev + text[currentIndex]);
      currentIndex++;
    }, 100);

    return () => clearInterval(interval);
  }, [currentPart, quest]);

  // useEffect(() => {
  //   if (displayedText.length === textParts[currentPart].length) {
  //     const timeout = setTimeout(() => {
  //       nextPart();
  //     }, 5000);
  //     return () => clearTimeout(timeout);
  //   }
  // }, [displayedText]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "KeyX") {
        setDisplayedText("");
        setCurrentPart(0);
        setQuest(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const buttonClicked = () => {
    console.log("Button clicked!");
    switchCanEnter(true);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {!canEnter && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10,
            background: "transparent",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              backgroundColor: "#fff",
              width: "100px",
              height: "100px",
              position: "absolute",
              top: "50px",
              right: "50px",
              zIndex: 1,
            }}
            onClick={buttonClicked}
          ></div>
          <Menu />
        </div>
      )}

      {quest && (
        <div
          style={{
            color: "#4F4D82",
            position: "absolute",
            textAlign: "center",
            right: "50%",
            top: "50%",
            zIndex: 1,
            transform: "translate(50%, -50%)",
            width: "80%",
            wordWrap: "break-word",
            whiteSpace: "normal",
          }}
        >
          <h1
            style={{
              color: "white",
              padding: "20px",
              fontSize: "28px",
              wordBreak: "break-word",
            }}
          >
            {displayedText}
          </h1>
          <button
            onClick={nextPart}
            style={{ padding: "10px 20px", fontSize: "16px" }}
          >
            Next Part
          </button>
        </div>
      )}

      <Canvas
        camera={{ fov: 80, position: [40, 100, 60], rotation: [0, 1.5, 0] }}
      >
        <color attach="background" args={["#111"]} />
        <ambientLight intensity={0.3} />

        {/* <directionalLight position={[-100, 180, -20]} intensity={20} /> */}
        <pointLight
          position={[-100, 180, -20]}
          intensity={15}
          distance={1500}
          decay={0.5}
        />
        <pointLight
          position={[-90, 160, 120]}
          intensity={15}
          distance={1500}
          decay={0.5}
        />
        <pointLight
          position={[-10, 140, 50]}
          intensity={15}
          distance={1500}
          decay={0.5}
        />
        <directionalLight intensity={0.4} position={[5, 5, 5]} />
        <Player switchCanEnter={switchCanEnter} switchQuest={switchQuest} />
        <MainCube />
        <Room scale={1} />
        <Guitar
          scale={100}
          position={[-200, 70, -200]}
          rotation={[0, -1.5, 0]}
        />
      </Canvas>
    </div>
  );
}

export default App;
