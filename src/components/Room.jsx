// export default function Room() {
//   return (
//     <group>
//       {/* Floor */}
//       <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
//         <planeGeometry args={[10, 10]} />
//         <meshStandardMaterial color="#444" />
//       </mesh>

//       {/* Ceiling */}
//       <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3, 0]}>
//         <planeGeometry args={[10, 10]} />
//         <meshStandardMaterial color="#222" />
//       </mesh>

//       {/* Back wall */}
//       <mesh position={[0, 1.5, -5]}>
//         <planeGeometry args={[10, 3]} />
//         <meshStandardMaterial color="#555" />
//       </mesh>

//       {/* Front wall */}
//       <mesh rotation={[0, Math.PI, 0]} position={[0, 1.5, 5]}>
//         <planeGeometry args={[10, 3]} />
//         <meshStandardMaterial color="#555" />
//       </mesh>

//       {/* Left wall */}
//       <mesh rotation={[0, Math.PI / 2, 0]} position={[-5, 1.5, 0]}>
//         <planeGeometry args={[10, 3]} />
//         <meshStandardMaterial color="#666" />
//       </mesh>

//       {/* Right wall */}
//       <mesh rotation={[0, -Math.PI / 2, 0]} position={[5, 1.5, 0]}>
//         <planeGeometry args={[10, 3]} />
//         <meshStandardMaterial color="#666" />
//       </mesh>
//     </group>
//   );
// }

import { useGLTF } from "@react-three/drei";

export default function Room(props) {
  const { scene } = useGLTF("/room_main.glb");
  return <primitive object={scene} {...props} />;
}
