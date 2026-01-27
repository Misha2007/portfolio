import { animated, useSpring } from "@react-spring/three";

export default function Shelf({
  mesh1,
  mesh2,
  index,
  material,
  children,
  openShelf,
}) {
  const isOpen = openShelf === index;

  const position = useSpring({
    to: { x: mesh1.position.x - (isOpen ? 1.1 : 0) },
    config: { mass: 1, tension: 170, friction: 26 },
  });

  return (
    <animated.group
      position={position.x.to((x) => [x, mesh1.position.y, mesh1.position.z])}
    >
      <mesh geometry={mesh1.geometry} material={mesh1.material} />
      <mesh geometry={mesh2.geometry} material={mesh2.material} />

      {children}
    </animated.group>
  );
}
