import { useGLTF } from "@react-three/drei";

export default function NightStand(props, ref) {
  const { scene } = useGLTF("/nightStand.glb");
  return <primitive ref={ref} object={scene} {...props} />;
}
