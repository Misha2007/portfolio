import { Routes, Route } from "react-router-dom";
import StartScene from "./components/StartScene";
import Scene from "./components/Scene";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartScene />} />
      <Route path="/scene" element={<Scene />} />
    </Routes>
  );
}

export default App;
