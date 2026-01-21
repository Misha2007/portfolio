import { useNavigate } from "react-router-dom";

function StartScene() {
  const navigate = useNavigate();

  return (
    <div className="start-overlay">
      <div className="start-card">
        <h1 className="start-title">Mykhailo Drogovoz</h1>
        <p className="start-subtitle">Interactive 3D Portfolio</p>
        <button className="start-button" onClick={() => navigate("/scene")}>
          Enter Room
        </button>
      </div>
    </div>
  );
}

export default StartScene;
