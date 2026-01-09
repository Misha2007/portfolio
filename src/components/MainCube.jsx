import { Box } from "@react-three/drei";

export default function MainCube() {
  return (
    <mesh position={[-180, 70, 50]}>
      <Box args={[100, 120, 200]}>
        <meshStandardMaterial opacity={0} transparent={true} />
      </Box>
    </mesh>
  );
}
