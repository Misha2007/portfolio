import { use, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Player from "./components/Player";
import { Canvas } from "@react-three/fiber";
import Room from "./components/Room";
import Menu from "./components/Menu";
import MainCube from "./components/MainCube";
import Guitar from "./components/Guitar";
import Lamp from "./components/Lamp";
import Shelves from "./components/Shelves";
import Table from "./components/Table";
import Sofa from "./components/Sofa";
import ObjectPositionTracker from "./components/ObjectPositionTracker";
import Scene from "./components/Scene";
import { Html, Text } from "@react-three/drei";
import Folder from "./components/Folder";
import NightStand from "./components/NightStand";

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
  const projects = [
    {
      id: 1,
      title: "Ternet",
      description:
        "This is a Django-based forum project where users can register, create topics, post messages, and reply to messages. The forum includes features like user authentication, message replies, and indicating whether users are online.",
      github: "https://github.com/Misha2007/ternet",
      type: "solo",
    },
    {
      id: 2,
      title: "Flash Mind",
      description:
        "It is a frontend-only platform for anime enthusiasts. This site provides curated lists, a merchandise store, and an about section—all accessible from a simple, user-friendly interface.",
      github: "https://github.com/Misha2007/Visual-Memory-game",
      type: "group",
    },
    {
      id: 3,
      title: "Chess Game",
      description:
        "This repository contains a chess implementation in Python. It allows players to play against each other or against an AI opponent. The AI uses a basic minimax algorithm with alpha-beta pruning for move selection.",
    },
    {
      id: 4,
      title: "Anime Website",
      description:
        "It is a frontend-only platform for anime enthusiasts. This site provides curated lists, a merchandise store, and an about section—all accessible from a simple, user-friendly interface.",
      github: "https://github.com/Misha2007/anime-site",
      type: "solo",
    },
    {
      id: 5,
      title: "Sportvana",
      description:
        "Sportvana is your chance to level up your fitness with fun & rewards. Complete exercises, earn coins, unlock features, and challenge the leaderboard — your ultimate fitness gamification journey begins here.",
      github: "https://github.com/MykhailoDrogovoz/hackatime",
      type: "solo",
      link: "https://sportvana.netlify.app",
    },
    {
      id: 6,
      title: "Booking system",
      description:
        "A full-stack hotel booking platform where users can browse, book hotels, save favorites, and securely pay online. Built using React for the frontend and Node.js (Express) with MySQL and Sequelize for the backend. Secure authentication is handled with Bcrypt, and payments are integrated via Stripe.",
      github: "https://github.com/Misha2007/booking_system",
      type: "group",
      link: "https://bosystem.netlify.app/ ",
    },
    {
      id: 6,
      title: "Smart City Event Map",
      description:
        "A city-wide interactive map that shows events. There are also available cinema movies, theatre plays and you can even become a sponsor.",
      github: "https://github.com/Misha2007/smart-city-event-map",
      type: "solo",
      link: "https://smart-city-events-map.vercel.app/ ",
    },
  ];

  const FOLDERS_PER_PAGE = 2;

  const [folderPage, setFolderPage] = useState(0);
  const [openFolder, setOpenFolder] = useState(null);
  const startIndex = folderPage * FOLDERS_PER_PAGE;
  const visibleFolders = projects.slice(
    startIndex,
    startIndex + FOLDERS_PER_PAGE
  );

  const [quest, setQuest] = useState(false);
  const [nearQuest, setNearQuest] = useState(false);
  const [interactables, setInteractables] = useState({});
  const sofaRef = useRef();
  const shelvesRef = useRef();
  const [inputMode, setInputMode] = useState("game");
  const [canEnter, setCanEnter] = useState(true);
  const [isMenu, setIsMenu] = useState(false);
  const guitarRef = useRef();
  const bookRef = useRef();
  const nightStand = useRef();
  const [selectedItem, setSelectedItem] = useState(null);

  const switchQuest = (quest) => {
    setQuest(quest);
  };

  const switchNearQuest = (near) => {
    setNearQuest(near);
  };

  const switchCanEnter = (menu) => {
    console.log("Switching can enter to:", isMenu);
    setCanEnter(menu);
  };

  const nextPart = () => {
    if (currentPart < textParts.length - 1) {
      setCurrentPart(currentPart + 1);
    } else {
      setCurrentPart(0);
      setQuest(false);
      setInputMode("game");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const page = parseInt(e.key, 10) - 1;
      const maxPage = Math.ceil(projects.length / FOLDERS_PER_PAGE) - 1;

      if (!isNaN(page) && page >= 0 && page <= maxPage) {
        setFolderPage(page);
        console.log("Setting folder page to:", page);
        setOpenFolder(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "KeyX") {
        setDisplayedText("");
        setCurrentPart(0);
        setQuest(false);
        setInputMode("game");
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
      {!canEnter && isMenu && (
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
      {quest.key && (
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
          {quest.key === "sofa" && (
            <div>
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

          {quest.key === "shelves" && (
            <button
              onClick={() => {
                setQuest({});
                setSelectedItem(null);
                setInputMode("game");
              }}
            >
              Close
            </button>
          )}

          {quest.key === "nightStand" && !openFolder && (
            <button
              onClick={() => {
                setQuest({});
                setSelectedItem(null);
                setInputMode("game");
              }}
            >
              Close
            </button>
          )}
        </div>
      )}

      {selectedItem && (
        <div className="ui">
          {selectedItem === "Guitar" && <p>This guitar is from 1972...</p>}
          {selectedItem === "Book" && <p>A mysterious old book...</p>}
        </div>
      )}

      {nearQuest && (
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "10px 20px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            borderRadius: "5px",
            zIndex: 1,
          }}
        >
          {quest ? "Press 'E' to interact" : "Press 'E' to interact"}
        </div>
      )}

      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "10px 20px",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          borderRadius: "5px",
          zIndex: 1,
        }}
      >
        WSAD to move, Mouse to look around, E to interact
      </div>

      {selectedItem && inputMode !== "game" && (
        <div className="ui">{selectedItem}</div>
      )}

      {openFolder && (
        <div
          style={{
            color: "#4F4D82",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "absolute",
            textAlign: "center",
            right: "50%",
            top: "50%",
            zIndex: 1,
            transform: "translate(50%, -50%)",
            width: "100vw",
            height: "100vh",
            wordWrap: "break-word",
            whiteSpace: "normal",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="ui-nightstand-folder">
            <div>
              <h2>{openFolder.title}</h2>
              <small>{openFolder.type ? "Type: " + openFolder.type : ""}</small>
              <p>
                {openFolder.description.length >= 800
                  ? openFolder.description.slice(0, 800)
                  : openFolder.description}
              </p>
              {openFolder.github && (
                <p>
                  <a href={openFolder.github}>
                    {"Github: " + openFolder.github}
                  </a>
                </p>
              )}
              {openFolder.link && (
                <p>
                  <a href={openFolder.link}>{"Link: " + openFolder.link}</a>
                </p>
              )}
            </div>
            <div>
              <p>
                {openFolder.description.length >= 800 &&
                  openFolder.description.slice(800)}
              </p>
              <button onClick={() => setOpenFolder(null)}>Close</button>
            </div>
          </div>
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
        <Player
          switchCanEnter={switchCanEnter}
          switchQuest={switchQuest}
          quest={quest}
          switchNearQuest={switchNearQuest}
          interactables={interactables}
          inputMode={inputMode}
          setInputMode={setInputMode}
          isMenu={isMenu}
          setIsMenu={setIsMenu}
          guitarRef={guitarRef}
          bookRef={bookRef}
          setSelectedItem={setSelectedItem}
        />
        <MainCube />
        <Room scale={1} />
        <Lamp scale={1} position={[-40, 10, -50]} />
        <Lamp scale={1} position={[0, 0, 0]} />
        <Lamp scale={1} position={[-30, 10, 50]} />
        <Shelves scale={1.4} position={[100, -10, 50]} ref={shelvesRef} />
        <ObjectPositionTracker
          objectRef={shelvesRef}
          onReady={(box) =>
            setInteractables((prev) => ({ ...prev, shelves: box }))
          }
        />
        <Sofa scale={1} position={[0, 0, 0]} ref={sofaRef} />
        <ObjectPositionTracker
          objectRef={sofaRef}
          onReady={(box) =>
            setInteractables((prev) => ({ ...prev, sofa: box }))
          }
        />
        <Table scale={1} position={[20, 0, 0]} />
        <Sofa scale={1} position={[-100, 0, 100]} rotation={[0, Math.PI, 0]} />

        <Guitar
          scale={100}
          position={[-100, 70, -200]}
          rotation={[0, -1.5, 0]}
          name="Guitar"
          ref={guitarRef}
        />
        <mesh ref={bookRef} name="Book" position={[0, 100, -250]}>
          <boxGeometry args={[5, 5, 2]} />
          <meshStandardMaterial color="blue" />
        </mesh>

        {/* <mesh ref={nightStand} position={[-150, 50, 250]}>
          <boxGeometry args={[50, 50, 50]} />
          <meshStandardMaterial color="blue" />
        </mesh> */}
        <NightStand
          scale={30}
          position={[-150, 20, 250]}
          ref={nightStand}
          name="nightStand"
          rotation={[0, Math.PI, 0]}
        />
        <ObjectPositionTracker
          objectRef={nightStand}
          onReady={(box) =>
            setInteractables((prev) => ({ ...prev, nightStand: box }))
          }
        />
        {true && (
          <group position={[-150, 80, 250]}>
            {visibleFolders.map((project, i) => (
              <Folder
                key={project.id}
                project={project}
                position={[0, 0, i === 0 ? 12 : -12]}
                onOpen={setOpenFolder}
                inputMode={inputMode}
              />
            ))}
          </group>
        )}
      </Canvas>
    </div>
  );
}

export default App;
