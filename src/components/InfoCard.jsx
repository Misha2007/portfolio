const InfoCard = ({ selectedItem, setSelectedItem }) => {
  if (!selectedItem) return null;

  const content = {
    Guitar: {
      name: "Guitar Yamaha C40",
      text: "I like rock music, and I wanted to try play guitar and now I have been playing guitar over 5 years",
      img: "/images/guitar.jpg",
    },
    PingPongPaddle: {
      name: "Ping pong paddles boli eseries",
      text: "I like play ping pong in my free time at school.",
      img: "/images/PPPaddle.png",
    },
  };

  const { name, text, img } = content[selectedItem] || {};

  return (
    <div className="info-card">
      <div className="info-header">
        {name}{" "}
        <div
          className="info-close"
          onClick={() => {
            setSelectedItem(null);
          }}
        >
          <img
            src="/close-x.svg"
            alt="Close"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
      {img && <img src={img} alt={selectedItem} className="info-image" />}
      <p className="info-text">{text}</p>
    </div>
  );
};

export default InfoCard;
