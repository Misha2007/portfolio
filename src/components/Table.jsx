import { useGLTF } from "@react-three/drei";

export default function Table(props) {
  const { scene } = useGLTF("/table.glb");
  return <primitive object={scene} {...props} />;
}
