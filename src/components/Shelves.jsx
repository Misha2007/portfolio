import { useGLTF } from "@react-three/drei";

export default function Shelves(props, ref) {
  const { scene } = useGLTF("/shelves.glb");
  return <primitive ref={ref} object={scene} {...props} />;
}
