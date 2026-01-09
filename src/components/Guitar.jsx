import { useGLTF } from "@react-three/drei";

export default function Guitar(props) {
  const { scene } = useGLTF("/guitar-compressed.glb");
  return <primitive object={scene} {...props} />;
}
