import { useState } from "react";
import { ArrowLeftRight, Sparkles } from "lucide-react";
import redevelopmentImage from "../assets/redevelopment.jpg";
import aboutImage from "../assets/about.jpg";

export default function TransformationPreview() {
  const [position, setPosition] = useState(52);
  return (
    <section className="transformation-section" aria-label="Visual transformation preview">
      <div className="container-site">
        <div className="transformation-heading">
          <span className="projects-kicker"><Sparkles size={13}/> VISUAL TRANSFORMATION</span>
          <h2>From existing spaces to <em>better possibilities.</em></h2>
          <p>Explore a premium interactive visual preview inspired by Adimaya Group's redevelopment approach.</p>
        </div>
        <div className="before-after-wrap">
          <div className="before-after-media">
            <img src={aboutImage} alt="Existing space visual" className="before-after-base" />
            <div className="before-after-after" style={{ width: `${position}%` }}>
              <img src={redevelopmentImage} alt="Redevelopment vision visual" />
            </div>
            <span className="before-after-label before">EXISTING SPACE</span>
            <span className="before-after-label after">REDEVELOPMENT VISION</span>
            <div className="before-after-handle" style={{ left: `${position}%` }} aria-hidden="true"><ArrowLeftRight size={15}/></div>
            <input aria-label="Compare transformation visuals" className="before-after-range" type="range" min="5" max="95" value={position} onChange={e => setPosition(Number(e.target.value))} />
          </div>
        </div>
      </div>
    </section>
  );
}
