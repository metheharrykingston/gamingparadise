import { Gamepad2, Gauge, Timer, ArrowUpRight } from "lucide-react";
import { sessions } from "./config";

export default function SessionPricing({ onBook }) {
  return <section className="session-section section" id="pricing">
    <div className="container">
      <div className="section-head sessions-heading">
        <div><div className="section-label"><span className="label-dash"/> 02 / SESSION RATES</div>
          <h2>CHOOSE YOUR<br/><span>PLAY TIME.</span></h2></div>
        <p>Real games. Straightforward pricing. Pick your setup, choose your time and request your slot.</p>
      </div>
      <div className="session-grid">
        {sessions.map((session,index)=><article className={"session-card session-"+session.id} key={session.id}>
          <div className="session-card-top"><span className="session-index">0{index+1} / {session.category}</span>
            <span className="session-symbol" aria-hidden="true">{session.id==="g29" ? <Gauge size={30}/> : <Gamepad2 size={30}/>}</span>
          </div>
          <div className="session-main"><h3>{session.title}</h3><p>{session.subtitle}</p></div>
          <div className="session-prices">
            <div><span><Timer size={16}/> 30 MINUTES</span><strong>₹{session.halfHour}</strong></div>
            <div><span><Timer size={16}/> 1 HOUR</span><strong>₹{session.hour}</strong></div>
          </div>
          <button type="button" className="btn btn-session" onClick={()=>onBook(session.console)}>REQUEST THIS SETUP <ArrowUpRight size={18}/></button>
        </article>)}
      </div>
      <p className="session-note">Session rates provided by Pixel Paradise Gaming Cafe. All gaming sessions depend on availability and require confirmation by the café.</p>
    </div>
  </section>;
}
