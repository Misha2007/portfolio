import { extend } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
extend({ PointerLockControls });

import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect, use, useState } from "react";
import * as THREE from "three";
import Arrow from "./Arrow";

function checkProximityAndTriggerEvent(
  playerPosition,
  targetPosition,
  range,
  eventCallback
) {
  const distance = playerPosition.distanceTo(targetPosition);
  if (distance <= range) {
    eventCallback();
  }
}

export default function Player(props) {
  const controls = useRef();
  const { camera, gl } = useThree();
  const direction = new THREE.Vector3();
  const keys = useRef({});
  const keyPressed = useRef({});
  const [keyPr, setKeyPr] = useState(false);

  const speed = 200;
  const targetPosition = new THREE.Vector3(-180, 70, 50);
  const detectionRange = 150;

  useEffect(() => {
    const canvas = gl.domElement;
    const lock = () => canvas.requestPointerLock();
    canvas.addEventListener("click", lock);

    return () => {
      canvas.removeEventListener("click", lock);
    };
  }, [gl]);

  useEffect(() => {
    const down = (e) => {
      keys.current[e.code] = true;
      if (!keyPressed.current[e.code]) {
        keyPressed.current[e.code] = true;
      }
    };

    const up = (e) => {
      keys.current[e.code] = false;
      keyPressed.current[e.code] = false;
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useEffect(() => {
    const c = controls.current;
    if (!c) return;

    const onLock = () => props.switchCanEnter(true);
    const onUnlock = () => props.switchCanEnter(false);

    c.addEventListener("lock", onLock);
    c.addEventListener("unlock", onUnlock);

    return () => {
      if (!c) return;
      c.removeEventListener("lock", onLock);
      c.removeEventListener("unlock", onUnlock);
    };
  }, []);

  useFrame((_, delta) => {
    direction.set(0, 0, 0);
    if (keys.current["KeyW"]) direction.z -= 1;
    if (keys.current["KeyS"]) direction.z += 1;
    if (keys.current["KeyA"]) direction.x -= 1;
    if (keys.current["KeyD"]) direction.x += 1;
    if (keys.current["Space"]) direction.y += 5;
    if (keys.current["ShiftLeft"]) direction.y -= 5;

    const eventCallback = () => {
      console.log("Event Triggered!");
      props.switchQuest(true);
      setKeyPr(true);
      setTimeout(() => {
        setKeyPr(false);
      }, 1000);
    };

    const closeEventCallback = () => {
      console.log("Event closed!");
      setKeyPr(true);
      setTimeout(() => {
        setKeyPr(false);
      }, 1000);
    };

    if (keyPressed.current["KeyE"] && !keyPr) {
      checkProximityAndTriggerEvent(
        camera.position,
        targetPosition,
        detectionRange,
        eventCallback
      );
    }

    // if (keyPressed.current["KeyX"] && !keyPr) {
    //   closeEventCallback();
    // }

    direction.normalize();
    direction.applyQuaternion(camera.quaternion);

    camera.position.addScaledVector(direction, speed * delta);

    // camera.position.x = THREE.MathUtils.clamp(camera.position.x, -4.5, 4.5);
    // camera.position.z = THREE.MathUtils.clamp(camera.position.z, -4.5, 4.5);
    // camera.position.y = 1.6;
  });
  const nPos = new THREE.Vector3(0, 2, 0);

  return (
    <>
      <Arrow camera={camera} targetPosition={targetPosition} />
      <PointerLockControls
        pointerSpeed={0.9}
        // maxPolarAngle={Math.PI - 1.5}
        // minPolarAngle={1.5}
        ref={controls}
      />
    </>
  );
}
