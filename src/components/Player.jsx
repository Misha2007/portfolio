import { extend } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
extend({ PointerLockControls });

import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState, useMemo } from "react";
import * as THREE from "three";
import gsap from "gsap";

function getNearestInteractable(playerPosition, interactables, range) {
  if (!interactables || Object.keys(interactables).length === 0) return null;

  let nearestHint = null;
  let nearestHintDist = Infinity;

  let nearestInteraction = null;
  let minInteractionDist = Infinity;

  for (const [key, box] of Object.entries(interactables)) {
    const center = box.getCenter(new THREE.Vector3());
    const distance = playerPosition.distanceTo(center);

    if (distance < nearestHintDist) {
      nearestHintDist = distance;
      nearestHint = { position: center.clone() };
    }

    if (distance <= range && distance < minInteractionDist) {
      minInteractionDist = distance;
      nearestInteraction = { key, box, position: center.clone() };
    }
  }

  return {
    ...nearestHint,
    ...(nearestInteraction || {}),
  };
}

function computePathPoints(startPos, endPos, numPoints = 6) {
  if (!startPos || !endPos)
    return [
      [0, 0, 0],
      [0, 0, 0],
    ];

  const points = [];
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    points.push([
      THREE.MathUtils.lerp(startPos.x, endPos.x, t),
      THREE.MathUtils.lerp(startPos.y, endPos.y, t) - 20,
      THREE.MathUtils.lerp(startPos.z, endPos.z, t),
    ]);
  }
  return points;
}

export default function Player(props) {
  const { camera, gl, scene } = useThree();

  const controls = useRef();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  const guitarRef = props.guitarRef;
  const pingPongPaddleRef = props.pingPongPaddleRef;

  const [nearQuest, setNearQuest] = useState(false);
  const [activeObject, setActiveObject] = useState(null);
  const [keyPr, setKeyPr] = useState(false);
  const activeObjectRef = useRef(null);

  const keys = useRef({});
  const keyPressed = useRef({});
  const unlockReason = useRef("menu");
  const speed = 200;
  const detectionRange = 150;

  const dir = useMemo(() => new THREE.Vector3(), []);
  const ofsVec = useMemo(() => new THREE.Vector3(), []);

  const centerVec = useMemo(() => new THREE.Vector3(), []);

  const interactCheckTimer = useRef(0);

  const interactables = props.interactables || null;

  const handleClick = (e) => {
    if (props.inputMode !== "ui") return;
    console.log("Click detected in UI mode");
    const rect = gl.domElement.getBoundingClientRect();
    mouse.current.x =
      ((e.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
    mouse.current.y =
      -((e.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;

    raycaster.current.setFromCamera(mouse.current, camera);

    const objectsToTest = [guitarRef.current, pingPongPaddleRef.current].filter(
      Boolean,
    );
    console.log("Objects to test:", objectsToTest);
    if (objectsToTest.length === 0) return;

    const intersects = raycaster.current.intersectObjects(objectsToTest, true);
    if (intersects.length > 0) {
      const hitObject = intersects[0].object;

      let topLevel = hitObject;
      while (topLevel.parent && topLevel.parent.type !== "Scene") {
        topLevel = topLevel.parent;
      }

      const nameToUse = topLevel.name || hitObject.name;

      console.log("intersects:", nameToUse);
      props.setSelectedItem(nameToUse);
    }
  };

  useEffect(() => {
    if (props.inputMode === "ui") {
      document.exitPointerLock();
    }
  }, [props.inputMode]);

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [props.inputMode]);

  useEffect(() => {
    const down = (e) => {
      keys.current[e.code] = true;
      keyPressed.current[e.code] = keyPressed.current[e.code] || true;

      if (e.code === "Escape") {
        console.log("Escape pressed");
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
        console.log("From canvas", props.inputMode);
        // canvas.requestPointerLock();
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
      unlockReason.current = "menu";
    };
    c.addEventListener("lock", onLock);
    c.addEventListener("unlock", onUnlock);
    return () => {
      c.removeEventListener("lock", onLock);
      c.removeEventListener("unlock", onUnlock);
    };
  }, [unlockReason.current, controls.current]);

  useEffect(() => {
    if (props.cameraRef) props.cameraRef.current = camera;
  }, [camera]);

  useFrame((_, delta) => {
    if (props.quest.box) {
      if (props.quest.key === "door") return;
      props.quest.box.getCenter(centerVec);
      if (props.quest.key === "shelves") {
        ofsVec.set(0, 50, 200);
      } else if (props.quest.key === "nightStand") {
        ofsVec.set(50, 80, 0);
      } else if (props.quest.key === "visitingCard") {
        ofsVec.set(50, 80, 0);
      } else {
        ofsVec.set(200, 50, 0);
      }
      camera.position.copy(centerVec.clone().add(ofsVec));
      camera.lookAt(centerVec);
    }
    if (props.inputMode !== "game") return;
    dir.set(0, 0, 0);
    if (keys.current["KeyW"]) dir.z -= 1;
    if (keys.current["KeyS"]) dir.z += 1;
    if (keys.current["KeyA"]) dir.x -= 1;
    if (keys.current["KeyD"]) dir.x += 1;

    interactCheckTimer.current += delta;
    if (
      interactCheckTimer.current > 0.1 &&
      interactables &&
      Object.keys(interactables).length > 0
    ) {
      const nearest = getNearestInteractable(
        camera.position,
        interactables,
        detectionRange,
      );
      if (nearest.position) {
        const pathPoints = computePathPoints(camera.position, nearest.position);
        props.onUpdateTourPath(pathPoints);
        activeObjectRef.current = {
          key: nearest.key || null,
          box: nearest.box || null,
          position: nearest.position.clone(),
        };
      }
      const isNear = Boolean(!!nearest.key);
      if (isNear !== nearQuest) {
        setNearQuest(isNear);
        props.switchNearQuest(isNear);
        setActiveObject(nearest);
      }
    }

    if (keyPressed.current["KeyE"] && !keyPr && nearQuest) {
      const obj = activeObjectRef.current;
      console.log(activeObjectRef);
      if (!obj) return;

      console.log("Event Triggered!", obj);
      props.switchQuest(obj);

      unlockReason.current = "ui";
      document.exitPointerLock();
      props.setInputMode("ui");
      setKeyPr(true);
      setTimeout(() => setKeyPr(false), 1000);
    }

    dir.normalize();
    dir.applyQuaternion(camera.quaternion);
    camera.position.addScaledVector(dir, speed * delta);
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, -220, 180);
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
