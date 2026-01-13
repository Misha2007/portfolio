import { extend } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
extend({ PointerLockControls });

import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect, use, useState } from "react";
import * as THREE from "three";

function getNearestInteractable(playerPosition, interactables, range) {
  let nearest = null;
  let minDistance = Infinity;
  for (const [key, box] of Object.entries(interactables)) {
    const distance = box.distanceToPoint(playerPosition);
    if (distance <= range && distance < minDistance) {
      minDistance = distance;
      nearest = { key, box };
    }
  }
  return nearest;
}

export default function Player(props) {
  const { camera, gl, scene } = useThree();

  const controls = useRef();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  const guitarRef = props.guitarRef;
  const bookRef = props.bookRef;

  const [nearQuest, setNearQuest] = useState(false);
  const [activeObject, setActiveObject] = useState(null);
  const [keyPr, setKeyPr] = useState(false);

  const keys = useRef({});
  const keyPressed = useRef({});
  const unlockReason = useRef(null);
  const speed = 200;
  const detectionRange = 100;
  const interactables = props.interactables || null;

  const handleClick = (e) => {
    if (props.inputMode !== "ui") return;
    const rect = gl.domElement.getBoundingClientRect();
    mouse.current.x =
      ((e.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
    mouse.current.y =
      -((e.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;

    raycaster.current.setFromCamera(mouse.current, camera);

    const objectsToTest = [guitarRef.current, bookRef.current].filter(Boolean);
    if (objectsToTest.length === 0) return;

    const intersects = raycaster.current.intersectObjects(objectsToTest);
    if (intersects.length > 0 && intersects[0].object) {
      console.log("intersects:", intersects);

      props.setSelectedItem(intersects[0].object.name);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [props.inputMode]);

  useEffect(() => {
    const down = (e) => {
      keys.current[e.code] = true;
      keyPressed.current[e.code] = keyPressed.current[e.code] || true;

      if (e.code === "Escape" && props.inputMode === "game") {
        unlockReason.current = "menu";
        document.exitPointerLock();
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
  }, [props.inputMode]);

  useEffect(() => {
    const canvas = gl.domElement;
    const lock = () => {
      if (props.inputMode === "game") {
        console.log(props.inputMode);
        canvas.requestPointerLock();
      }
    };
    canvas.addEventListener("click", lock);
    return () => canvas.removeEventListener("click", lock);
  }, [gl, props.inputMode]);

  useEffect(() => {
    const c = controls.current;
    if (!c) return;
    const onLock = () => {
      props.switchCanEnter(true);
      console.log("Locked");
      if (unlockReason.current === "menu") {
        props.setIsMenu(false);
      }
    };
    const onUnlock = () => {
      const reason = unlockReason.current;
      console.log("Unlock reason:", reason);
      if (reason === "menu") {
        props.switchCanEnter(false);
        props.setIsMenu(true);
      } else if (reason === "ui") {
        props.switchCanEnter(false);
      } else {
        props.switchCanEnter(false);
      }
      unlockReason.current = null;
    };
    c.addEventListener("lock", onLock);
    c.addEventListener("unlock", onUnlock);
    return () => {
      c.removeEventListener("lock", onLock);
      c.removeEventListener("unlock", onUnlock);
    };
  }, []);

  useFrame((_, delta) => {
    if (props.quest.box) {
      const center = new THREE.Vector3();
      props.quest.box.getCenter(center);
      let offset = new THREE.Vector3(0, 0, 0);
      if (props.quest.key === "shelves") {
        offset = new THREE.Vector3(0, 50, 200);
      } else if (props.quest.key === "nightStand") {
        offset = new THREE.Vector3(50, 80, 0);
      } else {
        offset = new THREE.Vector3(200, 50, 0);
      }
      camera.position.copy(center.clone().add(offset));
      camera.lookAt(center);
      return;
    }
    if (props.inputMode !== "game") return;
    const direction = new THREE.Vector3();
    if (keys.current["KeyW"]) direction.z -= 1;
    if (keys.current["KeyS"]) direction.z += 1;
    if (keys.current["KeyA"]) direction.x -= 1;
    if (keys.current["KeyD"]) direction.x += 1;
    if (keys.current["Space"]) direction.y += 5;
    if (keys.current["ShiftLeft"]) direction.y -= 5;
    if (interactables && Object.keys(interactables).length > 0) {
      const nearest = getNearestInteractable(
        camera.position,
        interactables,
        detectionRange
      );
      const isNear = Boolean(nearest);
      if (isNear !== nearQuest) {
        setNearQuest(isNear);
        props.switchNearQuest(isNear);
      }
      setActiveObject(nearest);
    }
    if (keyPressed.current["KeyE"] && !keyPr && nearQuest) {
      console.log("Event Triggered!", activeObject);
      props.switchQuest(activeObject);
      unlockReason.current = "ui";
      document.exitPointerLock();
      props.setInputMode("ui");
      setKeyPr(true);
      setTimeout(() => setKeyPr(false), 1000);
    }

    direction.normalize();
    direction.applyQuaternion(camera.quaternion);
    camera.position.addScaledVector(direction, speed * delta);
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, -220, 220);
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, -300, 300);
    camera.position.y = 120;
  });

  return (
    <>
      {props.inputMode === "game" && (
        <PointerLockControls pointerSpeed={0.9} ref={controls} />
      )}
    </>
  );
}
