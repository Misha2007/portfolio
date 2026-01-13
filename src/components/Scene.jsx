import { useThree } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";

function Scene({ quest, setQuest, inputMode }) {
  const { camera } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const guitarRef = useRef();
  const bookRef = useRef();
  const [selectedItem, setSelectedItem] = useState(null);

  const onClick = (e) => {
    if (!quest || inputMode === "game") return; // Only allow clicks in UI mode
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.current.setFromCamera(mouse.current, camera);
    const objectsToTest = [guitarRef.current, bookRef.current].filter(Boolean);
    if (objectsToTest.length === 0) return; // nothing to raycast

    const intersects = raycaster.current.intersectObjects(objectsToTest);
    console.log("Intersects:", intersects);

    if (intersects.length > 0 && intersects[0].object) {
      setSelectedItem(intersects[0].object.name);
    }
  };

  useEffect(() => {
    if (inputMode === "game") return; // Do not attach click listener in game mode
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [quest, inputMode]);

  return (
    <>
      <mesh ref={guitarRef} name="Guitar" position={[0, 100, -250]}>
        <boxGeometry args={[10, 10, 10]} />
        <meshStandardMaterial color="red" />
      </mesh>

      <mesh ref={bookRef} name="Book" position={[20, 0, 0]}>
        <boxGeometry args={[5, 5, 2]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      {selectedItem && inputMode !== "game" && (
        <Html position={[-100, 100, -150]}>
          <div className="ui">{selectedItem}</div>
          <h1>dslfjslkdfjklsjfl</h1>
        </Html>
      )}
    </>
  );
}

export default Scene;
