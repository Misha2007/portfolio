import { useGLTF } from "@react-three/drei";

export default function PingPongPaddle(props, ref) {
  const { scene } = useGLTF("/pingPongRackets.glb");
  return <primitive ref={ref} object={scene} {...props} />;
}
