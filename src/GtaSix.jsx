import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, ArrowUpRight, CalendarDays, CheckCircle2, ChevronRight,
  Clock3, Gamepad2, MessageCircle, ShieldCheck, Sparkles, Timer, Trophy, Users, Zap
} from "lucide-react";
import {
  GTA6_RELEASE_DATE, earliestGta6Date, formatSlotTime, gta6BookingError,
  gta6Countdown, gta6Slots, gta6WhatsappMessage, lastGta6Date
} from "./gta6";

function useLaunchClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const tick = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(tick);
  }, []);
  return now;
}

function Countdown({ now, compact = false }) {
  const left = gta6Countdown(now);
  const units = [
    ["DAYS", left.days],
    ["HRS", left.hours],
    ["MIN", left.minutes],
    ["SEC", left.seconds]
  ];
  return <div className={"gta6-countdown " + (compact ? "gta6-countdown-compact" : "")}
    role="timer" aria-label={left.reached ? "Launch date reached" : "Time until the GTA VI launch date in India"}>
    {units.map(([label, value]) => <div className="gta6-time-tile" key={label}>
      <strong>{String(value).padStart(2, "0")}</strong><span>{label}</span>
    </div>)}
  </div>;
}

function LaunchArt() {
  return <div className="gta6-art" aria-hidden="true">
    <div className="gta6-art-sun"/>
    <div className="gta6-art-lines"/>
    <span className="gta6-art-coordinate">PX/P // 19.11.26</span>
    <span className="gta6-roman">VI</span>
    <div className="gta6-art-bottom"><span>THE NEXT CHAPTER</span><Gamepad2 size={44} strokeWidth={1.2}/></div>
  </div>;
}

export function GtaSixSpotlight() {
  const now = useLaunchClock();
  return <section className="gta6-spotlight section" id="gta6">
    <div className="container gta6-spotlight-layout">
      <div className="gta6-spotlight-copy">
        <span className="gta6-overline"><Zap size={16}/> PIXEL PARADISE / LAUNCH WATCH</span>
        <h2>THE CITY<br/>IS <em>CALLING.</em></h2>
        <p>GTA VI arrives 19 November 2026. Get ahead of the crowd: request your preferred launch-period gaming slot at Pixel Paradise.</p>
        <Countdown now={now} compact/>
        <p className="gta6-small">Countdown to the calendar date in IST, not a confirmed game unlock time.</p>
        <Link to="/gta6" className="btn btn-acid gta6-primary">EXPLORE GTA VI SLOT REQUESTS <ArrowUpRight size={18}/></Link>
      </div>
      <Link to="/gta6" className="gta6-art-link" aria-label="Explore GTA VI launch slot requests"><LaunchArt/></Link>
    </div>
  </section>;
}

export default function GtaSixPage({ onContact }) {
  const now = useLaunchClock();
  const minDate = earliestGta6Date(now);
  const maxDate = lastGta6Date(now);
  const left = gta6Countdown(now);
  const [form, setForm] = useState({
    name: "", phone: "", date: minDate, duration: 60, time: "", players: "1", note: "", snack: ""
  });
  const [error, setError] = useState("");
  const slots = gta6Slots(form.duration, form.date, now);
  const selectedTimeValid = slots.includes(form.time);

  useEffect(() => {
    if (form.date < minDate) setForm(old => ({ ...old, date: minDate, time: "" }));
  }, [form.date, minDate]);

  function update(key, value) {
    setError("");
    setForm(old => ({ ...old, [key]: value,
      ...(key === "date" || key === "duration" ? { time: "" } : {})
    }));
  }

  function submit(event) {
    event.preventDefault();
    const issue = gta6BookingError(form, new Date());
    if (issue) { setError(issue); return; }
    onContact(gta6WhatsappMessage(form));
  }

  return <main className="gta6-page">
    <section className="gta6-page-hero">
      <div className="container gta6-page-hero-grid">
        <div className="gta6-page-copy">
          <span className="gta6-overline"><Sparkles size={16}/> PIXEL PARADISE PRESENTS / LAUNCH COUNTDOWN</span>
          <h1>THE WAIT<br/>IS <em>ALMOST</em><br/>OVER.</h1>
          <p>19 NOVEMBER 2026 <span className="gta6-bullet">✳</span> GRAND THEFT AUTO VI</p>
          <Countdown now={now}/>
          <div className="gta6-hero-actions">
            <a href="#gta6-book" className="btn btn-acid gta6-primary">REQUEST A LAUNCH SLOT <ArrowUpRight size={18}/></a>
            <Link to="/membership" className="btn btn-outline">VIEW MONTHLY PASSES <ArrowRight size={18}/></Link>
          </div>
          <span className="gta6-footnote">{left.reached ? "The announced launch date has arrived." : "Calendar-date countdown in India (IST)."} Exact game unlock time, café access and stations are not confirmed.</span>
        </div>
        <LaunchArt/>
      </div>
    </section>

    <div className="gta6-marquee" aria-hidden="true">
      <div>LAUNCH WATCH <span>✳</span> VICE CITY ENERGY <span>✳</span> REQUEST YOUR SLOT <span>✳</span> NO PAUSE BUTTON</div>
    </div>

    <section className="gta6-book-section section" id="gta6-book">
      <div className="container gta6-book-layout">
        <div className="gta6-book-intro">
          <span className="gta6-overline"><CalendarDays size={16}/> YOUR LAUNCH GAME PLAN</span>
          <h2>CALL DIBS<br/>ON YOUR <em>TIME.</em></h2>
          <p>Choose a preferred date, duration and start time. We'll prepare a WhatsApp enquiry so the Pixel Paradise team can confirm availability and the final price.</p>
          <div className="gta6-book-points">
            <div><CalendarDays size={21}/><span><strong>19 NOVEMBER ONWARD</strong>30-day rolling request window, opening from the announced launch date</span></div>
            <div><Clock3 size={21}/><span><strong>10 AM TO 10 PM</strong>30-minute start intervals; the full 60 or 120-minute session must finish by 10 PM</span></div>
            <div><ShieldCheck size={21}/><span><strong>PRICE UNLOCKS LATER</strong>No GTA VI-specific pricing is published or charged here</span></div>
          </div>
          <div className="gta6-independent-note">Independent gaming café promotion. This is not an official Rockstar Games preorder, a promise of early access, or a confirmed reservation. The café must confirm game availability before your visit.</div>
        </div>

        <div className="gta6-book-card">
          <div className="gta6-book-card-head"><span>PX/P / EARLY SLOT ENQUIRY</span><span><span className="gta6-pulse"/> REQUESTS OPEN</span></div>
          <div className="gta6-book-card-title"><h3>BUILD YOUR<br/><em>LOADOUT.</em></h3><Gamepad2 size={42}/></div>
          <form onSubmit={submit}>
            <div className="gta6-form-grid">
              <label>PLAYER NAME <span>*</span><input value={form.name} onChange={e => update("name",e.target.value)} required minLength={2} maxLength={80} autoComplete="name" placeholder="Your name"/></label>
              <label>MOBILE / WHATSAPP <span>*</span><input value={form.phone} onChange={e => update("phone",e.target.value)} type="tel" inputMode="tel" maxLength={18} required autoComplete="tel" placeholder="+91 98765 43210"/></label>
              <label>PREFERRED DATE <span>*</span><input type="date" min={minDate} max={maxDate} value={form.date} onChange={e => update("date",e.target.value)} required/></label>
              <label>PLAYERS <span>*</span><select value={form.players} onChange={e => update("players",e.target.value)}>{Array.from({length:8},(_,i)=>i+1).map(n=><option key={n} value={String(n)}>{n} {n===1?"PLAYER":"PLAYERS"}</option>)}</select></label>
            </div>
            <div className="gta6-field-title"><Timer size={16}/> SESSION LENGTH</div>
            <div className="gta6-duration-options">{[60,120].map(v=><button type="button" key={v} className={form.duration===v?"active":""} aria-pressed={form.duration===v} onClick={()=>update("duration",v)}><span>{v===60?"60 MIN":"120 MIN"}</span><small>{v===60?"QUICK SESSION":"EXTENDED SESSION"}</small></button>)}</div>
            <div className="gta6-field-title"><Clock3 size={16}/> CHOOSE PREFERRED START TIME <span>IST</span></div>
            <div className="gta6-slots" role="group" aria-label="Preferred start time">
              {slots.length ? slots.map(slot=><button key={slot} type="button" className={form.time===slot?"active":""} aria-pressed={form.time===slot} onClick={()=>update("time",slot)}>{formatSlotTime(slot)}</button>) : <p>No valid starts remain within 10 AM–10 PM on this date. Please choose another day.</p>}
            </div>
            <label className="gta6-note-label">SPECIAL REQUEST (OPTIONAL)<input maxLength={180} value={form.note} onChange={e=>update("note",e.target.value)} placeholder="Preferred setup or notes for the café"/></label>
            <label className="gta6-note-label">🍿 SNACKS / DRINKS (OPTIONAL)<input maxLength={120} value={form.snack} onChange={e=>update("snack",e.target.value)} placeholder="E.g. chips, cold drink, coffee, or leave blank"/></label>
            <p className="gta6-form-disclaimer">Optional snacks are not included in your gaming session. The café confirms snack availability and any additional charges.</p>
            {selectedTimeValid && <div className="gta6-selection"><CheckCircle2 size={18}/> PREFERRED SLOT: {form.date} AT {formatSlotTime(form.time)} IST · {form.duration} MIN</div>}
            {error && <p className="gta6-error" role="alert">{error}</p>}
            <button className="btn btn-acid gta6-submit" type="submit"><MessageCircle size={20}/> PREPARE WHATSAPP REQUEST <ChevronRight size={19}/></button>
            <p className="gta6-form-disclaimer">No payment, automatic reservation or live capacity check. You must press Send in WhatsApp. Pricing and GTA VI access remain subject to café confirmation.</p>
          </form>
        </div>
      </div>
    </section>
    <section className="gta6-bottom-strip"><div className="container"><div><Trophy size={32}/><span>MONTHLY PLAY. YOUR WAY.</span></div><Link to="/membership">EXPLORE BASIC / PRO / ELITE <ArrowUpRight size={18}/></Link></div></section>
  </main>;
}
