import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function ObjectPositionTracker({ objectRef, onReady, once = true }) {
  const captured = useRef(false);

  useFrame(() => {
    if (!objectRef.current) return;
    if (once && captured.current) return;

    const object = objectRef.current;

    const box = new THREE.Box3().setFromObject(object);
    onReady(box);

    captured.current = true;
  });

  return null;
}

export default ObjectPositionTracker;
