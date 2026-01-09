function Menu() {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        zIndex: 1,
        cursor: "pointer",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <button className="menu-opt-btn">Main</button>
      <button className="menu-opt-btn">Projects</button>
      <button className="menu-opt-btn">Skills</button>
      <button className="menu-opt-btn">Contacts</button>
    </div>
  );
}

export default Menu;
