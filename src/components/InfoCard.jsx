import Volleyball from "./Volleyball";

const InfoCard = ({ selectedItem, setSelectedItem }) => {
  if (!selectedItem) return null;

  const content = {
    Guitar: {
      name: "Guitar Yamaha C40",
      text: "I started with classical music and later transitioned to rock music. Overall, I have been playing the guitar for more than five years.",
      img: "/images/guitar.png",
    },
    PingPongPaddle: {
      name: "Ping pong paddles boli eseries",
      text: "I enjoy playing ping pong in my free time at school.",
      img: "/images/PPPaddle.png",
    },
    Volleyball: {
      name: "Volleyball",
      text: "I started playing volleyball only at vocational school, quickly became passionate about it and rarely missed a training session unless there was an important reason.",
      img: "/images/volleyball.png",
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
