export default function PingPongPaddle(props) {
  return (
    <mesh {...props}>
      <sphereGeometry args={[0.02, 32, 32]} />
      <meshStandardMaterial color="#f5f5f5" roughness={0.35} metalness={0} />
    </mesh>
  );
}
