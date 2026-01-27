import { useGLTF } from "@react-three/drei";

export default function Lamp(props) {
  const { nodes } = useGLTF("/lamp3.glb");
  return (
    <group {...props} dispose={null}>
      <primitive object={nodes["304_Zylinder"].clone()} />
      <primitive object={nodes["305_Kugel_4"].clone()} />
      <primitive object={nodes["312_Zylinder4"].clone()} />

      <mesh
        geometry={nodes.Sphere.geometry}
        position={nodes.Sphere.position.clone()}
        rotation={nodes.Sphere.rotation.clone()}
        scale={nodes.Sphere.scale.clone()}
      >
        <meshPhysicalMaterial
          transmission={1}
          roughness={0.5}
          thickness={0.5}
          ior={2}
        />
      </mesh>
    </group>
  );
}
