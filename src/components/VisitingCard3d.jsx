import { useGLTF } from "@react-three/drei";

export default function VisitingCard3D(props, ref) {
  const { scene } = useGLTF("/visitingCard.glb");
  return <primitive ref={ref} object={scene} {...props} />;
}
