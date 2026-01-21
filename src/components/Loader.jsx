import { useProgress } from "@react-three/drei";

export default function Loader() {
  const { progress } = useProgress();

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "white",
        fontSize: "48px",
        zIndex: 9999,
      }}
    >
      {progress.toFixed(0)}%
    </div>
  );
}
