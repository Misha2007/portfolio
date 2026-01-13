import { Clone, useGLTF } from "@react-three/drei";

export default function Lamp(props) {
  const { scene } = useGLTF("/lamp.glb");
  return <Clone object={scene} {...props} />;
}
