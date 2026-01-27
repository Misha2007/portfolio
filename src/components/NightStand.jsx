import { useGLTF } from "@react-three/drei";
import Shelf from "./Shelf";
import Folder from "./Folder";

export default function NightStand(props, ref) {
  const { nodes, materials } = useGLTF("/nightStand1.glb");
  // console.log(nodes);
  return (
    <group ref={ref} {...props}>
      <mesh geometry={nodes.NSCore.geometry} material={materials.Material} />

      <Shelf
        mesh1={nodes.Cube003}
        mesh2={nodes.Cube003_1}
        material={[materials["Material.001"], materials.Material]}
        index={1}
        openShelf={props.openShelf}
      >
        {props.projects.slice(0, 2).map((project, i) => (
          <Folder
            key={project.id}
            project={project}
            position={[-0.3, 1.6, i ? -0.4 : 0.4]}
            onOpen={props.setOpenFolder}
            inputMode={props.inputMode}
          />
        ))}
      </Shelf>
      <Shelf
        mesh1={nodes.Cube002}
        mesh2={nodes.Cube002_1}
        material={materials["Material.001"]}
        index={2}
        openShelf={props.openShelf}
      >
        {props.projects.slice(2, 4).map((project, i) => (
          <Folder
            key={project.id}
            project={project}
            position={[-0.3, 1.1, i ? -0.4 : 0.4]}
            onOpen={props.setOpenFolder}
            inputMode={props.inputMode}
          />
        ))}
      </Shelf>
      <Shelf
        mesh1={nodes.Cube001}
        mesh2={nodes.Cube001_1}
        material={materials["Material.001"]}
        index={3}
        openShelf={props.openShelf}
      >
        {props.projects.slice(4, 6).map((project, i) => (
          <Folder
            key={project.id}
            project={project}
            position={[-0.3, 0.6, i ? -0.4 : 0.4]}
            onOpen={props.setOpenFolder}
            inputMode={props.inputMode}
          />
        ))}
      </Shelf>
    </group>
  );
}
