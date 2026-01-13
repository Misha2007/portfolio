import { Text } from "@react-three/drei";

function Folder({ project, position, onOpen, inputMode }) {
  return (
    <group position={position}>
      <mesh onClick={() => inputMode === "ui" && onOpen(project)}>
        <boxGeometry args={[30, 1, 20]} />
        <meshStandardMaterial color="#ffcc66" />
      </mesh>

      <Text
        position={[0, 0.6, 0]}
        rotation={[Math.PI / 2, -Math.PI, -Math.PI / 2]}
        fontSize={2}
        maxWidth={20}
        textAlign="center"
        color="black"
      >
        {project.title}
      </Text>
    </group>
  );
}
export default Folder;
