function Menu(props) {
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
      <button
        className="menu-opt-btn"
        onClick={() => props.switchQuest({ key: "sofa" })}
      >
        Main
      </button>
      <button
        className="menu-opt-btn"
        onClick={() => props.switchQuest({ key: "projects" })}
      >
        Projects
      </button>
      <button
        className="menu-opt-btn"
        onClick={() => props.switchQuest({ key: "skills" })}
      >
        Skills
      </button>
      <button
        className="menu-opt-btn"
        onClick={() => props.switchQuest({ key: "contacts" })}
      >
        Contacts
      </button>
    </div>
  );
}

export default Menu;
