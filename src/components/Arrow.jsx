import { useRef } from "react";
import * as THREE from "three";

function Arrow(props) {
  const arrowRef = useRef();
  const { camera, targetPosition } = props;

  const arrowDirection = targetPosition
    .clone()
    .sub(camera.position)
    .normalize();
  const rotation = new THREE.Euler(
    0,
    Math.atan2(arrowDirection.x, arrowDirection.z),
    0
  );

  return (
    <mesh ref={arrowRef} rotation={rotation} position={targetPosition}>
      <coneGeometry args={[2, 5, 8]} />
      <meshStandardMaterial color="yellow" />
    </mesh>
  );
}

export default Arrow;
