import { useGLTF } from "@react-three/drei";

export default function Volleyball(props, ref) {
  const { scene } = useGLTF("/volleyball.glb");
  return <primitive ref={ref} object={scene} {...props} />;
}
