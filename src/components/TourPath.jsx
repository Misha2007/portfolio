import React, { useRef, useEffect } from "react";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

export default function TourPath({ pathPoints, isTourActive, camera }) {
  const arrowRefs = useRef([]);
  const cameraRef = useRef(camera);
  const pathPointsT =
    pathPoints && pathPoints.length > 0
      ? pathPoints
      : [
          [0, 0, 0],
          [0, 0, 0],
        ];

  if (arrowRefs.current.length !== pathPointsT.length) {
    arrowRefs.current = Array(pathPointsT.length)
      .fill()
      .map((_, i) => arrowRefs.current[i] || React.createRef());
  }

  useEffect(() => {
    for (let i = 0; i < pathPointsT.length - 1; i++) {
      const current = new THREE.Vector3(...pathPointsT[i]);
      const next = new THREE.Vector3(...pathPointsT[i + 1]);
      const dir = new THREE.Vector3().subVectors(next, current).normalize();
      arrowRefs.current[i].current?.lookAt(next);
    }
  }, [pathPointsT]);

  useEffect(() => {
    if (!isTourActive) return;
    if (!cameraRef.current) return;

    const positions = pathPointsT.map((p) => new THREE.Vector3(...p));

    const tl = gsap.timeline();
    // positions.forEach((pos, idx) => {
    //   tl.to(cameraRef.current.position, {
    //     x: pos.x,
    //     y: pos.y + 5,
    //     z: pos.z,
    //     duration: 1.5,
    //     onUpdate: () => {
    //       if (idx < positions.length - 1) {
    //         cameraRef.current.lookAt(positions[idx + 1]);
    //       }
    //     },
    //   });
    // });
  }, [isTourActive, pathPointsT]);

  return (
    <>
      <Line
        points={pathPointsT.map((p) => new THREE.Vector3(...p))}
        color="cyan"
        lineWidth={20}
        dashed={true}
      />
    </>
  );
}
