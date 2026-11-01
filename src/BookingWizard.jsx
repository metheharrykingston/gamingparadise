import { useEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Check, CheckCircle2,
  Clock3, Copy, Gamepad2, Gauge, MessageCircle, ShieldCheck, Timer, Trophy,
  Users, X, Zap
} from "lucide-react";
import { gamesForParty, playerCountsForParty, hourlySaving, sessions, whatsappLink } from "./config";
import "./booking-wizard.css";

const steps = [
  { name: "CHOOSE SETUP", short: "SETUP", subtitle: "Choose PS5 or the six-gear wheel." },
  { name: "CHOOSE GAME", short: "GAME", subtitle: "Choose solo or multiplayer, then pick your game." },
  { name: "SELECT SLOT", short: "TIME", subtitle: "Choose a duration, date and preferred start time." },
  { name: "PLAYER DETAILS", short: "PLAYER", subtitle: "Confirm the player count and contact details." },
  { name: "REVIEW REQUEST", short: "REVIEW", subtitle: "Review your choices before contacting the café." }
];

function indiaNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23"
  }).formatToParts(new Date());
  const p = Object.fromEntries(parts.map(item => [item.type, item.value]));
  return { date: p.year + "-" + p.month + "-" + p.day, hour: Number(p.hour), minute: Number(p.minute) };
}
function prettyDate(value) {
  if (!value) return "SELECT DATE";
  const [y, m, d] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(y, m - 1, d));
}
function prettyTime(value) {
  if (!value) return "SELECT TIME";
  const [h, m] = value.split(":").map(Number);
  return String(h % 12 || 12) + ":" + String(m).padStart(2,"0") + (h >= 12 ? " PM" : " AM");
}
function buildMessage(values) {
  const {setup, game, duration, date, time, name, phone, players, note, rate} = values;
  return [
    "🎮 *PIXEL PARADISE GAMING CAFE*",
    "🟣 *New gaming session request*",
    "",
    "👤 Player: " + name.trim(),
    "📱 Contact: " + phone.trim(),
    "🕹️ Setup: " + setup.title,
    "🎮 Preferred game: " + game.name,
    "👥 Mode: " + (setup.id === "g29" ? "One driver / six-gear G29 wheel" : game.mode),
    "⏱️ Duration: " + duration + " minutes",
    "📅 Date: " + prettyDate(date),
    "🕐 Preferred time: " + prettyTime(time),
    "👥 Players: " + players,
    "💜 Displayed setup rate: ₹" + rate,
    setup.id === "g29" && duration === 60 ? "🏷️ Hourly saving: ₹" + hourlySaving(setup) + " versus two half-hour slots" : "",
    note.trim() ? "📝 Special request: " + note.trim() : "",
    "",
    "📍 Pixel Paradise, Sector 56, Noida",
    "Please confirm my slot, final price and availability. Thank you!"
  ].filter(Boolean).join("\n");
}
function GearIcon({ id, size = 38 }) {
  return id === "g29" ? <Gauge size={size} strokeWidth={1.4}/> : <Gamepad2 size={size} strokeWidth={1.4}/>;
}

export default function BookingWizard({ initialConsole = "PS5", initialGameId = "", onClose }) {
  const startingSetup = sessions.find(s => s.console === initialConsole) || sessions[0];
  const preselectedGame = startingSetup.games.find(game => game.id === initialGameId);
  const [step, setStep] = useState(preselectedGame ? 1 : 0);
  const [setupId, setSetupId] = useState(startingSetup.id);
  const [duration, setDuration] = useState(60);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [partyType, setPartyType] = useState(preselectedGame?.maxPlayers > 1 ? "friends" : "solo");
  const [players, setPlayers] = useState(preselectedGame?.maxPlayers > 1 ? "2" : "1");
  const [gameId, setGameId] = useState(preselectedGame?.id || "");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const rootRef = useRef(null);
  const panelRef = useRef(null);
  const stepAreaRef = useRef(null);
  const headingRef = useRef(null);
  const lastStepRef = useRef(-1);
  const setup = sessions.find(s => s.id === setupId) || sessions[0];
  const rate = duration === 30 ? setup.halfHour : setup.hour;
  const visibleGames = gamesForParty(setup, partyType);
  const game = setup.games.find(item => item.id === gameId) || null;
  const playerOptions = playerCountsForParty(setup, game, partyType);
  const now = indiaNow();
  const slots = useMemo(() => {
    const result = [];
    for (let min = 600; min + duration <= 1320; min += 30) {
      if (date === now.date && min <= now.hour * 60 + now.minute) continue;
      result.push(String(Math.floor(min / 60)).padStart(2,"0") + ":" + String(min % 60).padStart(2,"0"));
    }
    return result;
  }, [date, duration, now.date, now.hour, now.minute]);
  const message = game ? buildMessage({ setup, game, duration, date, time, name, phone, players, note, rate }) : "";
  function selectSetup(next) {
    if (next.id === setupId) return;
    setSetupId(next.id); setPartyType("solo"); setGameId(""); setPlayers("1"); setError("");
  }
  function selectParty(next) {
    if (setup.id === "g29" && next === "friends") return;
    if (next === partyType) return;
    setPartyType(next); setGameId(""); setPlayers(next === "friends" ? "2" : "1"); setError("");
  }
  function selectGame(nextId) {
    const nextGame = visibleGames.find(item => item.id === nextId);
    if (!nextGame) return;
    const allowed = playerCountsForParty(setup, nextGame, partyType);
    setGameId(nextGame.id); setPlayers(String(allowed[0] || 1)); setError("");
  }

  useEffect(() => {
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const activeBefore = document.activeElement;
    headingRef.current?.focus({preventScroll:true});
    function onKeyDown(e) {
      if (e.key === "Escape") { e.preventDefault(); onClose(); }
      if (e.key === "Tab" && rootRef.current) {
        const focusable = Array.from(rootRef.current.querySelectorAll(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
        )).filter(el => el.getClientRects().length > 0);
        if (!focusable.length) return;
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener("keydown", onKeyDown);
      if (activeBefore && document.contains(activeBefore)) activeBefore.focus();
    };
  }, [onClose]);

  useEffect(() => {
    if (time && !slots.includes(time)) setTime("");
  }, [time, slots]);

  useEffect(() => {
    if (lastStepRef.current !== step) {
      lastStepRef.current = step;
      headingRef.current?.focus({preventScroll:true});
      if (stepAreaRef.current) stepAreaRef.current.scrollTop = 0;
    }
  }, [step]);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from(".wizard-slide", {
      opacity: 0, y: 22, scale: 0.99, duration: .42, ease: "power3.out", clearProps: "all"
    });
  }, {scope: rootRef, dependencies:[step], revertOnUpdate:true});

  function advance() {
    setError("");
    if (step === 0 && !setupId) { setError("Choose a setup first."); return; }
    if (step === 1 && (!game || !visibleGames.some(g => g.id === game.id) || !playerOptions.includes(Number(players)))) {
      setError("Choose a game and valid player count before continuing."); return;
    }
    if (step === 2 && (!date || !time || !slots.includes(time) || date < indiaNow().date)) {
      setError("Choose a future date and an available starting time."); return;
    }
    if (step === 3) {
      if (!playerOptions.includes(Number(players))) { setError("Choose a supported player count."); return; }
      const digits = phone.replace(/\D/g, "");
      if (name.trim().length < 2) { setError("Enter your name."); return; }
      if (!(digits.length === 10 || digits.length === 12 && digits.startsWith("91"))) {
        setError("Enter a valid 10-digit Indian mobile number."); return;
      }
    }
    setStep(v => Math.min(v + 1, 4));
  }
  function back() { setError(""); setStep(v => Math.max(v-1,0)); }
  async function copy() {
    try { await navigator.clipboard.writeText(message); setCopied(true); setError(""); }
    catch { setError("Clipboard unavailable. Open WhatsApp to use the prefilled message."); }
  }

  return <div className="wizard-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}>
    <div className="wizard-shell" ref={rootRef} role="dialog" aria-modal="true" aria-labelledby="wizard-title" aria-describedby="wizard-desc">
      <aside className="wizard-showcase" aria-hidden="true">
        <div className="wizard-showcase-top"><img src="/pixel-paradise-logo.svg" alt="" width="46" height="46"/><span>PIXEL <strong>PARADISE</strong></span><span className="wizard-level">PLAYER 01</span></div>
        <div className="wizard-screen">
          <div className="wizard-radar wizard-radar-one"/><div className="wizard-radar wizard-radar-two"/><div className="wizard-scanline"/>
          <div className="wizard-icon-wrap"><GearIcon id={setupId} size={108}/></div>
          <div className="wizard-crosshair wizard-crosshair-a">+</div><div className="wizard-crosshair wizard-crosshair-b">+</div>
          <span className="wizard-screen-tag">PXP / SELECTED GEAR</span>
        </div>
        <div className="wizard-showcase-bottom"><span>LIVE LOADOUT <span className="wizard-live-dot"/></span><h3>{game?.name || setup.title}</h3>
          <div className="wizard-hud"><span>SESSION</span><strong>{duration} MIN</strong><span>RATE</span><strong>₹{rate}</strong></div>
          <div className="wizard-showcase-foot"><span>ULTIMATE GAMING HEAVEN</span><span>NOIDA / SECTOR 56</span></div>
        </div>
      </aside>
      <div className="wizard-body" ref={panelRef}>
        <div className="wizard-header"><div><span className="wizard-overline"><span className="wizard-live-dot"/> GAME SESSION BOOKING</span><span className="wizard-counter">LEVEL 0{step + 1} / 05</span></div>
          <button type="button" className="wizard-close" aria-label="Close booking" onClick={onClose}><X size={21}/></button></div>
        <div className="wizard-progress-labels" aria-label={"Step " + (step+1) + " of 5"}>{steps.map((item,i)=><span key={item.short} className={i <= step?"active":""}>{item.short}</span>)}</div>
        <div className="wizard-progress-track"><div className="wizard-progress-bar" style={{width:(step+1)*20+"%"}}/></div>
        <div className="wizard-step-area" ref={stepAreaRef}><div className="wizard-slide" key={step}>
          <div className="wizard-kicker"><span>0{step+1} / 05</span> {steps[step].name}</div>
          <h2 id="wizard-title" tabIndex={-1} ref={headingRef}>{step===0?<>CHOOSE YOUR <em>ARENA.</em></>:step===1?<>PICK YOUR <em>GAME.</em></>:step===2?<>LOCK YOUR <em>SESSION.</em></>:step===3?<>WHO'S <em>PLAYING?</em></>:<>READY TO <em>PLAY.</em></>}</h2>
          <p id="wizard-desc" className="wizard-description">{steps[step].subtitle}</p>
          {step===0&&<div className="wizard-setup-grid">{sessions.map((item,i)=><button key={item.id} type="button" onClick={()=>selectSetup(item)} aria-pressed={setupId===item.id} className={"wizard-setup-tile "+(setupId===item.id?"selected":"")}>
            <span className="wizard-tile-number">0{i+1} // {item.category}</span><span className="wizard-tile-icon"><GearIcon id={item.id} size={43}/></span>
            <strong>{item.title}</strong><span className="wizard-tile-pricing">FROM ₹{item.halfHour} / 30 MIN</span>
            <span className="wizard-tile-choice">{setupId===item.id?<><Check size={15}/> SELECTED</>:<><ArrowUpRight size={15}/> CHOOSE</>}</span>
          </button>)}</div>}
          {step===1&&<div className="wizard-game-stage">
            <div className="wizard-party-heading"><span><Users size={17}/> 01 / WHO'S PLAYING?</span><small>{setup.id==="g29"?"SINGLE DRIVER ONLY":"CHOOSE YOUR STYLE"}</small></div>
            <div className="wizard-party-grid" role="group" aria-label="Choose solo or local multiplayer">
              <button type="button" onClick={()=>selectParty("solo")} aria-pressed={partyType==="solo"} className={partyType==="solo"?"active":""}>
                <Gamepad2 size={23}/><strong>SOLO PLAY</strong><span>JUST ME / 1 PLAYER</span>
              </button>
              {setup.id!=="g29"&&<button type="button" onClick={()=>selectParty("friends")} aria-pressed={partyType==="friends"} className={partyType==="friends"?"active":""}>
                <Users size={23}/><strong>WITH FRIENDS</strong><span>LOCAL 2–4 PLAYER GAMES</span>
              </button>}
              {setup.id==="g29"&&<div className="wizard-solo-notice"><Gauge size={24}/><span>ONE DRIVER PER WHEEL<br/><small>G29 + SIX-GEAR SHIFTER</small></span></div>}
            </div>
            <div className="wizard-game-heading"><span><Gamepad2 size={17}/> 02 / PICK YOUR GAME <b>REQUIRED</b></span><small>{visibleGames.length} GAMES</small></div>
            <div className="wizard-game-grid" role="group" aria-label="Choose a game">
              {visibleGames.map(item=><button type="button" key={item.id} aria-pressed={gameId===item.id}
                className={"wizard-game-tile "+(gameId===item.id?"selected":"")} onClick={()=>selectGame(item.id)}>
                <span className="wizard-game-tile-top"><span>{item.mode.toUpperCase()}</span>{gameId===item.id?<CheckCircle2 size={19}/>:<Gamepad2 size={17}/>}</span>
                <strong>{item.name}</strong>
                <small>{partyType==="friends"?Math.min(item.maxPlayers,setup.maxPlayers)+" PLAYERS MAX":setup.id==="g29"?"1 DRIVER":"1 PLAYER"}{gameId===item.id?" · SELECTED":""}</small>
              </button>)}
            </div>
            {game&&<div className="wizard-game-selection" aria-live="polite">
              <div><CheckCircle2 size={20}/><span><small>YOUR SELECTION</small><strong>{game.name}</strong></span></div>
              <div className="wizard-player-count">
                <span><Users size={14}/> PLAYERS</span>
                <div role="group" aria-label="Number of local players">
                  {playerOptions.map(count=><button type="button" key={count} aria-pressed={Number(players)===count}
                    className={Number(players)===count?"selected":""} onClick={()=>setPlayers(String(count))}>{count}</button>)}
                </div>
              </div>
            </div>}
            <p className="wizard-game-note"><ShieldCheck size={16}/> {setup.id==="g29"?"One driver per wheel, with six-gear shifter.":partyType==="friends"?"Local multiplayer only. Controllers, availability and final charges confirmed by café.":"Solo mode shows games you can enjoy on your own."}</p>
          </div>}
          {step===2&&<div className="wizard-fields">
            <div className="wizard-input-group"><label>CHOOSE SESSION LENGTH</label><div className="wizard-duration-grid">{[30,60].map(v=><button key={v} type="button" className={"wizard-duration "+(duration===v?"selected":"")} aria-pressed={duration===v} onClick={()=>setDuration(v)}>
              <span><Timer size={19}/> {v===30?"30 MINUTES":"1 HOUR"}</span><strong>₹{v===30?setup.halfHour:setup.hour}</strong><small>{setup.id==="g29" && v===60 ? "SAVE ₹"+hourlySaving(setup)+" VS TWO HALF HOURS" : duration===v?"✓ SELECTED":"TAP TO CHOOSE"}</small>
            </button>)}</div></div>
            <div className="wizard-input-row">
              <div className="wizard-input-group"><label htmlFor="wizard-date"><CalendarDays size={15}/> SELECT YOUR DATE</label><input type="date" id="wizard-date" min={now.date} value={date} onChange={e=>{setDate(e.target.value);setTime("");}}/></div>
              <div className="wizard-input-group"><label htmlFor="wizard-time"><Clock3 size={15}/> START TIME</label><select id="wizard-time" value={time} onChange={e=>setTime(e.target.value)} disabled={!date}><option value="">Choose a time</option>{slots.map(s=><option key={s} value={s}>{prettyTime(s)}</option>)}</select></div>
            </div>
            <div className="wizard-hint"><ShieldCheck size={16}/> Open 10 AM to 10 PM. Times shown are enquiries, not live availability.</div>
            {date&&slots.length===0&&<p className="wizard-error">No session starts left today. Please choose another date.</p>}
          </div>}
          {step===3&&<div className="wizard-fields">
            <div className="wizard-input-row">
              <div className="wizard-input-group"><label htmlFor="wizard-name">PLAYER NAME *</label><input id="wizard-name" autoComplete="name" maxLength={80} placeholder="Your name" value={name} onChange={e=>setName(e.target.value)}/></div>
              <div className="wizard-input-group"><label htmlFor="wizard-phone">WHATSAPP / MOBILE *</label><input id="wizard-phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={18} placeholder="+91 98765 43210" value={phone} onChange={e=>setPhone(e.target.value)}/></div>
            </div>
            <div className="wizard-input-row">
              <div className="wizard-input-group"><label htmlFor="wizard-players"><Users size={15}/> {setup.id==="g29"?"DRIVERS (1 PER WHEEL)":"NUMBER OF PLAYERS"}</label><select id="wizard-players" value={players} onChange={e=>setPlayers(e.target.value)} disabled={playerOptions.length===1}>{playerOptions.map(n=><option key={n} value={String(n)}>{n} {n===1?"Player":"Players"}</option>)}</select><small className="wizard-player-guidance">{setup.id==="g29"?"G29 racing is single-player per wheel.":game.minPlayers===2?"This co-op game requires two players.":"Player count depends on the selected game."}</small></div>
              <div className="wizard-input-group"><label htmlFor="wizard-note">SPECIAL REQUEST</label><input id="wizard-note" maxLength={180} placeholder="Controller or setup request (optional)" value={note} onChange={e=>setNote(e.target.value)}/></div>
            </div>
            <div className="wizard-hint"><ShieldCheck size={16}/> Booking {game?.name} for {players} {players==="1"?"player":"players"}. This only prepares your WhatsApp message, not a confirmed slot.</div>
          </div>}
          {step===4&&<div className="wizard-review">
            <div className="wizard-ready-label"><CheckCircle2 size={17}/> GAME + PLAYERS SELECTED • READY TO SEND</div>
            <div className="wizard-review-grid">
              <div><small><Gamepad2 size={14}/> GAMING SETUP</small><strong>{setup.title}</strong></div>
              <div><small><Gamepad2 size={14}/> CHOSEN GAME</small><strong>{game.name}</strong></div>
              <div><small><Timer size={14}/> PLAY TIME</small><strong>{duration} MINUTES</strong></div>
              <div><small><CalendarDays size={14}/> DATE</small><strong>{prettyDate(date)}</strong></div>
              <div><small><Clock3 size={14}/> TIME</small><strong>{prettyTime(time)}</strong></div>
              <div><small><Users size={14}/> PLAYER / PARTY</small><strong>{name.trim()} · {players} {players==="1"?"PLAYER":"PLAYERS"}</strong></div>
              <div><small><Trophy size={14}/> DISPLAYED RATE</small><strong>₹{rate}</strong></div>
            </div>
            <div className="wizard-total"><span>DISPLAYED SETUP RATE <small>Final total confirmed by café{setup.id==="g29" && duration===60 ? " · Save ₹"+hourlySaving(setup)+" vs two 30-min sessions" : ""}</small></span><strong>₹{rate}</strong></div>
            <div className="wizard-whatsapp-note"><MessageCircle size={25}/><div><strong>ONE TAP TO WHATSAPP</strong><span>Your message is prefilled for +91 87459 98333. Just press <b>Send</b> in WhatsApp. This is a request, not a confirmed booking.</span></div></div>
          </div>}
        </div></div>
        {error&&<p className="wizard-error" role="alert">{error}</p>}
        <div className="wizard-action-area">{step>0?<button type="button" className="wizard-back" onClick={back}><ArrowLeft size={17}/> BACK</button>:<span className="wizard-action-hint"><Zap size={16}/> PRESS START</span>}
          {step===1&&game&&<span className="wizard-game-current" aria-live="polite"><CheckCircle2 size={15}/><span>{game.name} · {players}P</span></span>}
          {step<4?<button type="button" className="wizard-next" onClick={advance}>{step===3?"REVIEW REQUEST":step===0?"CHOOSE A GAME":step===1?"PICK PLAY TIME":"CONTINUE"} <ArrowRight size={19}/></button>:
            <a className="wizard-next wizard-whatsapp-cta" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer"><MessageCircle size={19}/> OPEN WHATSAPP <ArrowUpRight size={19}/></a>}
        </div>
        {step===4&&<div className="wizard-fallback"><button type="button" onClick={copy}>{copied?<Check size={14}/>:<Copy size={14}/>} {copied?"MESSAGE COPIED":"COPY MESSAGE"}</button><span>WhatsApp opens with your message ready. You decide when to send.</span></div>}
      </div>
    </div>
  </div>;
}
