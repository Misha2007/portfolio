import { useGLTF } from "@react-three/drei";
import { Clone } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

export default function Sofa(props, ref) {
  const { scene } = useGLTF("/sofa.glb");

  const model = useMemo(() => scene.clone(), [scene]);

  return <Clone ref={ref} object={model} {...props} />;
}
