import { useGLTF } from "@react-three/drei";

export default function Door(props, ref) {
  const { scene } = useGLTF("/door.glb");
  return <primitive ref={ref} object={scene} {...props} />;
}
