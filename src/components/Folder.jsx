import { Text } from "@react-three/drei";

function Folder({ project, scale = 1, position, onOpen, inputMode }) {
  return (
    <group position={position} scale={scale}>
      <mesh onClick={() => inputMode === "ui" && onOpen(project)}>
        <boxGeometry args={[1.1, 0.01, 0.75]} />
        <meshStandardMaterial color="#ffcc66" />
      </mesh>

      <Text
        position={[0, 0.01, 0]}
        rotation={[
          Math.PI / 2,
          -Math.PI,
          scale === 1 ? Math.PI / 2 : -Math.PI / 2,
        ]}
        fontSize={0.08}
        maxWidth={30}
        textAlign="center"
        color="black"
      >
        {project.title}
      </Text>
    </group>
  );
}
export default Folder;
