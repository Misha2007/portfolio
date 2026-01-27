import { FaEnvelope, FaPhone, FaGithub } from "react-icons/fa";

export default function VisitingCard() {
  return (
    <div className="card">
      <div className="card-left">
        <h1 className="name">Mykhailo Drogovoz</h1>
        <p className="title">Software development student</p>
        <div className="divider" />

        <div className="info">
          <div className="info-row">
            <FaEnvelope />
            <a href="mailto:name@email.com">mykhailo.drogovoz@voco.ee</a>
          </div>
          <div className="info-row">
            <FaPhone />
            <a href="tel:+37253725074">+372 5372 5074</a>
          </div>
          <div className="info-row">
            <FaGithub />
            <a href={"https://github.com/Misha2007"} target="_blank">
              https://github.com/Misha2007
            </a>
          </div>
        </div>
      </div>

      <div className="card-right">
        <div>
          <h2 className="logo">Mykhailo</h2>
          <p className="slogan">I can develop, whatever you want</p>
        </div>
      </div>
    </div>
  );
}
