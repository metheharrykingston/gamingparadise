import { Gamepad2, Gauge, Timer, ArrowUpRight, Users, UserRound, BadgePercent, Gamepad2 } from "lucide-react";
import { sessions, hourlySaving } from "./config";

export default function SessionPricing({ onBook }) {
  return <section className="session-section section" id="pricing">
    <div className="container">
      <div className="section-head sessions-heading">
        <div><div className="section-label"><span className="label-dash"/> 02 / SESSION RATES</div>
          <h2>CHOOSE YOUR<br/><span>PLAY TIME.</span></h2></div>
        <p>Two setups, one gaming paradise. Pick PS5 for solo adventures and head-to-head multiplayer, or take the G29 six-gear wheel for a solo drive.</p>
      </div>
      <div className="session-grid">
        {sessions.map((session, index) => <article className={"session-card session-" + session.id} key={session.id}>
          <div className="session-card-top">
            <span className="session-index">0{index + 1} / {session.category}</span>
            <span className="session-symbol" aria-hidden="true">{session.id === "g29" ? <Gauge size={30}/> : <Gamepad2 size={30}/>}</span>
          </div>
          <div className="session-main">
            <h3>{session.title}</h3>
            <p>{session.subtitle}</p>
            <span className="session-player-pill">{session.maxPlayers === 1 ? <UserRound size={15}/> : <Users size={15}/>}
              {session.maxPlayers === 1 ? "1 PLAYER PER WHEEL" : "SOLO + MULTIPLAYER GAMES"}
            </span>
          </div>
          {session.id === "g29" && <div className="session-gear-note">6-GEAR SHIFTER <span>✳</span> G29 STEERING WHEEL</div>}
          <div className="session-prices">
            <div><span><Timer size={16}/> 30 MINUTES</span><strong>₹{session.halfHour}</strong></div>
            <div><span><Timer size={16}/> 1 HOUR</span><strong>₹{session.hour}</strong></div>
          </div>
          {session.id === "g29" && <p className="session-saving"><BadgePercent size={18}/>
            SAVE ₹{hourlySaving(session)} ON 1 HOUR
            <small>Compared with two 30-minute sessions (₹{session.halfHour * 2})</small>
          </p>}
          <div className="session-game-list">
            <div className="session-game-list-heading"><Joystick size={17}/> AVAILABLE GAME LIST <small>{session.games.length} TITLES</small></div>
            <div className="session-game-tags">
              {session.games.map(game => <span className="session-game-tag" key={game.id}>
                {game.name}{game.maxPlayers > 1 && <b>{game.maxPlayers}P</b>}
              </span>)}
            </div>
            <p className="session-game-footnote">
              {session.id === "ps5" ? "2P and 4P badges indicate local multiplayer options for supported titles. Final controller and game availability confirmed by the café." : "One driver per wheel session. Ask the café to confirm your preferred racing title and controller compatibility."}
            </p>
          </div>
          <button type="button" className="btn btn-session" onClick={() => onBook(session.console)}>
            REQUEST THIS SETUP <ArrowUpRight size={18}/>
          </button>
        </article>)}
      </div>
      <p className="session-note">Prices are for a setup and time slot, not necessarily a per-person group total. Final charges, game editions, local multiplayer capacity and availability are confirmed by Pixel Paradise. GTA VI launch-slot prices remain separate and unpublished.</p>
    </div>
  </section>;
}
